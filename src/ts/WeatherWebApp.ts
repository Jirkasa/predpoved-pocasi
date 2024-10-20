import WeatherApp from "./core/WeatherApp";
import OpenWeatherMapDataLoader from "./data/OpenWeatherMapDataLoader";
import OpenWeatherMapLocationSearch from "./data/OpenWeatherMapLocationSearch";
import AppLanguage from "./localization/AppLanguage";
import JSONLanguageDataLoader from "./localization/data/JSONLanguageDataLoader";
import LanguageInfo from "./localization/LanguageInfo";
import LanguageManager from "./localization/LanguageManager";
import LocalizationHelper from "./localization/utils/LocalizationHelper";
import WeatherAppUI from "./ui/WeatherAppUI";

class WeatherWebApp {
    private static readonly OPEN_WEATHER_MAP_APP_ID = "610f182df978d44c879ed39ce0f7f9a9";

    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;

    constructor() {
        const weatherDataLoader = new OpenWeatherMapDataLoader(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        const locationSearch = new OpenWeatherMapLocationSearch(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        this.weatherApp = new WeatherApp(weatherDataLoader, locationSearch, 51.5073219, -0.1276474, "en");

        const languageDataLoader = new JSONLanguageDataLoader();
        this.languageManager = new LanguageManager(languageDataLoader);

        new WeatherAppUI({
            weatherApp: this.weatherApp,
            languageManager: this.languageManager,
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
            currentWeatherWindLabelId: "CurrentWeatherWindLabel",
            currentLocationNameId: "CurrentLocationName"
        });

        this.languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));

        this.languageManager.changeLanguage(AppLanguage.CZECH);
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        let language = LocalizationHelper.getLocale(languageInfo.language, true);
        this.weatherApp.setLanguage(language);
    }
}

export default WeatherWebApp;