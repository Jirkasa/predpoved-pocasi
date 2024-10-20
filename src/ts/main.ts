import WeatherApp from "./core/WeatherApp";
import OpenWeatherMapDataLoader from "./data/OpenWeatherMapDataLoader";
import OpenWeatherMapLocationSearch from "./data/OpenWeatherMapLocationSearch";
import AppLanguage from "./localization/AppLanguage";
import JSONLanguageDataLoader from "./localization/data/JSONLanguageDataLoader";
import LanguageManager from "./localization/LanguageManager";
import ElementToggle from "./ui/ElementToggle";
import LocationSearchBar from "./ui/LocationSearchBar";

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

new LocationSearchBar(
    document.getElementById("LocationSearchBarInput") as HTMLInputElement,
    document.getElementById("LocationSearchBarResults") as HTMLElement,
    weatherApp
);

const languageDataLoader = new JSONLanguageDataLoader();

const languageManager = new LanguageManager(languageDataLoader);

languageManager.addOnLanguageChangeListener(languageInfo => {
    console.log(languageInfo);
});

languageManager.changeLanguage(AppLanguage.CZECH);