const screen = {
    cityWeatherInfos : document.querySelector('.weather-results'),

    renderWeatherInfos(city) {
        this.cityWeatherInfos.innerHTML = 
                `<div class = 'weather-info'>
                    <h2 class = "city-tittle">${city.name}, 
                        <span class = "city-country">${city.country}</span>
                    </h2>
                    <small class = "lat-long">${city.lat} ${city.lon}</small>
                    <p class = "temperature">
                        <img src = "https://openweathermap.org/img/wn/${city.icon}@2x.png">${city.temperature} ºC 
                        <small class = "min-temp">Min:${city.minTemp} ºC</small>
                    </p>
                    <p class = "feels-like">Sensação térmica: ${city.feelsLike} ºC</p>
                </div>
                `
    }
}

export {screen}