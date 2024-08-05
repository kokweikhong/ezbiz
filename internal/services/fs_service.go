package services

import (
	"os"
	"path/filepath"
)

type FS interface {
	GetFile(filePath string) (string, error)
	SaveFile(filePath string, data []byte) error
}

type fsService struct {
	dir string
}

func NewFSService(dir string) FS {
	return &fsService{
		dir: dir,
	}
}

func (s *fsService) GetFile(filePath string) (string, error) {
	path := filepath.Join(filepath.Join(".", s.dir), filePath)
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return "", err
	}

	return path, nil

}

func (s *fsService) SaveFile(filePath string, data []byte) error {
	path := filepath.Join(".", s.dir, filePath)
	folder := filepath.Dir(path)
	if _, err := os.Stat(folder); os.IsNotExist(err) {
		// check if file exists
		os.MkdirAll(filepath.Dir(path), os.ModePerm)
	}
	if _, err := os.Stat(path); os.IsNotExist(err) {
		// create file
		if _, err := os.Create(path); err != nil {
			return err
		}
	}

	// write data to file
	if err := os.WriteFile(path, data, 0644); err != nil {
		return err
	}

	return nil
}
