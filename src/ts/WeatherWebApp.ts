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
        const language = this.getDefaultLanguage();
        const coordinates = this.getDefaultCoordinatesByLanguage(language);

        const weatherDataLoader = new OpenWeatherMapDataLoader(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        const locationSearch = new OpenWeatherMapLocationSearch(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        this.weatherApp = new WeatherApp(weatherDataLoader, locationSearch, coordinates[0], coordinates[1], LocalizationHelper.getLocale(language, true));

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
            currentLocationNameId: "CurrentLocationName",
            currentWeatherLoadingIconId: "CurrentWeatherLoadingIcon",
            currentWeatherContentContainerId: "CurrentWeatherContentContainer",
            currentWeatherTemperatureValueElementId: "CurrentWeatherTemperature",
            currentWeatherImageId: "CurrentWeatherImage",
            currentWeatherDescriptionId: "CurrentWeatherDescription",
            currentWeatherFeelsLikeValueElementId: "CurrentWeatherFeelsLike",
            currentWeatherHumidityValueElementId: "CurrentWeatherHumidity",
            currentWeatherWindValueElementId: "CurrentWeatherWind"
        });

        this.languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
        // this.weatherApp.addOnLocationChangeListener(() => this.onLocationChange());

        this.languageManager.changeLanguage(language);
        this.weatherApp.loadCurrentWeather();
    }

    // private onLocationChange() {
    //     this.weatherApp.loadCurrentWeather();
    // }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        let language = LocalizationHelper.getLocale(languageInfo.language, true);
        this.weatherApp.setLanguage(language);
        this.weatherApp.loadCurrentWeather();
    }

    private getDefaultCoordinatesByLanguage(language: AppLanguage): [number, number] {
        switch (language) {
            case AppLanguage.ENGLISH:
                return [51.5073219, -0.1276474];
            case AppLanguage.CZECH:
                return [50.0596288, 14.446459273258009];
            case AppLanguage.SLOVAK:
                return [48.1435149, 17.108279];
            case AppLanguage.GERMAN:
                return [52.5170365, 13.3888599];
        }
    }

    private getDefaultLanguage(): AppLanguage {
        let browserLanguage = navigator.language.split('-')[0];
        switch (browserLanguage) {
            case "cs":
                return AppLanguage.CZECH;
            case "sk":
                return AppLanguage.SLOVAK;
            case "de":
                return AppLanguage.GERMAN;
            default:
                return AppLanguage.ENGLISH;
        }
    }
}

export default WeatherWebApp;

// todo - ještě přidat nějakou obecnou stránku pro error