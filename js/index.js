var latitude;
var longitude;
var apiKey = 'ae15b2dcbbbaeafc8916fd9291f12f86';
var url;

// get location
navigator.geolocation.getCurrentPosition(getLocInfo)

function getLocInfo(position) {
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric' + '&APPID=' + apiKey;
  makeRequest()
}

// send request
function makeRequest() {
  var req = new XMLHttpRequest();
  req.responseType = 'json'
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
       if (req.status == 200) {
         processResp(req.response)
       } else {
         throw("Error weather request")
       }
    }
  };
  req.open('GET', url)
  req.send()
}

var weatherEl = document.querySelector('.weather');
var locationEl = weatherEl.querySelector('.weather__location > span');
var tempEl = weatherEl.querySelector('.temp');
var tempButton = weatherEl.querySelector('.weather__info > button');
var weatherIconImg = weatherEl.querySelector('.weather__icon-img');
var isCelsius = true;
var currentTemp;

// process response
function processResp(response) {
  locationEl.innerText = response.sys.country + ' ' + response.name
  tempEl.innerText = response.main.temp
  currentTemp = response.main.temp
  weatherIconImg.src = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png'
}

// button change
tempButton.addEventListener('click', function(e) {
  e.preventDefault()
  if (isCelsius) {
    this.innerText = 'convert to Celsius'
  } else {
    this.innerText = 'convert to Fahrenheit'
  }
  tempEl.innerText = convertTemp(currentTemp).toFixed(1)
})

// converting temperature
function convertTemp(temp) {
  if (isCelsius) {
    isCelsius = false
    currentTemp = temp * 9/5 + 32
    return currentTemp
  } else {
    isCelsius = true
    currentTemp = (temp - 32) * 5/9
    return currentTemp
  }
}