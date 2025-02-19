document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(
        city
      )}/EN`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "afddbcf044msh2879d75a500f308p1482bfjsnf0b87d3990fb",
          "x-rapidapi-host": "open-weather13.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    showWeather(
      data.name,
      data.main.temp,
      data.main.feels_like,
      data.main.humidity,
      data.wind.speed,
      data.weather[0].description
    );
  } catch {
    showWeather("City not found");
  }
});

const showWeather = (name, temp, feels, humidity, wind, description) => {
  document.getElementById("weatherResult").innerHTML =
    name === "City not found"
      ? `<p>${name}</p>`
      : `<h2>${name}</h2></br>
       <p>Temperature: ${temp}°C</p>
       <p>Feels Like: ${feels}°C</p>
       <p>Humidity: ${humidity}%</p>
       <p>Wind Speed: ${wind} m/s</p>
       <p>Weather: ${description}</p>`;
  document.getElementById("weatherResult").style.display = "block";
};
