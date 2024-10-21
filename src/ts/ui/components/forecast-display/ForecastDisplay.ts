import WeatherData from "../../../core/data/WeatherData";
import WeatherApp from "../../../core/WeatherApp";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import ForecastDisplayToggle from "./ForecastDisplayToggle";

export type ForecastDisplayElementsConfig = {
    loadingIcon: HTMLElement;
    contentContainer: HTMLElement;
    temperatureButton: HTMLElement;
    feelsLikeButton: HTMLElement;
    precipitationButton: HTMLElement;
    humidityButton: HTMLElement;
    windButton: HTMLElement;
}

class ForecastDisplay {
    private weatherApp: WeatherApp;
    private toggle: ForecastDisplayToggle;
    private temperatureButton: HTMLElement;
    private feelsLikeButton: HTMLElement;
    private precipitationButton: HTMLElement;
    private humidityButton: HTMLElement;
    private windButton: HTMLElement;

    constructor(weatherApp: WeatherApp, languageManager: LanguageManager, elements: ForecastDisplayElementsConfig) {
        this.weatherApp = weatherApp;
        this.toggle = new ForecastDisplayToggle(elements.loadingIcon, elements.contentContainer);
        this.temperatureButton = elements.temperatureButton;
        this.feelsLikeButton = elements.feelsLikeButton;
        this.precipitationButton = elements.precipitationButton;
        this.humidityButton = elements.humidityButton;
        this.windButton = elements.windButton;

        weatherApp.addOnForecastWeatherLoadingStartedListener(() => this.onForecastLoadingStarted());
        weatherApp.addOnForecastWeatherLoadedListener(data => this.onForecastLoaded(data));
        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    private onForecastLoadingStarted(): void {
        this.toggle.showLoadingIcon();
    }

    private onForecastLoaded(data: WeatherData[]): void {
        this.toggle.showContent();
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        this.temperatureButton.innerText = languageInfo.localizedData.temperature;
        this.feelsLikeButton.innerText = languageInfo.localizedData.feelsLike;
        this.precipitationButton.innerText = languageInfo.localizedData.precipitation;
        this.humidityButton.innerText = languageInfo.localizedData.humidity;
        this.windButton.innerText = languageInfo.localizedData.wind;
    }
}

export default ForecastDisplay;