import WeatherApp from "./core/WeatherApp";
import OpenWeatherMapDataLoader from "./data/OpenWeatherMapDataLoader";
import OpenWeatherMapLocationSearch from "./data/OpenWeatherMapLocationSearch";

const OPEN_WEATHER_MAP_APP_ID = "610f182df978d44c879ed39ce0f7f9a9";

const weatherDataLoader = new OpenWeatherMapDataLoader(OPEN_WEATHER_MAP_APP_ID);
const locationSearch = new OpenWeatherMapLocationSearch(OPEN_WEATHER_MAP_APP_ID);

const weatherApp = new WeatherApp(weatherDataLoader, locationSearch, 49.68128712714686, 17.04514591890507, "cz");
weatherApp.addOnCurrentWeatherLoadedListener(data => {
    console.log(data);
    console.log("loading ended");
});
weatherApp.addOnCurrentWeatherLoadingStartedListener(() => {
    console.log("loading started");
});

weatherApp.loadCurrentWeather();

/*async function test() {
    const data = await weatherDataLoader.loadCurrentWeatherData(49.68128712714686, 17.04514591890507, "cz");
    console.log(data);

    console.log(weatherDataLoader.getIconURLByIconIdentifier(data.iconIdentifier));

    const forecastData = await weatherDataLoader.loadForecastWeatherData(49.68128712714686, 17.04514591890507, "cz");
    console.log("-------");
    console.log(forecastData);
}*/

/*async function testLocationSearch() {
    const locations = await locationSearch.search("olomouc");
    console.log(locations);
}*/

// test();
// testLocationSearch();

// tak teď jak to bude s tím jazykem?
    // asi bude lepší mít nějaké podporované jazyky než podporovat všechny - tím budu mít možnost přeložit celou aplikaci