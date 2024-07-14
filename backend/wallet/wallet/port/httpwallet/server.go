package httpwallet

import (
	"context"
	"envconfig"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"wallet/internal/app"

	"go.uber.org/zap"
	"golang.org/x/sync/errgroup"
)

// subatches - second used indexes of batches that were returned from killed pods
// better to add another struct for batches vars
type server struct {
	tw      app.TonWallet
	lg      *zap.Logger
	ctx     context.Context
	ctxCncl context.CancelFunc
	eg      *errgroup.Group
	mu      *sync.Mutex
	es      envconfig.EnvStorage
}

var ErrorSignalServerShutDown error = errors.New("server got signal to shutdown")
var ErrorServerShutDown error = errors.New("server got error to shutdown")

const maxRepoWorkers = 30

func newServer(tw app.TonWallet, ctx context.Context, cncl context.CancelFunc, eg *errgroup.Group, lg *zap.Logger, mu *sync.Mutex, es envconfig.EnvStorage) server {
	return server{tw: tw, lg: lg.With(zap.String("app", "wallet server")), ctx: ctx, ctxCncl: cncl, eg: eg, mu: mu, es: es}
}

func RunServer(parCtx context.Context, lg *zap.Logger, addr string, es envconfig.EnvStorage, tw app.TonWallet, mu *sync.Mutex) error {
	var httpSrv http.Server
	httpSrv.Addr = addr

	ctx, cncl := context.WithCancel(parCtx)
	eg, ctx := errgroup.WithContext(ctx)
	server := newServer(tw, ctx, cncl, eg, lg, mu, es)
	eg.Go(server.tw.WaitForTransactions)

	http.HandleFunc("/getTransactionQR", server.getTransactionQRHandler)

	sigQuit := make(chan os.Signal, 2)
	signal.Notify(sigQuit, syscall.SIGINT, syscall.SIGTERM, syscall.SIGKILL)

	eg.Go(func() error {
		select {
		case s := <-sigQuit:
			lg.Warn("shutting server down", zap.Any("signal", s))
		case <-server.ctx.Done():
			lg.Warn("shutting server down")
		case <-parCtx.Done():
			lg.Warn("shutting server down")
		}

		if err := httpSrv.Shutdown(ctx); err != nil {
			lg.Info("http server shutdown error: ", zap.Error(err))
		}

		return ErrorServerShutDown
	})

	eg.Go(func() error {
		lg.Info("server is ready for conns")
		return httpSrv.ListenAndServe()
	})

	if err := eg.Wait(); err != nil && err != ErrorServerShutDown && err != http.ErrServerClosed {
		lg.Fatal("server stoppend listening unintentionally", zap.Error(err))
		return err
	}
	lg.Info("server shutted down succesfully")
	return nil
}
