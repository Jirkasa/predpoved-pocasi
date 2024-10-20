import WeatherApp from "./core/WeatherApp";
import OpenWeatherMapDataLoader from "./data/OpenWeatherMapDataLoader";
import OpenWeatherMapLocationSearch from "./data/OpenWeatherMapLocationSearch";
import AppLanguage from "./localization/AppLanguage";
import JSONLanguageDataLoader from "./localization/data/JSONLanguageDataLoader";
import LanguageManager from "./localization/LanguageManager";
import WeatherAppUI from "./ui/WeatherAppUI";

const OPEN_WEATHER_MAP_APP_ID = "610f182df978d44c879ed39ce0f7f9a9";

const weatherDataLoader = new OpenWeatherMapDataLoader(OPEN_WEATHER_MAP_APP_ID);
const locationSearch = new OpenWeatherMapLocationSearch(OPEN_WEATHER_MAP_APP_ID);
const weatherApp = new WeatherApp(weatherDataLoader, locationSearch, 49.68128712714686, 17.04514591890507, "en");

const languageDataLoader = new JSONLanguageDataLoader();
const languageManager = new LanguageManager(languageDataLoader);

new WeatherAppUI({
    weatherApp: weatherApp,
    languageManager: languageManager,
    loadingPageId: "LoadingPage",
    weatherAppPageId: "WeatherAppPage",
    languageSelectButtonId: "LanguageSelectButton",
    languageSelectButtonFlagImageId: "LanguageSelectButtonFlagImage",
    languageSelectButtonTextId: "LanguageSelectButtonText",
    languageSelectItemsContainerId: "LanguageSelectItems",
    languageSelectEnglishButtonId: "LanguageSelectEnglishButton",
    languageSelectCzechButtonId: "LanguageSelectCzechButton",
    languageSelectSlovakButtonId: "LanguageSelectSlovakButton",
    languageSelectGermanButtonId: "LanguageSelectGermanButton",
    locationSearchBarInputId: "LocationSearchBarInput",
    locationSearchBarResultsContainerId: "LocationSearchBarResults",
    currentWeatherHeadingId: "CurrentWeatherHeading",
    forecastHeadingId: "ForecastHeading",
    currentWeatherFeelsLikeLabelId: "CurrentWeatherFeelsLikeLabel",
    currentWeatherHumidityLabelId: "CurrentWeatherHumidityLabel",
    currentWeatherWindLabelId: "CurrentWeatherWindLabel"
});

languageManager.addOnLanguageChangeListener(languageInfo => {
    let language: string;
    switch (languageInfo.language) {
        case AppLanguage.ENGLISH:
            language = "en";
            break;
        case AppLanguage.CZECH:
            language = "cz";
            break;
        case AppLanguage.SLOVAK:
            language = "sk";
            break;
        case AppLanguage.GERMAN:
            language = "de";
            break;
    }

    weatherApp.setLanguage(language);
});

languageManager.changeLanguage(AppLanguage.CZECH);