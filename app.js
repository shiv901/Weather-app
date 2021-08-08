const api = {
  "key": "6dd390294152102bd54fe1a90a491198",
  "baseUrl": "https://api.openweathermap.org/data/2.5/"
} 

var lat, long;
window.addEventListener('load', ()=>{

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude
      getResultsFromCoord(lat, long)
    })
  }
})

const searchBox = document.querySelector('.search')
const form = document.querySelector('.search-box')

form.addEventListener('submit' , (e)=>{
  e.preventDefault()
  if(searchBox.value){getResults(searchBox.value)}
  // console.log(`${api.baseUrl}weather?q=${searchBox.value}&units=metric&APPID=${api.key}`)
})

function getResultsFromCoord(lat, long){
  fetch(`${api.baseUrl}weather?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults)
}

function getResults(city){
  fetch(`${api.baseUrl}weather?q=${city}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults)
}

function displayResults(weather){
  console.log(weather)
  let city = document.querySelector('.city')
  let weatherStatus = document.querySelector('.w-type')
  let temp = document.querySelector('.temp')
  let wind = document.querySelector('.wind')
  let humidity = document.querySelector('.humidity')
  
  city.innerHTML = `${weather.name}, ${weather.sys.country}`
  temp.innerHTML = `${Math.round(weather.main.temp)}°C`
  weatherStatus.innerHTML = `${weather.weather[0].description}`
  wind.innerHTML = `Wind Speed: ${weather.wind.speed} km/h`
  humidity.innerHTML = `Humidity: ${weather.main.humidity}%`
}
