const cityBtn = document.querySelector('.city-btn')
var map

cityBtn.addEventListener('click', async () => {
    const inputCity = document.querySelector('.input-city').value
    const weatherResults = document.querySelector('.weather-results')

    if(!inputCity) {
        alert('Informe uma cidade')
    }

    const city = await getWeather(inputCity)
    const cityName = (city.name)
    const cityCountry = (city.sys.country)
    const cityLat = (city.coord.lat)
    const cityLon = (city.coord.lon)
    const Temperature = Math.floor((city.main.temp))
    const minTemp = Math.floor((city.main.temp_min))
    const FeelsLike = Math.floor((city.main.feels_like))
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

async function getCity(cityName) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${1}&appid=4cb5a31adc4fff6205dbb26aa82448a3`)

    return await response.json()

}

async function getWeather(cityName) {
    const latLong = await getCity(cityName)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=4cb5a31adc4fff6205dbb26aa82448a3`)

    renderMap(cityName)

    return await response.json()
}

async function renderMap(cityName) {
    const latLong = await getCity(cityName)

    if (map === undefined) {
        map = L.map('map').setView([latLong[0].lat,latLong[0].lon], 13);
    } else {
        map.remove()
        map = L.map('map').setView([latLong[0].lat,latLong[0].lon], 13);
    }
   
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latLong[0].lat,latLong[0].lon]).addTo(map)
        .openPopup();

}







