export function saveCityToLocalStorage(cities) {
    localStorage.setItem('savedCities', JSON.stringify(cities));
}

export function getCityFromLocalStorage() {
    const cities = localStorage.getItem('savedCities');
    return cities ? JSON.parse(cities) : [];
}
