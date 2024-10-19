import WeatherApp from "./core/WeatherApp";
import OpenWeatherMapDataLoader from "./data/OpenWeatherMapDataLoader";
import OpenWeatherMapLocationSearch from "./data/OpenWeatherMapLocationSearch";
import ElementToggle from "./ui/ElementToggle";

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

new ElementToggle({
    targetElement: document.getElementById("LanguageSelectItems") as HTMLElement,
    openedCSSClass: "language-select__items--opened",
    buttonElement: document.getElementById("LanguageSelectButton") as HTMLElement,
    buttonOpenedCSSClass: "language-select__button--opened",
    closeOnClickOutside: true
});