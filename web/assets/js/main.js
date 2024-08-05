// function handleImageOnChange(file, previewId) {
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     const img = document.getElementById(previewId);
//     img.src = e.target.result;
//   };
//   reader.readAsDataURL(file);
// }
//
// const favicon = document.getElementById("favicon");
// favicon.addEventListener("change", function () {
//   const file = favicon.files[0];
//   handleImageOnChange(file, "favicon-preview");
// });
//
// const profileImage = document.getElementById("profileImage");
// profileImage.addEventListener("change", function () {
//   const file = profileImage.files[0];
//   handleImageOnChange(file, "profileImage-preview");
// });
//
// const backgroundImage = document.getElementById("backgroundImage");
// const imgDiv = document.getElementById("background-image-preview");
// const imgUpload = document.getElementById("background-image-upload");
// backgroundImage.addEventListener("change", function () {
//   const file = backgroundImage.files[0];
//   imgDiv.classList.remove("hidden");
//   imgUpload.classList.add("hidden");
//   handleImageOnChange(file, "backgroundImage-preview");
// });
//
// const backgroundRemove = document.getElementById("background-image-remove");
// backgroundRemove.addEventListener("click", function () {
//   imgDiv.classList.add("hidden");
//   imgUpload.classList.remove("hidden");
//   backgroundImage.value = "";
// });
