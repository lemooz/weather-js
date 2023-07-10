const key = "32ca4b57f91c39fe20aa4fdbf9d33298"

const changeMeasure = document.getElementById("switch");
const flagLang = document.getElementById("flagLang");



changeMeasure.addEventListener("change", function() {
  if (changeMeasure.checked) {
    flagLang.src = "img/usa-flag.png";
    document.querySelector("#windLang").innerHTML = "Humidity"
    document.querySelector("#humidityLang").innerHTML = "Wind"
    document.querySelector("#feelsLang").innerHTML = "Feels Like"
    document.querySelector(".firstH2").textContent = "Search a city..."
  } else {
    flagLang.src = "img/br-flag.png";
    document.querySelector("#windLang").innerHTML = "Umidade"
    document.querySelector("#humidityLang").innerHTML = "Vento"
    document.querySelector("#feelsLang").innerHTML = "Sensacao Termica"
    document.querySelector(".firstH2").textContent = "Pesquisar cidade..."
    document.querySelector(".city-input").placeholder = "Nome da sua cidade"
  }
});

function uiData(weatherData) {
    if(changeMeasure.checked){
    document.querySelector(".city").innerHTML = weatherData.name
    document.querySelector(".description").innerHTML = weatherData.weather[0].description
    document.querySelector(".temperature").innerHTML = Math.round(weatherData.main.temp) + "°F"
    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%"
    document.querySelector(".wind").innerHTML = weatherData.wind.speed + "m/s" 
    document.querySelector(".feels").innerHTML = weatherData.main.feels_like
    }else{
    document.querySelector(".city").innerHTML = weatherData.name
    document.querySelector(".description").innerHTML = weatherData.weather[0].description
    document.querySelector(".temperature").innerHTML = Math.round(weatherData.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%"
    document.querySelector(".wind").innerHTML = weatherData.wind.speed + "m/s" 
    document.querySelector(".feels").innerHTML = weatherData.main.feels_like
    }
    
}

async function findCity(city){
 
    if(changeMeasure.checked){
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial&lang=en`).then(response => response.json())
    console.log(weatherData)

    uiData(weatherData)
    }else{
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`).then(response => response.json())
    console.log(weatherData)

    uiData(weatherData)
    }
    
    
    
}

function searchCity(){
    const city = document.querySelector(".city-input").value

    findCity(city)
    console.log(city)
}


function handleKeyPress(event) {
    if (event.keyCode === 13) {
            searchCity()
            console.log()
    }
}

document.querySelector(".city-input").addEventListener("keypress", handleKeyPress);
