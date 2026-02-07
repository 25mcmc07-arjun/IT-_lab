interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const apiKey: string = "YOUR_API_KEY_HERE";

function getWeather(): void {
  const cityInput = document.getElementById("cityInput") as HTMLInputElement;
  const city: string = cityInput.value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const url: string =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then((data: WeatherData) => displayWeather(data))
    .catch(() => {
      document.getElementById("weatherResult")!.innerHTML =
        "City not found!";
    });
}

function displayWeather(data: WeatherData): void {
  const result = document.getElementById("weatherResult") as HTMLDivElement;

  result.innerHTML = `
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}

(window as any).getWeather = getWeather;
