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

  // document.querySelectorAll(".computer-btn").forEach(info => {
  //   info.addEventListener("click", displayTheme);
  // });
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
      console.log(entry.target, entry.isIntersecting, entry.intersectionRatio);
      const { target } = entry;

      if (entry.intersectionRatio >= 0.75) {
        intersectionHandler(entry);

        var id = entry.target.getAttribute("id");
        // find matching link & add appropriate class
        let newLink = document.querySelector(`[href="#${id}"]`).classList.add("is-visible");
        observer.unobserve(entry.target);

        target.classList.add("is-visible");
        // target.style.background = entry.target.dataset.background;
      } else {
        target.classList.remove("is-visible");
      }
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        document.querySelector(".picked").classList.remove("picked");
        // get id of the intersecting section
        var id = entry.target.getAttribute("id");
        // find matching link
        var newLink = document.querySelector(`[href="#${id}"]`).classList.add("picked");
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
    const align = current.getAttribute("data-year");
    const next = entry.target;

    if (current) {
      console.log("current");
      document.querySelector("article").getAttribute("data-year", entry.dataset);
      console.log("data-year");
      current.classList.remove("picked");
      current.classList.add("picked");
    }
    if (next) {
    }

    function selectDecade() {
      console.log("selectDecade");
      document.querySelector(".info").classList.remove("hidden");

      document.querySelector("article").getAttribute("data-year", this.dataset);

      const decadeButtons = document.querySelector(".dot");
      // Get the value of an attribute
      var sandwich = decadeButtons.getAttribute("data-year");
      console.log("decadeButtons");

      decadeButtons.getAttribute("data-year", this.dataset);

      document.querySelector(".picked").classList.remove("picked");
      decadeButtons.getAttribute("data-year", this.dataset);
      this.classList.add("picked");

      if (decadeButtons.hasAttribute("data-year", this.dataset)) {
        console.log("Add a drink!");
      }
    }

    checkTimeline();
    function checkTimeline() {
      document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", selectDecade);
      });
    }
  }
}

function hideDetail() {
  console.log("hideDetail");
  document.querySelector("#detail").style.display = "none";
}

function displayTheme(buttonId) {
  document.querySelector("#detail").style.display = "flex";

  // The theme will close after a click on the .close-btn
  document.querySelector("#detail .close-btn").addEventListener("click", hideDetail);

  // And/or after a click on the theme:
  document.querySelector("#detail").addEventListener("click", hideDetail);

  console.log("button id: " + buttonId);
  console.log("button id: " + buttonId[buttonId.length - 1]);
  console.table("button id: " + settings.currentIcons[buttonId[buttonId.length - 1] - 1].info);
  document.querySelector("#detail .info p").textContent = settings.currentIcons[buttonId[buttonId.length - 1] - 1].info;
  document.querySelector("#detail .info h2").textContent = settings.currentIcons[buttonId[buttonId.length - 1] - 1].name;
  document.querySelector("#detail .info-img").src = settings.currentIcons[buttonId[buttonId.length - 1] - 1].url;
}

function setDecadeEvents() {
  settings.currentIcons = jsonData.filter(data => data.childOf === "80erpc");
  setIcons();
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
      settings.currentIcons = jsonData.filter(data => data.childOf === dataElement.name);
      setIcons();
      moveContent();
    }
  });
}

function setIcons() {
  console.log("setIcons");
  document.querySelectorAll(".computer-btn").forEach((button, index) => {
    if (settings.currentIcons[index] != undefined) {
      button.style.backgroundImage = `url(${settings.currentIcons[index].url})`;
      button.addEventListener("click", function() {
        displayTheme(button.id);
      });
    } else {
      button.style.backgroundImage = "";
    }
  });
}

/*   document.querySelectorAll(".computer-btn").forEach(info => {
    info.addEventListener("click", displayTheme);
  }); */

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
  /*   tl.to(".computer-btn", {
    duration: 2,
    repeat: Infinity,
    scale: 1.3,
    delay: 0.5,
    yoyo: true,
    stagger: 0.2,
    ease: "elastic"
  }); */
}
