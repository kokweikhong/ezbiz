package service_test

import (
	"os"
	"testing"

	"github.com/kokweikhong/ezbiz-backend/internal/service"
)

func TestUploadFile(t *testing.T) {
	fileService := service.NewFileService()
	file, err := os.ReadFile("test.jpg")
	if err != nil {
		t.Error(err)
	}

	// dir and file name
	fileName := "avatar/test.jpg"

	fileName, err = fileService.UploadFile(file, fileName, "")
	if err != nil {
		t.Error(err)
	}

	if fileName == "" {
		t.Error("file name is empty")
	}
}

func TestDeleteFile(t *testing.T) {
	fileService := service.NewFileService()
	fileName := "avatar/11bb1217-b2e4-4a8e-b632-8e39f538f558.jpg"

	err := fileService.DeleteFile(fileName)
	if err != nil {
		t.Error(err)
	}
}

func TestGetFiles(t *testing.T) {
	fileService := service.NewFileService()
	fileNames, err := fileService.GetFiles()
	if err != nil {
		t.Error(err)
	}

	if len(fileNames) == 0 {
		t.Error("file names is empty")
	}

	for _, fileName := range fileNames {
		t.Log(fileName)
	}
}
