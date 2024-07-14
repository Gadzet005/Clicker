package postgresrepo

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

type PostgresRepo struct {
	conn *pgxpool.Pool
	lg   *zap.Logger
	ctx  context.Context
}

func NewRepo(dbAddr string, ctx context.Context, lg *zap.Logger) *PostgresRepo {
	conn, err := pgxpool.New(ctx, dbAddr)
	if err != nil {
		lg.Fatal("failed to connect to postgres repo", zap.Error(err))
	}
	return &PostgresRepo{conn: conn, lg: lg.With(zap.String("app", "postgresrepo")), ctx: ctx}
}

const addURLQuery = `UPDATE profile SET coinCount = coinCount + $2 WHERE userId = $1`

func (pr *PostgresRepo) Add(uID uint64, amt float64) error {
	pr.lg.Debug("add", zap.Uint64("uID", uID), zap.Float64("amount", amt))
	_, err := pr.conn.Exec(pr.ctx, addURLQuery, uID, amt)
	if err != nil {
		pr.lg.Error("failed to add", zap.Error(err), zap.Uint64("uID", uID), zap.Float64("amount", amt))
		return err
	}
	return nil
}

func (pr *PostgresRepo) CloseRepo() error {
	pr.conn.Close()
	return nil
}
