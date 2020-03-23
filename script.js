"use strict";
// import "@babel/polyfill";
import { getJson } from "./modules/getJsonData";

window.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", start);

const HTML = {};
let jsonData = [];

function init() {
  console.log("init");
  HTML.container = document.querySelector("main");
  getData();
  startObserver();
  hideDetail();
  checkTimeline();

  document.querySelectorAll(".computer-btn").forEach(info => {
    info.addEventListener("click", displayTheme);
  });
}

async function getData() {
  jsonData = await getJson("static_data.json");
  console.table(jsonData);
}

function startObserver() {
  // The Intersection Observer
  // Inspiration from MDN and the article "Beautiful Scrolling Experiences – Without Libraries"
  // Link: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // Link: https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/

  const articles = document.querySelectorAll("article");

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
}

function hideDetail() {
  console.log("hideDetail");
  document.querySelector("#detail").style.display = "none";
}

function displayTheme() {
  // create clone
  // const clone = document.querySelector("template#theme").content.cloneNode(true);

  document.querySelector("#detail").style.display = "flex";

  // Hvis man klikker et vilkårligt sted på knappen .close-btn, så lukker man fuldskærmsvisning
  document.querySelector("#detail .close-btn").addEventListener("click", hideDetail);

  // Hvis man klikker et vilkårligt sted på pop-up card, så lukker man fuldskærmsvisning
  document.querySelector("#detail").addEventListener("click", hideDetail);
}

function checkTimeline() {
  document.querySelectorAll(".dot").forEach(dot => {
    dot.style.fill = "#004153";
    dot.addEventListener("click", displayMovie);
  });
}

function displayMovie() {
  console.log("displayMovie");
  document.querySelector(".info").classList.remove("hidden");
  document.querySelectorAll(".dot").forEach(dot => {
    // dot.style.stroke = "004153";
    dot.style.fill = "#004153";
  });
  // this.style.stroke = "#004153";
  this.style.fill = "#d95e00";
}
