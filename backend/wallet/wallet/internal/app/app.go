package app

import (
	"context"
	"encoding/base64"
	"envconfig"
	"fmt"
	"strconv"
	"strings"
	"sync"
	"wallet/internal/adapters"

	"github.com/skip2/go-qrcode"
	"github.com/xssnick/tonutils-go/address"
	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/tlb"
	"github.com/xssnick/tonutils-go/ton"
	"github.com/xssnick/tonutils-go/ton/wallet"
	"github.com/xssnick/tonutils-go/tvm/cell"
	"go.uber.org/zap"
)

func CreateTxUrl(wltAddr string, uID uint64, amt float64) string {
	body := cell.BeginCell().MustStoreUInt(0, 32).MustStoreStringSnake(strconv.FormatUint(uID, 10)).EndCell()

	return fmt.Sprintf("ton://transfer/%s?bin=%s&amount=%s", wltAddr, base64.URLEncoding.EncodeToString(body.ToBOC()), tlb.MustFromTON(strconv.FormatFloat(amt, 'f', -1, 64)).Nano().String())
}

func GenPaymentQrCode(s string, fn string, toSave bool) ([]byte, error) {
	var png []byte
	var err error
	if png, err = qrcode.Encode(s, qrcode.Highest, 256); err != nil {
		return nil, err
	}

	if toSave {
		if err := qrcode.WriteFile(s, qrcode.Highest, 256, fn); err != nil {
			return nil, err
		}
	}

	return png, nil
}

type TonWallet struct {
	client *liteclient.ConnectionPool
	api    ton.APIClientWrapped
	block  *tlb.BlockInfo
	wallet *wallet.Wallet
	trW    transactionWatcher
	addr   *address.Address
	ctx    context.Context
	lg     *zap.Logger
	mu     *sync.Mutex
}

type transactionWatcher struct {
	lastTrID []byte
	lastTrLt uint64
	repo     adapters.Repository
	es       envconfig.EnvStorage
}

func new(tw TonWallet, lastTrLt uint64, repo adapters.Repository, es envconfig.EnvStorage) transactionWatcher {
	info, err := tw.api.WaitForBlock(tw.block.SeqNo).GetAccount(context.Background(), tw.block, tw.wallet.Address())
	if err != nil {
		tw.lg.Fatal("failed to get wallet account info", zap.Error(err))
		return transactionWatcher{}
	}

	return transactionWatcher{lastTrID: info.LastTxHash, lastTrLt: lastTrLt, repo: repo, es: es}
}

func New(walletSeed string, configUrl string, lastTrLt uint64, repo adapters.Repository, es envconfig.EnvStorage, lg *zap.Logger, mu *sync.Mutex, ctx context.Context) TonWallet {
	client := liteclient.NewConnectionPool()

	if err := client.AddConnectionsFromConfigUrl(ctx, configUrl); err != nil {
		lg.Fatal("failed to add connections", zap.Error(err))
		return TonWallet{} // even if fatal calls exit
	}
	cfg, err := liteclient.GetConfigFromUrl(ctx, configUrl)
	if err != nil {
		lg.Fatal("failed to get config", zap.Error(err))
		return TonWallet{}
	}

	api := ton.NewAPIClient(client, ton.ProofCheckPolicyFast).WithRetry()
	api.SetTrustedBlockFromConfig(cfg)

	wlt, err := wallet.FromSeed(api, strings.Split(walletSeed, " "), wallet.V3)
	if err != nil {
		lg.Fatal("failed to get wallet by seed", zap.Error(err))
		return TonWallet{}
	}

	lg.Info("fetching and checking proofs since config init block, it may take near a minute...")
	block, err := api.CurrentMasterchainInfo(ctx)
	if err != nil {
		lg.Fatal("get masterchain info err", zap.Error(err))
		return TonWallet{}
	}
	lg.Info("master proof checks are completed successfully, now communication is 100% safe!")

	tw := TonWallet{client: client, api: api, block: block, wallet: wlt, addr: wlt.Address(), ctx: ctx, lg: lg.With(zap.String("app", "wallet")), mu: mu}
	tw.trW = new(tw, lastTrLt, repo, es)
	return tw
}

func (tw TonWallet) Address() string {
	return tw.addr.String()
}

func (tw TonWallet) getTransactionData(tx *tlb.Transaction) (string, float64, error) {
	_, data, err := (tx.IO.In.Msg).(*tlb.InternalMessage).Body.BeginParse().RestBits()
	if err != nil {
		tw.lg.Error("failed to get transaction data", zap.Error(err))
		return "", 0, err
	}
	ind := 0
	for ind < len(data) && data[ind] == 0 {
		ind++
	}

	amt, err := strconv.ParseFloat((tx.IO.In.Msg).(*tlb.InternalMessage).Amount.Nano().String(), 64)
	if err != nil {
		tw.lg.Error("failed to parse coin amount", zap.Error(err))
		return "", 0, err
	}
	return string(data[ind:]), amt / 1e5, nil // / 2e5 as convert nano tons to tons
}

func (tw TonWallet) handleTransaction(tx *tlb.Transaction) error {
	if tx.IO.In == nil || tx.IO.In.Msg.SenderAddr().IsAddrNone() {
		return nil
	}
	if tx.IO.Out != nil {
		return nil
	}

	data, amt, err := tw.getTransactionData(tx)
	if err != nil {
		tw.lg.Error("failed to get transaction data", zap.Error(err), zap.Uint64("txlt", tx.LT)) // add to kafka!!!
		return nil
	}
	uID, err := strconv.ParseUint(data, 10, 64)
	if err != nil {
		tw.lg.Error("failed to parse transaction data", zap.Error(err), zap.Uint64("txlt", tx.LT)) // add to kafka!!!
		return nil
	}
	if err := tw.trW.repo.Add(uID, amt); err != nil {
		tw.lg.Warn("failed to add to db transaction data", zap.Error(err), zap.Uint64("txlt", tx.LT))
		return err
	}
	tw.lg.Error("succesfully added transaction", zap.Uint64("txlt", tx.LT))
	return nil
}

func (tw TonWallet) WaitForTransactions() error {
	txs := make(chan *tlb.Transaction)
	go tw.api.SubscribeOnTransactions(tw.ctx, tw.addr, tw.trW.lastTrLt, txs) // care it's will be a leak if logic become harder

	tw.lg.Info("start listenning transactions")
	for {
		tx := <-txs
		tw.lg.Debug("got new transaction", zap.String("tx", tx.String()))

		if err := tw.handleTransaction(tx); err != nil {
			tw.lg.Error("failed to handle transaction", zap.Error(err), zap.String("tx", tx.String()))
			return err
		}

		tw.trW.es.EnvUpdateVal("secret_vals", "lastTransactionLt", strconv.FormatUint(tx.LT, 10))
	}
	tw.lg.Info("end listenning transactions")
	return nil
}
