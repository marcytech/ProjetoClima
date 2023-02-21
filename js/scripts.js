const apiKey = "ee4eb9a0e1c7381b729da2e36714d677"
const apiCountryURL = "https://countryflagsapi.com/png/"

const CityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const getWeatherData = async (city) => {
	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

	const res = await fetch(apiWeatherURL)
	const data = await res.json()
	return data
}

const showWeatherData = async (city) => {
	const data = await getWeatherData(city)

	cityElement.innerText = data.name
	tempElement.innerText = parseInt(data.main.temp)
	descElement.innerText = data.weather[0].description
	weatherIconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
	)

	countryElement.setAttribute("src", 
		apiCountryURL + data.sys.country.toLowerCase()
	)

  console.log(apiCountryURL + data.sys.country.toLowerCase())

	humidityElement.innerText = `${data.main.humidity}%`
	windElement.innerText = `${data.wind.speed}km/h`

	weatherContainer.classList.remove("hide")
}

searchBtn.addEventListener("click", (e) => {
	e.preventDefault()

	const city = CityInput.value

	showWeatherData(city)
})

CityInput.addEventListener("keyup", (e) => {
	if (e.code === "Enter") {
		const city = e.target.value

		showWeatherData(city)
	}
})
