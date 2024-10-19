import OpenWeatherMapDataLoader from "./data-loader/OpenWeatherMapDataLoader";

const OPEN_WEATHER_MAP_APP_ID = "610f182df978d44c879ed39ce0f7f9a9";

const weatherDataLoader = new OpenWeatherMapDataLoader(OPEN_WEATHER_MAP_APP_ID);

async function test() {
    const data = await weatherDataLoader.loadCurrentWeatherData(49.68128712714686, 17.04514591890507);
    console.log(data);

    console.log(weatherDataLoader.getIconURLByIconIdentifier(data.iconIdentifier));

    const forecastData = await weatherDataLoader.loadForecastWeatherData(49.68128712714686, 17.04514591890507);
    console.log("-------");
    console.log(forecastData);
}

// test();