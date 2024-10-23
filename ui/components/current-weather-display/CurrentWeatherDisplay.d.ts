import WeatherApp from "../../../core/WeatherApp";
export type CurrentWeatherDisplayElementsConfig = {
    loadingIcon: HTMLElement;
    contentContainer: HTMLElement;
    image: HTMLImageElement;
    temperatureValue: HTMLElement;
    weatherDescription: HTMLElement;
    feelsLikeValue: HTMLElement;
    humidityValue: HTMLElement;
    windValue: HTMLElement;
};
declare class CurrentWeatherDisplay {
    private weatherApp;
    private toggle;
    private image;
    private temperatureElement;
    private weatherDescriptionElement;
    private feelsLikeElement;
    private humidityElement;
    private windElement;
    constructor(weatherApp: WeatherApp, elements: CurrentWeatherDisplayElementsConfig);
    private onWeatherLoadingStarted;
    private onWeatherLoaded;
}
export default CurrentWeatherDisplay;
