import WeatherData from "./data/WeatherData";
import WeatherDataLoader from "./data/WeatherDataLoader";
import DataLoadingManager from "./DataLoadingManager";

class ForecastWeatherLoadingManager extends DataLoadingManager<WeatherData[]> {
    private weatherDataLoader: WeatherDataLoader;
    private latitude: number;
    private longitude: number;
    private language: string;

    constructor(weatherDataLoader: WeatherDataLoader, latitude: number, longitude: number, language: string) {
        super();
        this.weatherDataLoader = weatherDataLoader;
        this.latitude = latitude;
        this.longitude = longitude;
        this.language = language;
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    protected async getData(abortSignal: AbortSignal): Promise<WeatherData[]> {
        return await this.weatherDataLoader.loadForecastWeatherData(this.latitude, this.longitude, this.language, abortSignal);
    }
}

export default ForecastWeatherLoadingManager;