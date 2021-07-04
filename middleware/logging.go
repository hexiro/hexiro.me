package middleware

import (
	"io"
	"net/http"
	"time"
)

type loggingHandler struct {
	writer  io.Writer
	handler http.Handler
}

func LoggingHandler(writer io.Writer, handler http.Handler) http.Handler {
	return loggingHandler{writer: writer, handler: handler}
}

func (h loggingHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	url := *req.URL

	h.handler.ServeHTTP(w, req)

	var buf []byte
	buf = append(buf, []byte(time.Now().Format("2006/01/02 15:04:05"))...)
	buf = append(buf, []byte(" ")...)
	buf = append(buf, []byte(req.Method)...)
	buf = append(buf, []byte(" ")...)
	buf = append(buf, []byte(url.String())...)
	buf = append(buf, []byte("\n")...)
	h.writer.Write(buf)
}
