let weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

let result = document.querySelector(".monday");
result.innerHTML = `${weekDay} ${hours}:${minuts}`;

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
