package main

import (
	"envconfig"
	"log"
)

func main() {
	es, err := envconfig.NewEnvStorage()
	if err != nil {
		log.Fatal("failed to connect to env storage: ", err)
	}
	errs := make([]error, 5)
	errs[0] = es.EnvUpdateVal("addr_dealer", "postgresAddr", "postgres://postgres:postgres@postgres:5432/postgres")
	errs[1] = es.EnvUpdateVal("addr_dealer", "walletAddr", "wallet:9090")
	errs[2] = es.EnvUpdateVal("secret_vals", "walletSeed", "pencil size mystery into brief lawsuit wrap quantum dutch embody sudden calm bounce near stick scale more weather grit slogan zoo notable refuse kid")
	errs[3] = es.EnvUpdateVal("saved_vals", "walletConfigUrl", "https://ton.org/global.config.json") // "https://ton.org/global.config.json" "https://ton-blockchain.github.io/testnet-global.config.json"
	errs[4] = es.EnvUpdateVal("secret_vals", "lastTransactionLt", "47729449000001")

	for _, err := range errs {
		if err != nil {
			log.Fatal("failed to init base envs: ", err)
		}
	}
}

/*

es, err := envconfig.NewEnvStorage()
	if err != nil {
		log.Fatal("wallet failed to connect to env storage")
	}

	dealerAddr, err := es.EnvGetVal("addr_dealer", "walletAddr")
	if err != nil {
		log.Fatal("wallet failed to get it's addr: ", err)
	}

	walletSeed, err := es.EnvGetVal("secret_vals", "walletSeed")
	if err != nil {
		log.Fatal("wallet failed to get wallet seed: ", err)
	} //configUrl string, lastTrLt

	configUrl, err := es.EnvGetVal("saved_vals", "walletConfigUrl")
	if err != nil {
		log.Fatal("wallet failed to get config url: ", err)
	}

	var lastTransactionLt_s string
	var lastTransactionLt uint64
	if lastTransactionLt_s, err = es.EnvGetVal("secret_vals", "lastTransactionLt"); err != nil {
		log.Fatal("wallet failed to get last transaction lt: ", err)
	}

*/
