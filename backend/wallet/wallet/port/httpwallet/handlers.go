package httpwallet

import (
	"encoding/json"
	"io"
	"net/http"

	"go.uber.org/zap"
)

// expects jsoned getQRreques in request body
func (s *server) getTransactionQRHandler(w http.ResponseWriter, r *http.Request) {
	s.lg.Debug("got new request to get transaction qr", zap.String("url", r.URL.Path))

	var data getQRrequest
	{ // get req data part
		var buf []byte = make([]byte, 1e5)
		n, err := r.Body.Read(buf)
		if err != io.EOF {
			s.lg.Warn("got too long request assumed as bad request")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if err := json.Unmarshal(buf[:n], &data); err != nil {
			s.lg.Warn("failed to parse request data", zap.Error(err))
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	}

	var bufToRet []byte = make([]byte, 0)
	var err error
	if bufToRet, err = getTransactionQR(s.tw.Address(), data.UID, data.TonAmt); err != nil {
		s.lg.Warn("failed to create transaction qr", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if _, err = w.Write(bufToRet); err != nil {
		s.lg.Warn("failed write response", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	var jsonedBufToRet []byte = make([]byte, 0)
	if jsonedBufToRet, err = json.Marshal(map[string][]byte{"QRrawData": bufToRet}); err != nil {
		s.lg.Warn("failed jsoned response", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(jsonedBufToRet)
	w.WriteHeader(http.StatusOK)
	s.lg.Debug("send response to get transaction qr")
}
