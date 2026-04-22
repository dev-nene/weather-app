const form = document.querySelector(".form");
const containerEl = document.querySelector(".container");

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const locationInput = document.querySelector("#location");
  const location = locationInput.value;

  if (!location) {
    alert("Location can not be empty");
    return;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=NHLJDJFWYWHFHCEK6ZYP53F9D&contentType=json`;
  try {
    containerEl.textContent = "Loading...";
    const data = await getData(url);
    renderWeather(data, location);
  } catch (error) {
    console.log(error);
  }
});

function renderWeather(data, location, unitGroup = "metric") {
  const { address, currentConditions, description } = data;

  const {
    cloudcover,
    datetime,
    conditions,
    feelslike,
    icon,
    sunrise,
    sunset,
    temp,
    uvindex,
    windspeed,
  } = currentConditions;

  containerEl.innerHTML = `
    <div class="weather-card">
      <div> 
        <h2>${address}</h2>
        <p>${description}</p>
      </div>
      <div>
        <img src="./icons/${icon}.svg">
        <p><strong>UV Index:</strong> ${uvindex}</p>
      </div>
      <div>
        <p><strong>Temperature:</strong> ${temp}${unitGroup === "metric" ? "°C" : "°F"}</p>
        <p><strong>Feels like:</strong> ${feelslike}${unitGroup === "metric" ? "°C" : "°F"}</p>
        <p><strong>Wind:</strong> ${windspeed} ${unitGroup === "metric" ? "km/h" : "mph"}</p>
        <p><strong>Cloud cover:</strong> ${cloudcover}%</p>
      </div>
      <div>
        <p><strong>Time:</strong> ${datetime}</p>
        <p><strong>Condition:</strong> ${conditions}</p>
      </div>
      <div>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
      </div>

      <div class="checkbox-wrapper-2">
        <label class="label-cel">°C</label>
        <input type="checkbox" class="sc-gJwTLC ikxBAC" ${unitGroup === "us" ? "checked" : ""}>
        <label class="label-far">℉</label>
      </div>
    </div>
  `;

  const checkboxEl = document.querySelector(".ikxBAC");
  checkboxEl.addEventListener("change", async function () {
    const newUnit = this.checked ? "us" : "metric";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${newUnit}&key=NHLJDJFWYWHFHCEK6ZYP53F9D&contentType=json`;

    try {
        containerEl.textContent = "Loading...";
        const data = await getData(url);
        renderWeather(data, location, newUnit);
      } catch (error) {
        console.log(error);
      }
  });
}
