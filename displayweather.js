    export function displayWeatherData(data, weatherInfoDiv) {
    weatherInfoDiv.innerHTML = ''; // Clear previous data
    const forecasts = data.list;

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const time = date.toLocaleTimeString('en-US', { timeStyle: 'short' }); // Get the time
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.innerHTML = `
            <h2>${day} ${time}</h2> <!-- Displaying both day and time -->
            <p>T: ${temperature}°C</p>
            <p>D: ${description}</p>
        `;

        weatherInfoDiv.appendChild(weatherCard);
    });
}



