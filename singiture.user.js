
// ==UserScript==
// @name         AUTO SIGNE NABIL
// @namespace    http://tampermonkey.net/
// @version      2026-01-29
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:5500/
// @match        *://nabilfantazi.github.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==


const cachetImages = []
const tvaImages = []


function getRandomImage(imagesArray) {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
}


const costumButton = document.getElementById("costumButton");
costumButton.addEventListener("click", () => {

    const randomCachet1 = getRandomImage(cachetImages);
    const randomCachet2 = getRandomImage(cachetImages);
    const randomTva = getRandomImage(tvaImages);

    const replaceImage = (containerId, newImageData) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const oldImg = container.querySelector("img");
      if (oldImg) {
        oldImg.src = newImageData;
      }
    };

    replaceImage("image1", randomCachet1);
    replaceImage("cachetfiche", randomCachet2);
    replaceImage("image2", randomTva);

    const clientSignitureImg =
      document.getElementById("clientsigniture").firstElementChild;

    if (!clientSignitureImg) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png";

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        clientSignitureImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    fileInput.click();
  }
);
