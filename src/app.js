const button = document.getElementById("responsive-button");

const menu = document.getElementById("menu").style;
button.style.display = "block";

// document.getElementById("menu").style.display = ''

button.onclick = (e) => {
  const menu = document.getElementById("menu").style.display;

  if (menu === "block") {
    document.getElementById("menu").style.display = "none";
  } else {
    document.getElementById("menu").style.display = "block";
  }
};

const link = document.querySelectorAll(".link").forEach((element) =>
  element.addEventListener("click", () => {
    if (window.screen.width < 1020) {
      document.getElementById("menu").style.display = "none";
    }
  })
);
