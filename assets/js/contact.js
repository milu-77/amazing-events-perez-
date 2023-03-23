let mode = document.getElementById("mode");
let modeView;
mode.addEventListener("click", function () {
  modeChange();
});

testMode();

function testMode() {
  if (localStorage.getItem("mode") == null) {
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    localStorage.setItem("mode", 0);
    modeView = localStorage.getItem("mode");
    let body = document.getElementById("modeColor");
    body.className = "dark"
  } if (localStorage.getItem("mode") == 1) {
    mode.innerHTML = ` <span><i class="bi bi-brightness-high-fill lgth"></i></span>`;
    localStorage.setItem("mode", 1);
    modeView = localStorage.getItem("mode");
    let body = document.getElementById("modeColor");
    body.className = "ligth";

  } else {
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    localStorage.setItem("mode", 0);
    modeView = localStorage.getItem("mode");
    let body = document.getElementById("modeColor");
    body.className = "dark"
  }
 }
function modeChange() {
  if (modeView == 1) {
    mode.innerHTML = `<span> <i class="bi bi-moon-stars drk"></i></span>`;
    modeView = 0;
    localStorage.setItem("mode", 0);
    let body = document.getElementById("modeColor");
    body.className = "dark";
  } else {
    mode.innerHTML = `<span> <i class="bi bi-brightness-high-fill lgth"></i></span>`;
    modeView = 1;
    localStorage.setItem("mode", 1);
    let body = document.getElementById("modeColor");
    body.className = "ligth";
  }
 }