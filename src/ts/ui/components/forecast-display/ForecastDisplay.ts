import WeatherData from "../../../core/data/WeatherData";
import WeatherDataHelper, { DayWeatherData } from "../../../core/utils/WeatherDataHelper";
import WeatherApp from "../../../core/WeatherApp";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import LocalizationHelper from "../../../localization/utils/LocalizationHelper";
import DayButton from "./DayButton";
import ForecastDisplayToggle from "./ForecastDisplayToggle";
import ForecastGraph from "./ForecastGraph";

export type ForecastDisplayElementsConfig = {
    loadingIcon: HTMLElement;
    contentContainer: HTMLElement;
    temperatureButton: HTMLElement;
    feelsLikeButton: HTMLElement;
    precipitationButton: HTMLElement;
    humidityButton: HTMLElement;
    windButton: HTMLElement;
    daysNavigation: HTMLElement;
    graphCanvas: HTMLCanvasElement;
    graphTimelineElement: HTMLElement;
}

class ForecastDisplay {
    private toggle: ForecastDisplayToggle;
    private temperatureButton: HTMLElement;
    private feelsLikeButton: HTMLElement;
    private precipitationButton: HTMLElement;
    private humidityButton: HTMLElement;
    private windButton: HTMLElement;
    private daysNavigation: HTMLElement;
    private forecastGraph: ForecastGraph;

    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;

    private dayButtons: DayButton[] = [];
    private currentlyActiveDayButton: DayButton | null = null;
    private dayWeatherData: DayWeatherData[] = [];

    constructor(weatherApp: WeatherApp, languageManager: LanguageManager, elements: ForecastDisplayElementsConfig) {
        this.toggle = new ForecastDisplayToggle(elements.loadingIcon, elements.contentContainer);
        this.temperatureButton = elements.temperatureButton; // todo - tady ty tlačítka navigace vypreparovat do samostatné komponenty (asi jako GraphNavigation)
        this.feelsLikeButton = elements.feelsLikeButton;
        this.precipitationButton = elements.precipitationButton;
        this.humidityButton = elements.humidityButton;
        this.windButton = elements.windButton;
        this.daysNavigation = elements.daysNavigation;
        this.forecastGraph = new ForecastGraph(
            elements.graphCanvas,
            elements.graphTimelineElement,
            languageManager
        );

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

        const dayWeatherDataList = WeatherDataHelper.groupWeatherDataByDay(data).sort((a, b) => a.date.getTime() - b.date.getTime());
        this.dayWeatherData = dayWeatherDataList;

        this.dayButtons.splice(0);
        this.currentlyActiveDayButton = null;
        this.daysNavigation.innerHTML = "";

        for (let dayWeatherData of dayWeatherDataList) {
            const button = new DayButton(
                dayWeatherData,
                this.daysNavigation,
                this.weatherApp,
                LocalizationHelper.getLocale(this.languageManager.getCurrentLanguage())
            );
            button.addOnClickListener(clickedButton => this.onDayButtonClick(clickedButton));
            this.dayButtons.push(button);
        }

        if (this.dayButtons.length > 0) {
            const firstButton = this.dayButtons[0];
            firstButton.setAsActive();
            this.currentlyActiveDayButton = firstButton;
        }
    }

    private onDayButtonClick(dayButton: DayButton): void {
        if (this.currentlyActiveDayButton === dayButton) return;
        if (this.currentlyActiveDayButton !== null) {
            this.currentlyActiveDayButton.setAsInactive();
        }
        dayButton.setAsActive();
        this.currentlyActiveDayButton = dayButton;

        const dayWeatherData = dayButton.getDayWeatherData();

        let previousWeatherData: WeatherData[] | null = null;
        let nextWeatherData: WeatherData[] | null = null;
        for (let i = 0; i < this.dayWeatherData.length; i++) {
            if (this.dayWeatherData[i] === dayWeatherData) {
                if (i > 0) {
                    previousWeatherData = this.dayWeatherData[i-1].data;
                }
                if (i < this.dayWeatherData.length-1) {
                    nextWeatherData = this.dayWeatherData[i+1].data;
                }
            }
        }

        let previousGraphLastTemperature = previousWeatherData !== null && previousWeatherData.length > 0
        ? previousWeatherData[previousWeatherData.length-1].temperature : null;
        let nextGraphFirstTemperature = nextWeatherData !== null && nextWeatherData.length > 0
        ? nextWeatherData[0].temperature : null;
        this.forecastGraph.displayTemperature(dayWeatherData.data, previousGraphLastTemperature, nextGraphFirstTemperature);
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