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
  document.querySelector("#cityName").innerHTML = response.data.name;

  let temp = document.querySelector(".deg");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}°`;

  let wind = document.querySelector(".windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed} km/h`;

  let humid = document.querySelector(".humidity");
  let humidity = response.data.main.humidity;
  humid.innerHTML = `${humidity} mm`;

  let description = document.querySelector(".cloudy");
  description.innerHTML = response.data.weather[0].description;
}

function showCity(city) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  showCity(city);
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

let searchButton = document.querySelector(".search-city");
searchButton.addEventListener("submit", searchSubmit);

let currentTemp = document.querySelector(".geo");
currentTemp.addEventListener("click", geoTemp);

showCity("Kyiv");
