import CurrentWeatherData from "./data/CurrentWeatherData";
import WeatherDataLoader from "./data/WeatherDataLoader";
import DataLoadingManager from "./DataLoadingManager";

class CurrentWeatherLoadingManager extends DataLoadingManager<CurrentWeatherData> {
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

    protected async getData(abortSignal: AbortSignal): Promise<CurrentWeatherData> {
        const currentWeatherData = await this.weatherDataLoader.loadCurrentWeatherData(this.latitude, this.longitude, this.language, abortSignal);
        return currentWeatherData;
    }
}

export default CurrentWeatherLoadingManager;