import WeatherData from "../../../core/data/WeatherData";
import WeatherDataHelper, { DayWeatherData } from "../../../core/utils/WeatherDataHelper";
import WeatherApp from "../../../core/WeatherApp";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import LocalizationHelper from "../../../localization/utils/LocalizationHelper";
import DayButton from "./DayButton";
import ForecastDisplayToggle from "./ForecastDisplayToggle";
import ForecastGraph from "./ForecastGraph";
import ForecastGraphNavigation, { ForecastGraphNavigationItem } from "./ForecastGraphNavigation";

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
    
    private daysNavigation: HTMLElement;
    private forecastGraphNavigation: ForecastGraphNavigation;
    private forecastGraph: ForecastGraph;

    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;

    private dayButtons: DayButton[] = [];
    private currentlyActiveDayButton: DayButton | null = null;
    private dayWeatherData: DayWeatherData[] = [];

    constructor(weatherApp: WeatherApp, languageManager: LanguageManager, elements: ForecastDisplayElementsConfig) {
        this.toggle = new ForecastDisplayToggle(elements.loadingIcon, elements.contentContainer);
        this.daysNavigation = elements.daysNavigation;
        this.forecastGraphNavigation = new ForecastGraphNavigation(
            languageManager,
            {
                temperatureButton: elements.temperatureButton,
                feelsLikeButton: elements.feelsLikeButton,
                precipitationButton: elements.precipitationButton,
                humidityButton: elements.humidityButton,
                windButton: elements.windButton
            }
        )
        this.forecastGraph = new ForecastGraph(
            elements.graphCanvas,
            elements.graphTimelineElement,
            languageManager
        );

        this.weatherApp = weatherApp;
        this.languageManager = languageManager;

        this.forecastGraphNavigation.addOnActiveItemChangeListener(itemType => this.onGraphNavigationActiveItemChange(itemType));
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
            this.updateGraph(firstButton.getDayWeatherData());
        }
    }

    private onGraphNavigationActiveItemChange(itemType: ForecastGraphNavigationItem): void {
        if (this.currentlyActiveDayButton === null) return;
        this.updateGraph(this.currentlyActiveDayButton.getDayWeatherData());
    }

    private onDayButtonClick(dayButton: DayButton): void {
        if (this.currentlyActiveDayButton === dayButton) return;
        if (this.currentlyActiveDayButton !== null) {
            this.currentlyActiveDayButton.setAsInactive();
        }
        dayButton.setAsActive();
        this.currentlyActiveDayButton = dayButton;

        this.updateGraph(dayButton.getDayWeatherData());
    }

    private updateGraph(dayWeatherData: DayWeatherData): void {
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

        const graphNavigationActiveItem = this.forecastGraphNavigation.getActiveItem();

        switch (graphNavigationActiveItem) {
            case ForecastGraphNavigationItem.TEMPERATURE:
                let previousGraphLastTemperature = previousWeatherData !== null && previousWeatherData.length > 0
                ? previousWeatherData[previousWeatherData.length-1].temperature : null;
                let nextGraphFirstTemperature = nextWeatherData !== null && nextWeatherData.length > 0
                ? nextWeatherData[0].temperature : null;
                
                this.forecastGraph.displayTemperature(dayWeatherData.data, previousGraphLastTemperature, nextGraphFirstTemperature);
                break;
            default:
                this.forecastGraph.displayNone();
                break;
        }
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        let locale = LocalizationHelper.getLocale(languageInfo.language);
        for (let dayButton of this.dayButtons) {
            dayButton.updateDayName(locale);
        }
    }
}

export default ForecastDisplay;