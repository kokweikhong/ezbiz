const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar",
  },
  placeholder: "Compose an epic...",
  theme: "snow",
});

quill.on("text-change", function () {
  const content = quill.container.firstChild.innerHTML;
  console.log(content);
  const about = document.querySelector("#about");
  about.value = content;
});
