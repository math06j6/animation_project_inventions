// import "@babel/polyfill";
// export async function getJson(url) {
//   let response = await fetch(url);
//   let jsonData = await response.json();
//   return jsonData;
// }

export async function getJson(url) {
  const response = await fetch("data/static_data.json");
  const jsonData = await response.json();
  return jsonData;
}
