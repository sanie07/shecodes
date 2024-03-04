let apiKey = "ed03b85af3afdd1609b1odt4bf2f3bbf";
let unit = "metric";
let cityForm = document.querySelector("#city-form");
function upateTemperatureAndCity(response) {
  console.log(response);
  //Validate
  if (response.data.status == "not_found") {
    alert("Error: city not found");
    return;
  }

  //update city
  let city_name = document.querySelector("#city-name");
  city_name.innerHTML = `${response.data.city}, ${response.data.country} `;

  //update temperature
  let current_temperature = Math.round(response.data.temperature.current);
  let c = document.querySelector("#current-temperature");
  c.innerHTML = `${current_temperature}${unit == "metric" ? "°C" : "°F"}`;

  //update temperature image
  let imagen = document.querySelector("#weather-image");
  imagen.src = response.data.condition.icon_url;

  //update weather description
  let wd = document.querySelector("#current-weather-description");
  wd.innerHTML = response.data.condition.description;

  //update wind velocity
  let w = document.querySelector("#current-wind");
  w.innerHTML = `${response.data.wind.speed}km/h`;

  //update humidity
  let h = document.querySelector("#current-humidity");
  h.innerHTML = `${response.data.temperature.humidity}%`;
}

function handleInput(event) {
  //getcity
  let input = document.querySelector("#city-input");
  event.preventDefault();

  //city current temperature
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input.value}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(upateTemperatureAndCity);
}

cityForm.addEventListener("submit", handleInput);
let date = new Date();
let time = document.querySelector("#current-time");

function FormatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutos = 0;
  if (date.getMinutes() < 10) {
    minutos = `0${date.getMinutes()}`;
  } else {
    minutos = date.getMinutes();
  }
  let output = `${days[date.getDay()]} ${date.getHours()}:${minutos}`;
  return output;
}

time.innerHTML = FormatDate(new Date());
