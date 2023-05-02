const key = '4cb5a31adc4fff6205dbb26aa82448a3';
const cityBtn = document.querySelector('.city-btn')

cityBtn.addEventListener('click', async ()=> {
    const inputCity = document.querySelector('.input-city').value
    const weatherResults = document.querySelector('.weather-results')

    const city = await getWeather(inputCity)
    const cityName = (city.name)
    const cityCountry = (city.sys.country)
    const cityLat = (city.coord.lat)
    const cityLon = (city.coord.lon)
    const Temperature = (city.main.temp)
    const minTemp = (city.main.temp_min)
    const FeelsLike = (city.main.feels_like)
    const icon = (city.weather[0].icon)
    
    weatherResults.innerHTML = `<div class = 'weather-info'>
                                <h2 class = "city-tittle">${cityName}, 
                                    <span class = "city-country">${cityCountry}
                                    </span>
                                </h2>
                                <small class = "lat-long">${cityLat} ${cityLon}</small>
                                <p class = "temperature">
                                    <img src = "https://openweathermap.org/img/wn/${icon}@2x.png">${Temperature} ºC 
                                    <small class = "min-temp">Min:${minTemp} ºC</small>
                                </p>
                                <p class = "feels-like">Sensação térmica: ${FeelsLike} ºC</p>
                                </div>
                                `
})

async function getCity(cityName){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${1}&appid=${key}`)

    return await response.json()

}

async function getWeather(cityName) {
    const latLong = await getCity(cityName)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=${key}`)

    return await response.json()
}



