let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let weekDay = weekDays[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minuts = now.getMinutes();
if (minuts < 10) {
  minuts = `0${minuts}`;
}

let result = document.querySelector(".namedDay");
result.innerHTML = `${weekDay} ${hours}:${minuts}`;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastEl = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 daysCol">
          <div class="namedDay">${formatDate(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="sky"
            width=46px  
          />
          <div>
          <strong class="dayDeg">
            ${Math.round(forecastDay.temp.max)}°
            </strong>
            <strong class="nightDeg">
            ${Math.round(forecastDay.temp.min)}°
            </strong>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let cityName = document.querySelector("#cityName");
  let temp = document.querySelector(".deg");
  let wind = document.querySelector(".windSpeed");
  let humidity = document.querySelector(".humidity");
  let description = document.querySelector(".cloudy");
  let icon = document.querySelector(".icon");

  tempCelcius = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  temp.innerHTML = Math.round(tempCelcius);
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCity(city) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search");

  showCity(city.value);
}

function searchLocation(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function geoTemp(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".deg");

  let tempFahrenheit = (tempCelcius * 9) / 5 + 32;
  temp.innerHTML = Math.round(tempFahrenheit);
}

function displayCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector(".deg");
  temp.innerHTML = Math.round(tempCelcius);
}

let tempCelcius = null;

let searchButton = document.querySelector(".search-city");
searchButton.addEventListener("submit", searchSubmit);

let currentTemp = document.querySelector(".geo");
currentTemp.addEventListener("click", geoTemp);

let linkFahrenheit = document.querySelector("#fahrenheit");
linkFahrenheit.addEventListener("click", displayFahrenheit);

let linkCelcius = document.querySelector("#celcius");
linkCelcius.addEventListener("click", displayCelcius);

showCity("Kyiv");
