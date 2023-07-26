import { useState } from "react"
function App() {  
    const apiKey = "48519959471b4118c8a96ac375112494"
    const [city, setCity] = useState('')
    console.log(city)

    const cityElement = document.querySelector("#city") as HTMLInputElement;
    const tempElement = document.querySelector("#temperature span") as HTMLInputElement;
    const descElement = document.querySelector("#description") as HTMLInputElement;
    const weatherIconElement = document.querySelector("#weather-icon") as HTMLInputElement;
    const countryElement = document.querySelector("#country") as HTMLInputElement;
    const humidityElement = document.querySelector("#humidity span") as HTMLInputElement;
    const windElement = document.querySelector("#wind span") as HTMLInputElement;
    const weatherContainerHide = document.querySelector('.hide') as HTMLInputElement;

    async function getWeatherData() {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
        const res = await fetch(apiWeatherURL)
        const data = await res.json()
        console.log(data)
        return data
    }

    async function showWeatherData() {
        const data = await getWeatherData();
        cityElement.innerText = data.name;
        tempElement.innerText = data.main.temp; // parseInt(data.main.temp) <-- modo anterior!
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`); //Uso do setAtribute para modificar um atributo do ELEMENTO
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;
        weatherContainerHide.classList.remove('hide')
    };

  return (
    <>
    <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col text-center px-4">
            <p className="text-4xl font-semibold">Clima Tempo</p>
            <p className="text-1xl font-semibold">Aqui você encontra informações sobre Temperatura, Umidade e Vento em tempo real!</p>
        </div>
        <div className="form  drop-shadow-xl">
            <div className="form-input-container flex justify-center gap-4 bg-zinc-500 px-8 py-4 rounded-t-xl">
                <input className="px-2 rounded-xl text-black" type="text" placeholder="Digite O nome da cidade" id="city-input" onKeyDown={(e) => {(e.key === 'Enter' ? showWeatherData() : null )}} onChange={(e) => setCity(e.target.value)}/>
                <button className="p-4 rounded-xl bg-zinc-400 hover:bg-zinc-600" id="search" onClick={showWeatherData}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <div id="weather-data" className="flex flex-col items-center weather-data hide text-xl bg-zinc-500 rounded-b-xl">
                <h2 className="flex items-center gap-4">
                    <i className="fa-solid fa-location-dot"></i>
                    <span id="city"></span>
                    <img src="" width={34} alt="Bandeira do país" id="country"/>
                </h2>
                <p id="temperature"><span></span>&deg;C</p>
                <div id="description-container" className="flex items-center capitalize gap-4">
                    <p id="description">Nublado</p>
                    <img src="" alt="Condições do tempo" id="weather-icon" />
                </div>
                <div className="flex gap-8" id="details-container">
                    <p className="flex items-center gap-2" id="humidity">
                        <i className="fa-solid fa-droplet"></i>
                        <span></span>
                    </p>
                    <p className="flex items-center gap-2" id="wind">
                        <i className="fa-solid fa-wind"></i>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-col text-center px-4 gap-10">
            <div className="flex gap-x-4 drop-shadow-xl">
                <a className="bg-indigo-600 hover:bg-indigo-700 hover:scale-95 transition rounded-xl px-8 py-4" href="https://github.com/i-roger">GitHub</a>
                <a className="bg-blue-600 hover:bg-blue-700 hover:scale-95 transition rounded-xl px-8 py-4" href="https://www.linkedin.com/in/matheus-roger-22555b235/">LinkedIn</a>
            </div>
            <p className="text-1xl font-semibold">Desenvolvido por Matheus Roger</p>
        </div>
    </div>
    </>
  )
}

export default App
