const city = {
    name: '',
    country:'',
    lat:'',
    lon:'',
    temperature:'',
    minTemp:'',
    feelsLike:'',
    icon:'',
    setWeatherInfo(cityName) {
        this.name = cityName.name,
        this.country = cityName.sys.country,
        this.lat = cityName.coord.lat,
        this.lon = cityName.coord.lon,
        this.temperature = Math.floor((cityName.main.temp)),
        this.minTemp = Math.floor((cityName.main.temp_min)),
        this.feelsLike = Math.floor((cityName.main.feels_like))
        this.icon = (cityName.weather[0].icon)
    }
}

export { city }