const cityEl = document.querySelector(".city");
const longlatEl = document.querySelector(".longlat");
const tempEl = document.querySelector(".temp");

const form = document.querySelector(".form");
const locationInput = document.querySelector("#location");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locationInput.value;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=NHLJDJFWYWHFHCEK6ZYP53F9D&contentType=json`;
  async function getData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      cityEl.textContent = data.address;
      longlatEl.textContent = `Longitude: ${data.longitude} Latitude: ${data.latitude}`;
      tempEl.textContent = `${data.currentConditions.temp}°C`;
    } catch (error) {
      console.log(error);
    }
  }
  getData();
});
