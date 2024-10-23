import LanguageManager from "../../../localization/LanguageManager";
export type LanguageUpdaterElements = {
    currentWeatherHeading: HTMLElement;
    forecastHeading: HTMLElement;
    currentWeatherFeelsLikeLabel: HTMLElement;
    currentWeatherHumidityLabel: HTMLElement;
    currentWeatherWindLabel: HTMLElement;
    errorPageMessage: HTMLElement;
};
declare class LanguageUpdater {
    private currentWeatherHeading;
    private forecastHeading;
    private currentWeatherFeelsLikeLabel;
    private currentWeatherHumidityLabel;
    private currentWeatherWindLabel;
    private errorPageMessage;
    constructor(languageManager: LanguageManager, elements: LanguageUpdaterElements);
    private onLanguageChange;
}
export default LanguageUpdater;
