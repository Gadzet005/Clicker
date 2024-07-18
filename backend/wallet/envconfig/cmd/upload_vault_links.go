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
	errs[2] = es.EnvUpdateVal("secret_vals", "walletSeed", "life crop giraffe kitten solution helmet cliff hotel negative eternal head matrix scorpion lamp bomb milk close creek garlic move budget small music bread")
	errs[3] = es.EnvUpdateVal("saved_vals", "walletConfigUrl", "https://ton.org/global.config.json") // "https://ton.org/global.config.json" "https://ton-blockchain.github.io/testnet-global.config.json"
	errs[4] = es.EnvUpdateVal("secret_vals", "lastTransactionLt", "47751691000001")

	for _, err := range errs {
		if err != nil {
			log.Fatal("failed to init base envs: ", err)
		}
	}
}
