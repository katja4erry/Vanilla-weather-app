function formatDate(timestemp) {
  let date = new Date(timestemp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let responseIcon = response.data.weather[0].icon;
  if (responseIcon === "01d") {
    srcIcon = "img/sun.png";
  }
  if (responseIcon === "02d") {
    srcIcon = "img/cloud.png";
  }
  if (responseIcon === "03d") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "04d") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "09d") {
    srcIcon = "img/snow.png";
  }
  if (responseIcon === "10d") {
    srcIcon = "img/rain.png";
  }
  if (responseIcon === "11d") {
    srcIcon = "img/groza.png";
  }
  if (responseIcon === "13d") {
    srcIcon = "img/snow.png";
  }
  if (responseIcon === "50d") {
    srcIcon = "img/cloudly.png";
  }

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `${srcIcon}`);
}

let apiKey = "827bb2da8bfca5b7c691ac1dc2ac84b8";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
