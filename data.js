import axios from "axios";

// get container where h2 elements will be stored
const earthParams = document.querySelector(".earth-params");

const planetName = document.querySelector(".planet-name");

// fetch interesting data about planet Earth
const getData = async (planet) => {
  let planetData = await axios.get(
    `https://api.le-systeme-solaire.net/rest/bodies/${planet}`
  );
  // flush elements
  earthParams.innerHTML = "";

  if (planetData.data.englishName === "Mars") {
    planetName.style.color = "red";
  } else {
    planetName.style.color = "lightblue";
  }

  for (let e in planetData.data) {
    if (e === "englishName") {
      planetName.innerHTML = planetData.data[e];
    } else if (e === "density") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Density: ${planetData.data[e]} g/cm^3`;
    } else if (e === "avgTemp") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Avg. temperature: ${planetData.data[e]} K`;
    } else if (e === "bodyType") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Type: ${planetData.data[e]}`;
    } else if (e === "gravity") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Gravity: ${planetData.data[e]} m/s`;
    } else if (e === "perihelion") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Perihelion: ${planetData.data[e]} km`;
    } else if (e === "aphelion") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Aphelion: ${planetData.data[e]} km`;
    } else if (e === "equaRadius") {
      const newH2 = document.createElement("h2");
      earthParams.appendChild(newH2);
      newH2.innerHTML = `Equator radius: ${planetData.data[e]} km`;
    }
  }
};

export default getData;
