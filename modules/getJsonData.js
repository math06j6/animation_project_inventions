// import "@babel/polyfill";
export async function getJson(url) {
  let response = await fetch(url);
  let jsonData = await response.json();
  return jsonData;
}
