package web

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist/*
var Dist embed.FS

func GetDist() embed.FS {
	return Dist
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
