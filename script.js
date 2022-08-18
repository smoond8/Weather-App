const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const otherItemEl = document.getElementById("other-item");
const timeZoneEl = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const currentEl = document.getElementById("current");
const weatherForEl = document.getElementById("weatherfor");
const cityE1 = document.getElementById("city");

let dayArray = ["Monday", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
let monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  //set interval is fuction which is automaticaly called after a fix time.

  let time = new Date();
  let date = time.getDate();
  let month = time.getMonth();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let day = time.getDay();
  let time12HourFormat = hour >= 13 ? hour % 12 : hour;
  let ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (time12HourFormat < 10 ? "0" + time12HourFormat : time12HourFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ` <span id="am-pm">${ampm}</span`;
  dateEl.innerHTML = dayArray[day] + "," + date + monthArray[month];
}, 1000);

let API = `e5c7bc0b000ea0ceffd7965739d7d255`;
const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((succsess) => {
    let { latitude, longitude } = succsess.coords;
    const weatherDataURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API}`;

    fetch(weatherDataURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
getWeatherData();

const showWeatherData = (data) => {
  let { speed } = data.list;
  let { sunrise, sunset, country, name } = data.city;

  cityE1.innerHTML = `<div class="time-zone" id="city">${name}</div>`;
  countryEl.innerHTML = `<div class="country" id="country">${country}</div>`;

  let otherDayForcast = "";
  data.list.forEach((day, idx) => {
    if (idx == 0) {
        otherItemEl.innerHTML = `<div class="weather-item">
        <div class="hum">humidity</div>
        <div class="val">${day.main.humidity}%</div>
     </div>
    
     <div class="weather-item">
       <div class="hum">pressure</div>
       <div class="val">${day.main.pressure}</div>
    </div>
       <div class="weather-item">
       <div class="hum">wind-speed</div>
       <div class="val">${day.wind.speed}</div>
    </div>
    <div class="weather-item">
       <div class="hum">sunrise</div>
       <div class="val">${        
         new Date(sunrise * 1000).getHours() +
        ":" +
        new Date(sunrise * 1000).getUTCMinutes()+" AM"}</div>
    </div>
    
    <div class="weather-item">
       <div class="hum">sunset</div>
       <div class="val">${
         new Date(sunset * 1000).getHours() +
         ":" +
         new Date(sunset * 1000).getUTCMinutes()+"PM"
       }</div>
    </div>
    </div>`;
 

    

      currentEl.innerHTML = `              
          <div class="today" id="current">
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w">
        <div class="day">${day.dt}</div>
        <div class="cloud">${day.weather[0].main}</div>
        <div class="temp">Night - ${day.main.feels_like}&#176; C</div>
        <div class="temp">Day - ${day.main.temp_min}&#176; C</div>

    </div>`;
     
    } else {
      otherDayForcast += `            
        <div class="weather-for" id="weatherfor">
        <div class="weather-for-item">
            <div class="day">${day.dt}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w">
            <div class="cloud">${day.weather[0].main}</div>
            <div class="temp">Night - ${day.main.feels_like}&#176; C</div>
            <div class="temp">Day - ${day.main.temp_min}&#176; C</div>
        </div>
        </div>`;
    }
  });

  weatherForEl.innerHTML = otherDayForcast;
  console.log(otherDayForcast);
};
