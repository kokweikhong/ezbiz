package service

import (
	"os"
	"path/filepath"
)

type FileService interface {
	UploadFile(file []byte, fileName string) (string, error)
	DeleteFile(fileName string) error
	GetFiles() ([]string, error)
}

type fileService struct {
}

func NewFileService() FileService {
	return &fileService{}
}

const defaultUploadPath = "uploads"

func defaultUploadPathWithWorkingDir() string {
	wd, _ := os.Getwd()
	return filepath.Join(wd, defaultUploadPath)
}

func (s *fileService) UploadFile(file []byte, fileName string) (string, error) {
	// get the filename only without dir and extension
	newFileName := filepath.Base(fileName)
	ext := filepath.Ext(newFileName)
	newFileName = newFileName[0 : len(newFileName)-len(ext)]

	// get the dir only without filename
	dir := filepath.Dir(fileName)

	// create the dir if not exist
	if dir != "" {
		err := os.MkdirAll(filepath.Join(defaultUploadPath, dir), 0755)
		if err != nil {
			return "", err
		}
	}

	fullPath := filepath.Join(defaultUploadPath, dir, newFileName+ext)

	// create the file
	f, err := os.Create(fullPath)
	if err != nil {
		return "", err
	}

	defer f.Close()

	_, err = f.Write(file)
	if err != nil {
		return "", err
	}

	return fullPath, nil
}

func (s *fileService) DeleteFile(fileName string) error {
	defaultUploadPath := defaultUploadPathWithWorkingDir()
	// delete file from local storage defaultUploadPath
	err := os.Remove(defaultUploadPath + "/" + fileName)
	if err != nil {
		return err
	}

	return nil
}

func (s *fileService) GetFiles() ([]string, error) {
	defaultUploadPath := defaultUploadPathWithWorkingDir()
	files := []string{}

	err := filepath.Walk(defaultUploadPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if defaultUploadPath != path && !info.IsDir() {
			files = append(files, path)
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return files, nil
}
