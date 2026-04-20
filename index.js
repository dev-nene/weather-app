const cityEl = document.querySelector(".city")
const longlatEl = document.querySelector(".longlat")
const tempEl = document.querySelector(".temp")


async function getData() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Belgrade?unitGroup=metric&key=&contentType=json",
    );
    const data = await response.json();
    console.log(data);
    cityEl.textContent = data.address;
    longlatEl.textContent = `Longitude: ${data.longitude} Latitude: ${data.latitude}`
    tempEl.textContent = `${data.currentConditions.temp}°C`;
  } catch (error) {
    console.log(error);
  }
}

getData();