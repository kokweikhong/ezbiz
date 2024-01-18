package service

import (
	"os"
	"path/filepath"

	"github.com/google/uuid"
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
	defaultUploadPath := defaultUploadPathWithWorkingDir()

	fileUUID := uuid.New().String()

	dir, fileWithoutDir := filepath.Split(fileName)

	ext := filepath.Ext(fileWithoutDir)
	newFileName := fileUUID + ext

	if dir != "" {
		err := os.MkdirAll(defaultUploadPath+"/"+dir, 0755)
		if err != nil {
			return "", err
		}
	}

	f, err := os.Create(defaultUploadPath + "/" + dir + newFileName)
	if err != nil {
		return "", err
	}
	defer f.Close()

	_, err = f.Write(file)
	if err != nil {
		return "", err
	}

	// return filename with dir but except for defaultUploadPath
	return dir + newFileName, nil
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
