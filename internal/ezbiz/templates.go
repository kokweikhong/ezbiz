package ezbiz

import (
	"html/template"
	"io"

	"github.com/kokweikhong/ezbiz/web"
	"github.com/labstack/echo/v4"
)

type AppTemplate struct {
	templates map[string]*template.Template
}

func (a *App) NewAppTemplate() *AppTemplate {
	return &AppTemplate{
		templates: make(map[string]*template.Template),
	}
}

func (t *AppTemplate) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	tmpl, ok := t.templates[name]
	if !ok {
		return nil
	}

	return tmpl.ExecuteTemplate(w, "base", data)
}

func (a *App) SetupTemplates() {
	t := new(AppTemplate)
	t.templates = make(map[string]*template.Template)
	views := web.GetViews()
	// partials := []string{
	// 	"views/partials/base.html",
	// 	"views/partials/head.html",
	// 	"views/partials/navbar.html",
	// 	"views/partials/sidebar.html",
	// }
	adminPartials := []string{
		"views/partials/header.html",
		"views/partials/sidebar.html",
		"views/partials/admin-base.html",
	}
	t.templates["admin"] = template.Must(template.ParseFS(views,
		append(adminPartials, "views/admin.html")...))
	t.templates["update-content"] = template.Must(template.ParseFS(views,
		append(adminPartials, "views/update-content.html")...))
	t.templates["login"] = template.Must(template.ParseFS(views,
		"views/login.html"))

	// t.templates["home"] = template.Must(template.ParseFiles("templates/home.html"))
	// t.templates["about"] = template.Must(template.ParseFiles("templates/about.html"))
	// t.templates["contact"] = template.Must(template.ParseFiles("templates/contact.html"))
	// t.templates["404"] = template.Must(template.ParseFiles("templates/404.html"))

	a.server.Renderer = t
}
