"use strict";
import "@babel/polyfill";
import { getJson } from "./modules/getJsonData";

document.addEventListener("DOMContentLoaded", start);

let jsonData = [];

async function start() {
  jsonData = await getJson("./static_data.json");
  console.table(jsonData);
}
