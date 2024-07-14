package adapters

type Repository interface {
	//Get(sURL T) (urls.Urls, bool, error)
	Add(uId uint64, amt float64) error
	CloseRepo() error
}
