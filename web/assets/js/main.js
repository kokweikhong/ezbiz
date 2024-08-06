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
// Light switcher
const lightSwitches = document.querySelectorAll(".light-switch");
if (lightSwitches.length > 0) {
  lightSwitches.forEach((lightSwitch, i) => {
    if (localStorage.getItem("dark-mode") === "true") {
      // eslint-disable-next-line no-param-reassign
      lightSwitch.checked = true;
    }
    lightSwitch.addEventListener("change", () => {
      const { checked } = lightSwitch;
      lightSwitches.forEach((el, n) => {
        if (n !== i) {
          // eslint-disable-next-line no-param-reassign
          el.checked = checked;
        }
      });
      document.documentElement.classList.add("[&_*]:!transition-none");
      if (lightSwitch.checked) {
        document.documentElement.classList.add("dark");
        document.querySelector("html").style.colorScheme = "dark";
        localStorage.setItem("dark-mode", true);
        document.dispatchEvent(
          new CustomEvent("darkMode", { detail: { mode: "on" } }),
        );
      } else {
        document.documentElement.classList.remove("dark");
        document.querySelector("html").style.colorScheme = "light";
        localStorage.setItem("dark-mode", false);
        document.dispatchEvent(
          new CustomEvent("darkMode", { detail: { mode: "off" } }),
        );
      }
      setTimeout(() => {
        document.documentElement.classList.remove("[&_*]:!transition-none");
      }, 1);
    });
  });
}

function toast(isError) {
  return {
    isError: isError,
    show: true,
    progress: 0,
    init() {
      this.show = true;
      this.progress = 0;
      this.runProgress();
    },
    runProgress() {
      let intervalTime = 100; // Interval time in milliseconds
      let totalTime = 5000; // Total time the toast should be visible in milliseconds
      let increment = (intervalTime / totalTime) * 100;

      const interval = setInterval(() => {
        this.progress += increment;
        if (this.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => this.closeToast(), intervalTime); // Wait for the last update before closing
        }
      }, intervalTime);
    },
    closeToast() {
      this.show = false;
      this.progress = 0;
    },
  };
}
