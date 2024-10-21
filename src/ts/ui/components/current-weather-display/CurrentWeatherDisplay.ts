import CurrentWeatherData from "../../../core/data/CurrentWeatherData";
import WeatherApp from "../../../core/WeatherApp";
import CurrentWeatherDisplayToggle from "./CurrentWeatherDisplayToggle";

export type CurrentWeatherDisplayElementsConfig = {
    loadingIcon: HTMLElement;
    contentContainer: HTMLElement;
    image: HTMLImageElement;
    temperatureValue: HTMLElement;
    weatherDescription: HTMLElement;
    feelsLikeValue: HTMLElement;
    humidityValue: HTMLElement;
    windValue: HTMLElement;
}

class CurrentWeatherDisplay {
    private weatherApp: WeatherApp;
    private toggle: CurrentWeatherDisplayToggle;
    private image: HTMLImageElement;
    private temperatureElement: HTMLElement;
    private weatherDescriptionElement: HTMLElement;
    private feelsLikeElement: HTMLElement;
    private humidityElement: HTMLElement;
    private windElement: HTMLElement;

    constructor(weatherApp: WeatherApp, elements: CurrentWeatherDisplayElementsConfig) {
        this.weatherApp = weatherApp;
        this.toggle = new CurrentWeatherDisplayToggle(elements.loadingIcon, elements.contentContainer);
        this.image = elements.image;
        this.temperatureElement = elements.temperatureValue;
        this.weatherDescriptionElement = elements.weatherDescription;
        this.feelsLikeElement = elements.feelsLikeValue;
        this.humidityElement = elements.humidityValue;
        this.windElement = elements.windValue;

        weatherApp.addOnCurrentWeatherLoadingStartedListener(() => this.onWeatherLoadingStarted());
        weatherApp.addOnCurrentWeatherLoadedListener(data => this.onWeatherLoaded(data));
    }

    private onWeatherLoadingStarted(): void {
        this.toggle.showLoadingIcon();
    }

    private onWeatherLoaded(data: CurrentWeatherData): void {
        this.toggle.showContent();
        this.image.src = this.weatherApp.getIconImageURL(data.iconIdentifier, true);
        this.image.alt = data.description;
        this.temperatureElement.innerText = Math.round(data.temperature).toString();
        this.weatherDescriptionElement.innerText = data.description;
        this.feelsLikeElement.innerText = Math.round(data.feelsLike).toString();
        this.humidityElement.innerText = Math.round(data.humidity).toString();
        this.windElement.innerText = data.windSpeed.toString();
    }
}

export default CurrentWeatherDisplay;