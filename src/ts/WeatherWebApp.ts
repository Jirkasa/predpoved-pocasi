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
    private static readonly LOCAL_STORAGE_COORDINATES_FIELD = "WEATHER_WEB_APP_COORDINATES";

    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;

    constructor() {
        const language = this.getDefaultLanguage();
        let coordinates = this.getCoordinatesFromLocalStorage();
        if (coordinates === null) {
            coordinates = this.getDefaultCoordinatesByLanguage(language);
        }

        const weatherDataLoader = new OpenWeatherMapDataLoader(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        const locationSearch = new OpenWeatherMapLocationSearch(WeatherWebApp.OPEN_WEATHER_MAP_APP_ID);
        this.weatherApp = new WeatherApp(weatherDataLoader, locationSearch, coordinates[0], coordinates[1], LocalizationHelper.getLocale(language, true));

        const languageDataLoader = new JSONLanguageDataLoader();
        this.languageManager = new LanguageManager(languageDataLoader);

        new WeatherAppUI({
            weatherApp: this.weatherApp,
            languageManager: this.languageManager,
            loadingPageId: "LoadingPage",
            errorPageId: "ErrorPage",
            errorPageMessageId: "ErrorPageMessage",
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
            currentWeatherWindValueElementId: "CurrentWeatherWind",
            forecastLoadingIconId: "ForecastLoadingIcon",
            forecastContentContainerId: "ForecastContentContainer",
            forecastTemperatureButtonId: "ForecastTemperatureButton",
            forecastFeelsLikeButtonId: "ForecastFeelsLikeButton",
            forecastPrecipitationButtonId: "ForecastPrecipitationButton",
            forecastHumidityButtonId: "ForecastHumidityButton",
            forecastWindButtonId: "ForecastWindButton",
            daysNavigationId: "ForecastDaysNavigation",
            graphCanvasId: "GraphCanvas",
            graphTimelineElementId: "GraphCanvasTimeline"
        });

        this.languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));

        this.languageManager.changeLanguage(language);
        this.weatherApp.loadCurrentWeather();
        this.weatherApp.loadForecastWeather();
        this.weatherApp.addOnLocationChangeListener(() => this.onLocationChange());
    }

    private onLocationChange(): void {
        const coordinates = this.weatherApp.getCurrentLocationCoordinates();
        if (coordinates === null) return;
        localStorage.setItem(WeatherWebApp.LOCAL_STORAGE_COORDINATES_FIELD, JSON.stringify(coordinates));
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        let language = LocalizationHelper.getLocale(languageInfo.language, true);
        this.weatherApp.setLanguage(language);
        this.weatherApp.loadCurrentWeather();
        this.weatherApp.loadForecastWeather();
    }

    private getCoordinatesFromLocalStorage(): [number, number] | null {
        const jsonArray = localStorage.getItem(WeatherWebApp.LOCAL_STORAGE_COORDINATES_FIELD);
        if (jsonArray === null) return null;
        try {
            const coordinates = JSON.parse(jsonArray);
            if (!(coordinates instanceof Array)) return null;
            if (typeof coordinates[0] !== "number") return null;
            if (typeof coordinates[1] !== "number") return null;
            return [coordinates[0], coordinates[1]];
        } catch {
            return null;
        }
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