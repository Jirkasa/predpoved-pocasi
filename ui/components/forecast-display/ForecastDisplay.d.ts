import WeatherApp from "../../../core/WeatherApp";
import LanguageManager from "../../../localization/LanguageManager";
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
};
declare class ForecastDisplay {
    private toggle;
    private daysNavigation;
    private forecastGraphNavigation;
    private forecastGraph;
    private weatherApp;
    private languageManager;
    private dayButtons;
    private currentlyActiveDayButton;
    private dayWeatherData;
    constructor(weatherApp: WeatherApp, languageManager: LanguageManager, elements: ForecastDisplayElementsConfig);
    private onForecastLoadingStarted;
    private onForecastLoaded;
    private onGraphNavigationActiveItemChange;
    private onDayButtonClick;
    private updateGraph;
    private onLanguageChange;
}
export default ForecastDisplay;
