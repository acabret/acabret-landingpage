import Display from "./display.js";

const portfolioBtn = document.querySelector("#portfolio-btn");
const aboutmeBtn = document.querySelector("#aboutme-btn");
const contactBtn = document.querySelector("#contact-btn");
const displayContainer = document.querySelector(".main-content__display");
const displayWrapper = document.querySelector(".display-wrapper");
const footer = document.querySelector("footer");

const showcaseDisplay = new Display(displayWrapper, "showcase");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// function makeDisplayNode(innerHtml) {
//   const parentElement = document.createElement("div");
//   const container = document.createElement("div");
//   parentElement.classList.add("display-parent");
//   parentElement.appendChild(container);
//   container.classList.add("display-container");
//   container.innerHTML = innerHtml;
//   // display.appendChild(parentElement);
//   return parentElement;
// }

// function loadContact() {
//   return `<p>contacto</p>`;
// }
