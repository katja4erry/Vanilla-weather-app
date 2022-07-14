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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col-2 weathet-forecast-collom">
                <img
                                
                src="img/cloud.png"
                alt="sun"
                width="50"
               />
                <div class="weather-forecast-date" >${day}</div>
               
               <div class="weather-forecast-temperatures">
                 <span class="weather-forecast-temperature-max">18° </span> 
                 <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
             `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  let responseIcon = response.data.weather[0].icon;
  if (responseIcon === "01d") {
    srcIcon = "img/sun.png";
  }
  if (responseIcon === "02d") {
    srcIcon = "img/fewcloud.png";
  }
  if (responseIcon === "03d") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "04d") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "09d") {
    srcIcon = "img/rain.png";
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
    srcIcon = "img/mist.png";
  }
  if (responseIcon === "01n") {
    srcIcon = "img/sun.png";
  }
  if (responseIcon === "02n") {
    srcIcon = "img/fewcloud.png";
  }
  if (responseIcon === "03n") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "04n") {
    srcIcon = "img/cloudly.png";
  }
  if (responseIcon === "09n") {
    srcIcon = "img/rain.png";
  }
  if (responseIcon === "10n") {
    srcIcon = "img/rain.png";
  }
  if (responseIcon === "11n") {
    srcIcon = "img/groza.png";
  }
  if (responseIcon === "13n") {
    srcIcon = "img/snow.png";
  }
  if (responseIcon === "50n") {
    srcIcon = "img/mist.png";
  }
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `${srcIcon}`);
}

function search(city) {
  let apiKey = "827bb2da8bfca5b7c691ac1dc2ac84b8";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

displayForecast();
