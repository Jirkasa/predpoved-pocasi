import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";

export type LanguageUpdaterElements = {
    // locationSearchBarInput: HTMLInputElement;
    currentWeatherHeading: HTMLElement;
    forecastHeading: HTMLElement;
    currentWeatherFeelsLikeLabel: HTMLElement;
    currentWeatherHumidityLabel: HTMLElement;
    currentWeatherWindLabel: HTMLElement;
}

class LanguageUpdater {
    private currentWeatherHeading: HTMLElement;
    private forecastHeading: HTMLElement;
    private currentWeatherFeelsLikeLabel: HTMLElement;
    private currentWeatherHumidityLabel: HTMLElement;
    private currentWeatherWindLabel: HTMLElement;

    constructor(languageManager: LanguageManager, elements: LanguageUpdaterElements) {
        this.currentWeatherHeading = elements.currentWeatherHeading;
        this.forecastHeading = elements.forecastHeading;
        this.currentWeatherFeelsLikeLabel = elements.currentWeatherFeelsLikeLabel;
        this.currentWeatherHumidityLabel = elements.currentWeatherHumidityLabel;
        this.currentWeatherWindLabel = elements.currentWeatherWindLabel;

        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        const localizedData = languageInfo.localizedData;

        this.currentWeatherHeading.innerText = localizedData.currentWeather;
        this.forecastHeading.innerText = localizedData.forecast;
        this.currentWeatherFeelsLikeLabel.innerText = localizedData.feelsLike;
        this.currentWeatherHumidityLabel.innerText = localizedData.humidity;
        this.currentWeatherWindLabel.innerText = localizedData.wind;
    }
}

export default LanguageUpdater;