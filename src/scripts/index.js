import { city } from './objects/city.js'
import { screen } from './objects/screen.js'

const cityBtn = document.querySelector('.city-btn')
const inputCity = document.querySelector('.input-city')
 var map

cityBtn.addEventListener('click', async () => {
    const inputCityName = inputCity.value

    if (!inputCityName) {
        alert('Informe uma cidade')
        return
    }
    const cityReponse = await getWeather(inputCityName)
    city.setWeatherInfo(cityReponse)
    screen.renderWeatherInfos(city)
    inputCity.value = ''
    inputCity.focus()
})

inputCity.addEventListener('keyup', async (e) => {
    const key = e.keycode || e.which
    if (key === 13) {
        const inputCityName = inputCity.value

        if (!inputCityName) {
            alert('Informe uma cidade')
            return
        }

        const cityReponse = await getWeather(inputCityName)
        city.setWeatherInfo(cityReponse)
        screen.renderWeatherInfos(city)
        inputCity.value = ''
        inputCity.focus()

    }
})

async function getCity(cityName) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${1}&appid=4cb5a31adc4fff6205dbb26aa82448a3`)

    return await response.json()

}

async function getWeather(cityName) {
    try {
        const latLong = await getCity(cityName)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=4cb5a31adc4fff6205dbb26aa82448a3`)
        
    
        renderMap(cityName)
    
        return await response.json()

    } catch (err) {
        alert('Cidade não existe')
    }
}

async function renderMap(cityName) {
   
    const latLong = await getCity(cityName)

    if (map === undefined) {
        map = L.map('map').setView([latLong[0].lat, latLong[0].lon], 13);
    } else {
        map.remove()
        map = L.map('map').setView([latLong[0].lat, latLong[0].lon], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latLong[0].lat, latLong[0].lon]).addTo(map)
        .openPopup();

}







