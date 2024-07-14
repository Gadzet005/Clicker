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
