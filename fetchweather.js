const apiKey = '79237acc6bd4a7df3843852bc08f58e9';

export function fetchWeatherData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            throw error;
        });
}
