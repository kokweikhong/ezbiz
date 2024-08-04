package web

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed assets/*
var Assets embed.FS

func GetAssets() embed.FS {
	return Assets
}

//go:embed views/*
var Views embed.FS

func GetViews() embed.FS {
	return Views
}

func GetEmbedFileSytem(embedFile embed.FS, name string) http.FileSystem {
	fsys, err := fs.Sub(embedFile, name)
	if err != nil {
		panic(err)
	}
	return http.FS(fsys)
}
