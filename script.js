"use strict";

// document.querySelector("h1").textContent = "Goddag";

// const data = [
//   {
//     i: "beachball.svg"
//   }
// ];
// data.forEach(d => {
//   const t = document.createElement("svg");
//   t.src = "elements/" + d.i;
//   document.body.appendChild(t);
// });

window.addEventListener("DOMContentLoaded", init);

const HTML = {};

function init() {
  console.log("init");
  HTML.container = document.querySelector("main");
}

const articles = document.querySelectorAll("article");

// The Intersection Observer
// Inspiration from MDN and the article "Beautiful Scrolling Experiences – Without Libraries"
// Link: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Link: https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/

let options = {
  rootMargin: "0px",
  threshold: 0.75
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    const { target } = entry;

    if (entry.intersectionRatio >= 0.75) {
      target.classList.add("is-visible");
      target.classList.add("is-visible");
    } else {
      target.classList.remove("is-visible");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

articles.forEach((article, index) => {
  observer.observe(article);
});
