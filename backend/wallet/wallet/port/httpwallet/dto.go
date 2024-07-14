package httpwallet

import "wallet/internal/app"

type getQRrequest struct {
	UID    uint64
	TonAmt float64
}

func getTransactionQR(wltAddr string, uID uint64, amt float64) ([]byte, error) {
	return app.GenPaymentQrCode(app.CreateTxUrl(wltAddr, uID, amt), "", false)
}
