import WeatherApp from "../core/WeatherApp";
import LanguageInfo from "../localization/LanguageInfo";
import LanguageManager from "../localization/LanguageManager";
import CurrentWeatherDisplay from "./components/current-weather-display/CurrentWeatherDisplay";
import ForecastDisplay from "./components/forecast-display/ForecastDisplay";
import LanguageSelect from "./components/language-select/LanguageSelect";
import LanguageUpdater from "./components/language-updater/LanguageUpdater";
import LocationNameDisplay from "./components/location-name-display/LocationNameDisplay";
import LocationSearchBar from "./components/location-search-bar/LocationSearchBar";
import PagesToggle from "./PagesToggle";

type WeatherAppUIConfig = {
    weatherApp: WeatherApp;
    languageManager: LanguageManager;
    loadingPageId: string;
    errorPageId: string;
    errorPageMessageId: string;
    weatherAppPageId: string;
    languageSelectButtonId: string;
    languageSelectButtonFlagImageId: string;
    languageSelectButtonTextId: string;
    languageSelectItemsContainerId: string;
    languageSelectEnglishButtonId: string;
    languageSelectCzechButtonId: string;
    languageSelectSlovakButtonId: string;
    languageSelectGermanButtonId: string;
    locationSearchBarInputId: string;
    locationSearchBarResultsContainerId: string;
    currentWeatherHeadingId: string;
    forecastHeadingId: string;
    currentWeatherFeelsLikeLabelId: string;
    currentWeatherHumidityLabelId: string;
    currentWeatherWindLabelId: string;
    currentLocationNameId: string;
    currentWeatherLoadingIconId: string;
    currentWeatherContentContainerId: string;
    currentWeatherImageId: string;
    currentWeatherTemperatureValueElementId: string;
    currentWeatherDescriptionId: string;
    currentWeatherFeelsLikeValueElementId: string;
    currentWeatherHumidityValueElementId: string;
    currentWeatherWindValueElementId: string;
    forecastLoadingIconId: string;
    forecastContentContainerId: string;
    forecastTemperatureButtonId: string;
    forecastFeelsLikeButtonId: string;
    forecastPrecipitationButtonId: string;
    forecastHumidityButtonId: string;
    forecastWindButtonId: string;
    daysNavigationId: string;
    graphCanvasId: string;
    graphTimelineElementId: string;
}

class WeatherAppUI {
    private pagesToggle: PagesToggle;

    private languageLoaded: boolean = false;

    constructor(config: WeatherAppUIConfig) {

        this.pagesToggle = new PagesToggle(
            this.getElementById(config.loadingPageId),
            this.getElementById(config.weatherAppPageId),
            this.getElementById(config.errorPageId)
        );

        new LocationNameDisplay(
            this.getElementById(config.currentLocationNameId),
            config.weatherApp,
            config.languageManager
        );

        const languageSelectButtonFlagImage = this.getElementById(config.languageSelectButtonFlagImageId);
        if (!(languageSelectButtonFlagImage instanceof HTMLImageElement)) {
            throw new Error(`Element with id ${config.languageSelectButtonFlagImageId} is not image element.`);
        }
        new LanguageSelect(
            config.languageManager,
            {
                selectButton: this.getElementById(config.languageSelectButtonId),
                selectButtonFlagImage: languageSelectButtonFlagImage,
                selectButtonText: this.getElementById(config.languageSelectButtonTextId),
                selectItemsContainer: this.getElementById(config.languageSelectItemsContainerId),
                englishButton: this.getElementById(config.languageSelectEnglishButtonId),
                czechButton: this.getElementById(config.languageSelectCzechButtonId),
                slovakButton: this.getElementById(config.languageSelectSlovakButtonId),
                germanButton: this.getElementById(config.languageSelectGermanButtonId)
            }
        );

        const locationSearchBarInput = this.getElementById(config.locationSearchBarInputId);
        if (!(locationSearchBarInput instanceof HTMLInputElement)) {
            throw new Error(`Element with id ${config.locationSearchBarInputId} is not input element.`);
        }
        new LocationSearchBar(
            locationSearchBarInput,
            this.getElementById(config.locationSearchBarResultsContainerId),
            config.weatherApp,
            config.languageManager
        );

        const currentWeatherIconImage = this.getElementById(config.currentWeatherImageId);
        if (!(currentWeatherIconImage instanceof HTMLImageElement)) {
            throw new Error(`Element with id ${config.currentWeatherImageId} is not image element.`);
        }
        new CurrentWeatherDisplay(
            config.weatherApp,
            {
                loadingIcon: this.getElementById(config.currentWeatherLoadingIconId),
                contentContainer: this.getElementById(config.currentWeatherContentContainerId),
                image: currentWeatherIconImage,
                temperatureValue: this.getElementById(config.currentWeatherTemperatureValueElementId),
                weatherDescription: this.getElementById(config.currentWeatherDescriptionId),
                feelsLikeValue: this.getElementById(config.currentWeatherFeelsLikeValueElementId),
                humidityValue: this.getElementById(config.currentWeatherHumidityValueElementId),
                windValue: this.getElementById(config.currentWeatherWindValueElementId)
            }
        );

        const canvas = this.getElementById(config.graphCanvasId);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`Element with id ${config.graphCanvasId} is not canvas element.`);
        }
        new ForecastDisplay(
            config.weatherApp,
            config.languageManager,
            {
                loadingIcon: this.getElementById(config.forecastLoadingIconId),
                contentContainer: this.getElementById(config.forecastContentContainerId),
                temperatureButton: this.getElementById(config.forecastTemperatureButtonId),
                feelsLikeButton: this.getElementById(config.forecastFeelsLikeButtonId),
                precipitationButton: this.getElementById(config.forecastPrecipitationButtonId),
                humidityButton: this.getElementById(config.forecastHumidityButtonId),
                windButton: this.getElementById(config.forecastWindButtonId),
                daysNavigation: this.getElementById(config.daysNavigationId),
                graphCanvas: canvas,
                graphTimelineElement: this.getElementById(config.graphTimelineElementId)
            }
        );

        new LanguageUpdater(
            config.languageManager,
            {
                currentWeatherHeading: this.getElementById(config.currentWeatherHeadingId),
                forecastHeading: this.getElementById(config.forecastHeadingId),
                currentWeatherFeelsLikeLabel: this.getElementById(config.currentWeatherFeelsLikeLabelId),
                currentWeatherHumidityLabel: this.getElementById(config.currentWeatherHumidityLabelId),
                currentWeatherWindLabel: this.getElementById(config.currentWeatherWindLabelId),
                errorPageMessage: this.getElementById(config.errorPageMessageId)
            }
        );

        config.languageManager.addOnLanguageChangeListener(() => this.onLanguageChange());
        config.weatherApp.addOnCurrentWeatherLoadingErrorListener(() => this.onWeatherLoadingError());
        config.weatherApp.addOnForecastWeatherLoadingErrorListener(() => this.onWeatherLoadingError());
    }

    private onWeatherLoadingError(): void {
        this.pagesToggle.showErrorPage();
    }

    private onLanguageChange(): void {
        if (this.languageLoaded) return;

        this.pagesToggle.showWeatherAppPage();
        this.languageLoaded = true;
    }

    private getElementById(id: string): HTMLElement {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLElement)) {
            throw new Error(`Element with id ${id} does not exist.`);
        }
        return element;
    }
}

export default WeatherAppUI;