package controller

import (
	"net/http"
	"path/filepath"

	"github.com/kokweikhong/ezbiz-backend/internal/service"
	"github.com/kokweikhong/ezbiz-backend/internal/utils"
)

type FileController interface {
	UploadFile(w http.ResponseWriter, r *http.Request)
	// DownloadFile(w http.ResponseWriter, r *http.Request)
	DeleteFile(w http.ResponseWriter, r *http.Request)
	GetFiles(w http.ResponseWriter, r *http.Request)
}

type fileController struct {
	srv   service.FileService
	jsonH utils.JsonHandler
}

func NewFileController() FileController {
	return &fileController{
		srv:   service.NewFileService(),
		jsonH: utils.NewJsonHandler(),
	}
}

func (c *fileController) UploadFile(w http.ResponseWriter, r *http.Request) {
	// 20mb max
	err := r.ParseMultipartForm(20 << 20)
	// get file from request FormFile
	file, handler, err := r.FormFile("file")
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusBadRequest, err.Error())
		return
	}

	defer file.Close()

	fileBytes := make([]byte, handler.Size)
	// read file into bytes
	_, err = file.Read(fileBytes)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	saveDir := r.FormValue("saveDir")

	filenameWithDir := filepath.Join(saveDir, handler.Filename)

	newFilename := r.FormValue("newFilename")

	// create file
	filename, err := c.srv.UploadFile(fileBytes, filenameWithDir, newFilename)
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, filename)
}

func (c *fileController) DeleteFile(w http.ResponseWriter, r *http.Request) {
	reqBody := struct {
		Filename string `json:"filename"`
	}{}

	c.jsonH.ReadJSON(w, r, &reqBody)

	err := c.srv.DeleteFile(reqBody.Filename)
	if err != nil {
		c.jsonH.ResponseJSON(w, http.StatusOK, "File deleted unsuccessfully")
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, "File deleted successfully")
}

func (c *fileController) GetFiles(w http.ResponseWriter, r *http.Request) {
	files, err := c.srv.GetFiles()
	if err != nil {
		c.jsonH.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}

	c.jsonH.ResponseJSON(w, http.StatusOK, files)
}
