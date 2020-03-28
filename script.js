"use strict";
import "@babel/polyfill";
import { getJson } from "./modules/getJsonData";

window.addEventListener("DOMContentLoaded", init);

const HTML = {};
let jsonData = [];
const settings = {};

function init() {
  console.log("init");
  HTML.container = document.querySelector("main");
  HTML.computerImg = document.querySelector(".computer");
  HTML.decade1 = document.querySelector("#decade_one");
  HTML.decade2 = document.querySelector("#decade_two");
  HTML.decade3 = document.querySelector("#decade_three");
  HTML.decade4 = document.querySelector("#decade_four");
  HTML.decade5 = document.querySelector("#decade_five");
  settings.currentDecade = 1;
  getData();
  startObserver();
  hideDetail();

  settings.int = 0;
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

      // if (entry.intersectionRatio >= 0.75) {
      //   console.log("If if if");
      //   //intersectionHandler(entry);
      //   /* console.log("Entry data-number: " + entry.target.getAttribute("data-number"));
      //   decadeSwipe(entry.target.getAttribute("data-number")); */

      //   // find matching link & add appropriate class
      //   // let newLink = document.querySelector(`[href="#${id}"]`).classList.add("is-visible");

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        console.log("Entry data-number: " + entry.target.getAttribute("data-number"));
        decadeSwipe(entry.target.getAttribute("data-number"));

        target.classList.add("is-visible");

        document.querySelector(".picked").classList.remove("picked");

        // document.querySelector(`[href="#${id}"]`).classList.add("picked");

        // let goGO = entry.target.getAttribute("id");
        // getAttribute("data-number", entry.dataset);

        // var newLink = document.querySelector(`[href="#${id}"]`);

        // let decadeButtons = document.querySelector(".dot");

        // const taXa = document.querySelector(".decade_circle");
        // taXa.classList.remove("picked");
        // var elem = document.querySelector("#some-elem");

        // console.log("data-number");
        // // find matching link

        // var newLink = document.querySelector("`[href="#${id}"]`.dot").classList.add("picked");
        // document.querySelector("decade_circle picked").classList.remove("picked");

        document.querySelectorAll(".decade_circle").forEach(decadeButtons => {
          // console.log("decadeButtons");

          if (decadeButtons.hasAttribute("data-number", entry.dataset)) {
            console.log("data-number");
            var id = entry.target.getAttribute("id");
            console.log(id);
            // // decadeButtons.add("picked");
            // // this.decadeButtons.classList.add("picked");

            // decadeButtons.target(`[href="#${id}"]`).classList.add("picked");
            decadeButtons = document.querySelector(`[href="#${id}"]`).classList.add("picked");
          }
          // if (decadeSwipe("data-number") === decadeButtons("data-number")) {
          //   console.log("data-number");

          // }
        });
        // const reColor = elem.classList.remove("picked");
        // get id of the intersecting section
        // let id = entry.target.getAttribute("id");
        // find matching link
        // let newLink = document.querySelector(`[href="#${id}"]`).classList.add("picked");

        // var id = nentry.target.getAttribute("id");
        // find matching link & add appropriate class
        // var newLink = document.querySelector(`[href="#${id}"]`).classList.add("active");

        // if (document.querySelector(`[href="#${id}"]`).classList.contains("dot")) {
        //   let parent = this.dot.parentElement;
        //   parent.classList.add("picked");

        // let id = document.querySelector(`[href="#${id}"]`).classList.add("picked");

        // let elem = document.querySelector(".decade_circle");
        // let decadeButton = elem.querySelector("[data-number");

        // if (decadeButton.hasAttribute(entry.target, this.dataset)) {
        //   //       console.log("Add a drink!");
        //   this.elem.classList.add("picked");
        //   //     }
        // }

        // const decadeButtons = document.querySelector(".dot");
        // let id = entry.target.getAttribute("id");

        // if (decadeButtons.hasAttribute("data-number", this.dataset)) {
        //   console.log("decadeButtons");
        //   //const current = document.querySelector("article");
        //   this.parentElement.classList.add("picked");
        //   //current.classList.remove("picked");
        //   //current.classList.add("picked");
        // }
      } else {
        console.log("else else else");
        target.classList.remove("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  articles.forEach(article => {
    observer.observe(article);
  });

  // function intersectionHandler(entry) {
  //   console.log("intersectionHandler");

  //   const current = document.querySelector("article");
  //   const align = current.getAttribute("data-number");
  //   const next = entry.target;

  //   if (current) {
  //     console.log("current");
  //     document.querySelector("article").getAttribute("data-number", entry.dataset);
  //     console.log("data-number");
  //     current.classList.remove("picked");
  //     current.classList.add("picked");
  //   }
  //   if (next) {
  //   }

  //   function selectDecade() {
  //     console.log("selectDecade");
  //     document.querySelector(".info").classList.remove("hidden");

  //     document.querySelector("article").getAttribute("data-number", this.dataset);

  //     const decadeButtons = document.querySelector(".dot");
  //     // Get the value of an attribute
  //     // var sandwich = decadeButtons.getAttribute("data-number");
  //     console.log("decadeButtons");

  //     decadeButtons.getAttribute("data-number", this.dataset);

  //     document.querySelector(".picked").classList.remove("picked");
  //     decadeButtons.getAttribute("data-number", this.dataset);
  //     this.classList.add("picked");

  //     if (decadeButtons.hasAttribute("data-number", this.dataset)) {
  //       console.log("Add a drink!");
  //     }
  //   }

  //   checkTimeline();
  //   function checkTimeline() {
  //     document.querySelectorAll(".dot").forEach(dot => {
  //       dot.addEventListener("click", selectDecade);
  //     });
  //   }
  // }
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

  document.querySelector("#detail .info p").textContent = settings.currentIcons[buttonId[buttonId.length - 1] - 1].info;
  document.querySelector("#detail .info h2").textContent = settings.currentIcons[buttonId[buttonId.length - 1] - 1].name;
  document.querySelector("#detail .info-img").src = settings.currentIcons[buttonId[buttonId.length - 1] - 1].url;
  setDetailAni();
}

function setDetailAni() {
  let tweenImg = gsap.fromTo(
    "#detail .info-img",
    {
      scale: 0.8,
      opacity: 0
    },
    {
      duration: 0.25,
      scale: 1,
      opacity: 1,
      delay: 0.1,
      ease: "power2"
    }
  );

  let tweenH2 = gsap.fromTo(
    "#detail .info h2",
    {
      scale: 0.8,
      opacity: 0
    },
    {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      delay: 0.3,
      ease: "power2"
    }
  );
  let tweenP = gsap.fromTo(
    "#detail .info p",
    {
      scale: 0.8,
      opacity: 0
    },
    {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      delay: 0.5,
      ease: "power2"
    }
  );
  tweenImg.play();

  //tweenImg.play();
  tweenH2.play();
  tweenP.play();
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

function decadeSwipe(id) {
  console.log("id: " + id);
  let i = settings.currentDecade;
  settings.currentDecade = id;
  if (i != settings.currentDecade) {
    updateDecade();
  }
  /* console.log("Entry data-number: " + entry.target.getAttribute("data-number"));
        decadeSwipe(entry.target.getAttribute("data-number")); */
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

function moveContent() {
  console.log("moveContent");

  gsap.fromTo(
    ".computer-btn",
    {
      rotate: -50,
      duration: 2,

      delay: 0.2,
      stagger: 0.2,
      ease: "elastic"
    },
    {
      duration: 2,
      x: settings.moveContent,
      delay: 0.2,
      stagger: 0.2,
      ease: "elastic"
    }
  );

  setIdleAni();
}

function setIdleAni() {
  settings.int++;
  if (settings.int < 2) {
    let tl = gsap.timeline();
    /*     tl.from(".computer-btn", {
      repeat: -1,
      duration: 2,
      rotate: 50,
      scale: 1,
      repeatDelay: 4,
      stagger: 0.2,
      ease: "elastic"
    }); */
    tl.to(".computer-btn", {
      repeat: -1,
      duration: 2,
      rotate: 360,
      scale: 1.2,
      repeatDelay: 4,
      stagger: 0.2,
      ease: "elastic"
    });
    /*     const move = settings.moveContent + 200;
    gsap.to(".computer", {
      duration: 2,
      scale: 1.1
    }); */
  }

  console.log(settings.int);
}
