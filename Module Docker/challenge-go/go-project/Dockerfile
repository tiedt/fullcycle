FROM golang:1.18 AS builder

WORKDIR /app

COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-w -s" -o go-project main.go

RUN apt-get update && apt-get install -y upx

RUN upx --best --ultra-brute go-project

FROM scratch

WORKDIR /root/

COPY --from=builder /app/go-project .

EXPOSE 8080

CMD ["./go-project"]
