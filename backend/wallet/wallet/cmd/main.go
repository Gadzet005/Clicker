package main

import (
	"context"
	"envconfig"
	"log"
	"strconv"
	"strings"
	"sync"

	"wallet/internal/adapters/postgresrepo"
	"wallet/internal/app"
	"wallet/port/httpwallet"

	"go.uber.org/zap"
)

func main() {
	es, err := envconfig.NewEnvStorage()
	if err != nil {
		log.Fatal("wallet failed to connect to env storage")
	}

	dealerAddr, err := es.EnvGetVal("addr_dealer", "walletAddr")
	if err != nil {
		log.Fatal("wallet failed to get it's addr: ", err)
	}

	repoAddr, err := es.EnvGetVal("addr_dealer", "postgresAddr")
	if err != nil {
		log.Fatal("wallet failed to get postgres addr: ", err)
	}

	walletSeed, err := es.EnvGetVal("secret_vals", "walletSeed")
	if err != nil {
		log.Fatal("wallet failed to get wallet seed: ", err)
	}

	configUrl, err := es.EnvGetVal("saved_vals", "walletConfigUrl")
	if err != nil {
		log.Fatal("wallet failed to get config url: ", err)
	}

	var lastTransactionLt_s string
	var lastTransactionLt uint64
	if lastTransactionLt_s, err = es.EnvGetVal("secret_vals", "lastTransactionLt"); err != nil {
		log.Fatal("wallet failed to get last transaction lt: ", err)
	}
	if lastTransactionLt, err = strconv.ParseUint(lastTransactionLt_s, 10, 64); err != nil {
		log.Fatal("wallet failed to parse last transaction lt: ", err)
	}

	lg, err := zap.NewDevelopment()
	if err != nil {
		log.Fatal("failed to init logger")
	}
	mu := &sync.Mutex{}
	ctx := context.Background()
	repo := postgresrepo.NewRepo(repoAddr, ctx, lg)
	wlt := app.New(walletSeed, configUrl, lastTransactionLt, repo, es, lg, mu, ctx)
	lg.Info("asdfda", zap.Any("asdads", wlt))
	httpwallet.RunServer(ctx, lg, ":"+strings.Split(dealerAddr, ":")[1], es, wlt, mu)
}
