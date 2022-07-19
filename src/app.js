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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let responseIcon = `${forecastDay.weather[0].icon}`;
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
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2 weathet-forecast-collom">
                <img
                                
                src=${srcIcon}
                alt="sun"
                width="50"
               />
               
                <div class="weather-forecast-date" >${formatDay(
                  forecastDay.dt
                )}</div>
               
               <div class="weather-forecast-temperatures">
                 <span class="weather-forecast-temperature-max">${Math.round(
                   forecastDay.temp.max
                 )}° </span> 
                 <span class="weather-forecast-temperature-min">${Math.round(
                   forecastDay.temp.min
                 )}°</span>
                </div>
              </div>
             `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "827bb2da8bfca5b7c691ac1dc2ac84b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.coord);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
