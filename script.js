"use strict";
// import "@babel/polyfill";
import { getJson } from "./modules/getJsonData";

window.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", start);

const HTML = {};
let jsonData = [];
const settings = {};

function init() {
  console.log("init");
  HTML.container = document.querySelector("main");
  HTML.computerImg = document.querySelector(".computer");
  settings.currentDecade = 1;
  getData();
  startObserver();
  hideDetail();
  checkTimeline();

  document.querySelectorAll(".computer-btn").forEach(info => {
    info.addEventListener("click", displayTheme);
  });
}

async function getData() {
  jsonData = await getJson("staticdata.json");
  console.table(jsonData);
  setDecadeEvents();
}

function startObserver() {
  // The Intersection Observer
  // Inspiration from MDN and the article "Beautiful Scrolling Experiences – Without Libraries"
  // Link: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  // Link: https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/

  const articles = document.querySelectorAll("article");

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const { target } = entry;

      if (entry.intersectionRatio >= 0.75) {
        intersectionHandler(entry);

        observer.unobserve(entry.target);
        target.classList.add("is-visible");
      } else {
        target.classList.remove("is-visible");
      }

      const currentDot = document.querySelectorAll("st0");
      // var nav_bar = document.getElementById('side-nav');
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].intersectionRatio > 0) {
          let year = entries[i].target.getAttribute("data-year");
          this.classList.add("active");
          const currentDot = document.querySelectorAll("st0").dataset;

          if (year === currentDot) {
            this.classList.add("active");
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  articles.forEach((article, index) => {
    observer.observe(article);
  });

  function intersectionHandler(entry) {
    console.log("intersectionHandler");

    const current = document.querySelector("article");
    const align = current.getAttribute("align");

    const next = entry.target;

    let elem = document.querySelector("[data-year]");

    // alert(elem.getAttribute("data-year"));

    document.querySelectorAll("[data-year]").forEach(e => {
      e.value = e.dataset.selected;
    });

    let selector = "dataset";
    let links = document.querySelectorAll(selector);
    links.forEach(e => (e.style.color = "orange"));

    if (current) {
      console.log("current");
      console.log("currentDot");
      var yearType = current.getAttribute("data-year");
      console.log("data-year");
      // el.dataset.someDataAttr = "mydata";
      current.classList.remove("active");
      current.classList.add("active");
    }
    if (next) {
    }
  }
}

function hideDetail() {
  console.log("hideDetail");
  document.querySelector("#detail").style.display = "none";
}

function displayTheme() {
  document.querySelector("#detail").style.display = "flex";

  // Te theme will close after a click on the .close-btn
  document.querySelector("#detail .close-btn").addEventListener("click", hideDetail);

  // And/or after a click on the theme:
  document.querySelector("#detail").addEventListener("click", hideDetail);
}

function checkTimeline() {
  document.querySelectorAll(".dot").forEach(dot => {
    // dot.style.fill = "#004153";
    dot.addEventListener("click", selectDecade);
  });
}

function selectDecade() {
  console.log("selectDecade");
  document.querySelector(".info").classList.remove("hidden");
  document.querySelectorAll(".dot").forEach(dot => {
    dot.style.fill = "#004153";
  });
  this.style.fill = "#d95e00";
}
function setDecadeEvents() {
  document.querySelectorAll(".decade-selector a").forEach(element => {
    console.log(element);
    element.addEventListener("click", decadeClick);
  });
}

function decadeClick() {
  // console.log(this.id);
  console.log(event.target.id);
  let i = settings.currentDecade;
  settings.currentDecade = this.id.substring(this.id.length - 1, this.id.length);
  console.log("Current Decade " + settings.currentDecade);
  if (i != settings.currentDecade) {
    updateDecade();
  }
}

function updateDecade() {
  console.log("updateDecade");
  jsonData.forEach(dataElement => {
    console.log(dataElement);
    if (dataElement.id != undefined && dataElement.id.substring(dataElement.id.length - 1, dataElement.id.length) === settings.currentDecade) {
      console.log("inside updateDecade");
      HTML.computerImg.src = dataElement.url;
      document.documentElement.style.setProperty("--move-content", window.innerWidth * (settings.currentDecade - 1) + "px");
      settings.moveContent = window.innerWidth * (settings.currentDecade - 1) + "px";
      const child = jsonData.filter(data => data.childOf === dataElement.name);
      console.table(child);
      setIcons(child);
      moveContent();
    }
  });
}

function setIcons(array) {
  console.log("setIcons");
  document.querySelectorAll(".computer-btn").forEach((button, index) => {
    /* button.style.backgroundImage = array[index].url; */
  });
}

function moveContent() {
  console.log("moveContent");
  let tl = gsap.timeline();
  tl.to(".computer-btn", {
    duration: 2,
    x: settings.moveContent,
    delay: 0.5,
    stagger: 0.2,
    ease: "elastic"
  });
  /*   tl.to(".decade_circle", {
    duration: 2,
    x: settings.moveContent,
    delay: 0.5,
    stagger: 0.2,
    ease: "elastic"
  }); */
}
