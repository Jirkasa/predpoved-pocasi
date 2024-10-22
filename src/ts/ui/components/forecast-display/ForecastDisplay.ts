import WeatherData from "../../../core/data/WeatherData";
import WeatherDataHelper from "../../../core/utils/WeatherDataHelper";
import WeatherApp from "../../../core/WeatherApp";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import LocalizationHelper from "../../../localization/utils/LocalizationHelper";
import DayButton from "./DayButton";
import ForecastDisplayToggle from "./ForecastDisplayToggle";

export type ForecastDisplayElementsConfig = {
    loadingIcon: HTMLElement;
    contentContainer: HTMLElement;
    temperatureButton: HTMLElement;
    feelsLikeButton: HTMLElement;
    precipitationButton: HTMLElement;
    humidityButton: HTMLElement;
    windButton: HTMLElement;
    daysNavigation: HTMLElement;
}

class ForecastDisplay {
    private toggle: ForecastDisplayToggle;
    private temperatureButton: HTMLElement;
    private feelsLikeButton: HTMLElement;
    private precipitationButton: HTMLElement;
    private humidityButton: HTMLElement;
    private windButton: HTMLElement;
    private daysNavigation: HTMLElement;
    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;
    private dayButtons: DayButton[] = [];

    constructor(weatherApp: WeatherApp, languageManager: LanguageManager, elements: ForecastDisplayElementsConfig) {
        this.toggle = new ForecastDisplayToggle(elements.loadingIcon, elements.contentContainer);
        this.temperatureButton = elements.temperatureButton;
        this.feelsLikeButton = elements.feelsLikeButton;
        this.precipitationButton = elements.precipitationButton;
        this.humidityButton = elements.humidityButton;
        this.windButton = elements.windButton;
        this.daysNavigation = elements.daysNavigation;
        this.weatherApp = weatherApp;
        this.languageManager = languageManager;

        weatherApp.addOnForecastWeatherLoadingStartedListener(() => this.onForecastLoadingStarted());
        weatherApp.addOnForecastWeatherLoadedListener(data => this.onForecastLoaded(data));
        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    private onForecastLoadingStarted(): void {
        this.toggle.showLoadingIcon();
    }

    private onForecastLoaded(data: WeatherData[]): void {
        this.toggle.showContent();
        console.log(data);
        console.log();

        const dayWeatherDataList = WeatherDataHelper.groupWeatherDataByDay(data).sort((a, b) => a.date.getTime() - b.date.getTime());

        this.dayButtons.splice(0);
        this.daysNavigation.innerHTML = "";
        for (let dayWeatherData of dayWeatherDataList) {
            new DayButton(dayWeatherData, this.daysNavigation, this.weatherApp, LocalizationHelper.getLocale(this.languageManager.getCurrentLanguage()));
        }
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        this.temperatureButton.innerText = languageInfo.localizedData.temperature;
        this.feelsLikeButton.innerText = languageInfo.localizedData.feelsLike;
        this.precipitationButton.innerText = languageInfo.localizedData.precipitation;
        this.humidityButton.innerText = languageInfo.localizedData.humidity;
        this.windButton.innerText = languageInfo.localizedData.wind;

        let locale = LocalizationHelper.getLocale(languageInfo.language);
        for (let dayButton of this.dayButtons) {
            dayButton.updateDayName(locale);
        }
    }
}

export default ForecastDisplay;