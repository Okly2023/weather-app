import { fetchWeatherData } from "./fetchweather.js";
import { displayWeatherData } from "./displayweather.js";
import { saveCityToLocalStorage, getCityFromLocalStorage } from "./localstorage.js";

const unsplashApiKey = 'Rku-RDeVjJkEs2GeT8sh1bPdjHM4AMYSSf1_Djpt58o'; // Replace with your Unsplash access key
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

const citiesListDiv = document.getElementById('citiesList');
const cityInput = document.getElementById('cityInput');
const addButton = document.getElementById('addButton');

// Load cities from local storage if available
const savedCities = getCityFromLocalStorage() || [];

addButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city && !savedCities.includes(city)) {
        savedCities.push(city);
        saveCityToLocalStorage(savedCities);
        addCityComponent(city);
        cityInput.value = ''; // Clear input field after adding city
    }
});

function addCityComponent(city) {
    const cityComponent = document.createElement('div');
    cityComponent.classList.add('city-component');
    cityComponent.innerHTML = `

    <button class="remove-button">Remove</button>   
    <h3>${city}</h3>
        <div class="city-photo"></div> <!-- Element to display city photo -->
        <div class="weather-info"></div>
        
        
    `;
    citiesListDiv.appendChild(cityComponent);

    const weatherInfoDiv = cityComponent.querySelector('.weather-info');
    const cityPhotoDiv = cityComponent.querySelector('.city-photo');

    const removeButton = cityComponent.querySelector('.remove-button');
    removeButton.addEventListener('click', () => {
        cityComponent.remove();
        const index = savedCities.indexOf(city);
        if (index !== -1) {
            savedCities.splice(index, 1);
            saveCityToLocalStorage(savedCities);
        }
    });

    // Fetch and display weather data for the added city
    fetchWeatherData(city)
        .then(data => {
            displayWeatherData(data, weatherInfoDiv);
        })
        .catch(error => {
            weatherInfoDiv.textContent = 'Error fetching weather data. Please try again later.';
            console.error('Error fetching weather data:', error);
        });

    // Fetch city photo from Unsplash API
    fetch(`${unsplashApiUrl}?query=${city}&client_id=${unsplashApiKey}`)
        .then(response => response.json())
        .then(photoData => {
            if (photoData.urls && photoData.urls.regular) {
                cityPhotoDiv.innerHTML = `<img src="${photoData.urls.regular}" alt="${city}">`;
            } else {
                cityPhotoDiv.textContent = 'Photo not available';
            }
        })
        .catch(error => {
            cityPhotoDiv.textContent = 'Error fetching city photo. Please try again later.';
            console.error('Error fetching city photo:', error);
        });
}

// Populate saved cities on page load
savedCities.forEach(city => {
    addCityComponent(city);
});

