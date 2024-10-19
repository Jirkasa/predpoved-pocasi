import CurrentWeatherLoadingManager from "./CurrentWeatherLoadingManager";
import CurrentWeatherData from "./data/CurrentWeatherData";
import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import WeatherData from "./data/WeatherData";
import WeatherDataLoader from "./data/WeatherDataLoader";
import ForecastWeatherLoadingManager from "./ForecastWeatherLoadingManager";
import LocationSearchManager from "./LocationSearchManager";

class WeatherApp {
    private currentWeatherLoadingManager: CurrentWeatherLoadingManager;
    private forecastWeatherLoadingManager: ForecastWeatherLoadingManager;
    private locationSearchManager: LocationSearchManager;

    constructor(weatherDataLoader: WeatherDataLoader, locationSearch: LocationSearch, latitude: number, longitude: number, language: string) {
        this.currentWeatherLoadingManager = new CurrentWeatherLoadingManager(weatherDataLoader, latitude, longitude, language);
        this.forecastWeatherLoadingManager = new ForecastWeatherLoadingManager(weatherDataLoader, latitude, longitude, language);
        this.locationSearchManager = new LocationSearchManager(locationSearch);
    }

    public async loadCurrentWeather(): Promise<undefined> {
        this.currentWeatherLoadingManager.loadData();
    }

    public async loadForecastWeather(): Promise<undefined> {
        this.forecastWeatherLoadingManager.loadData();
    }

    public async searchForLocation(searchText: string): Promise<undefined> {
        this.locationSearchManager.setSearchText(searchText);
        this.locationSearchManager.loadData();
    }

    public addOnCurrentWeatherLoadingStartedListener(callback: () => void): void {
        this.currentWeatherLoadingManager.addOnLoadingStartedListener(callback);
    }

    public addOnCurrentWeatherLoadedListener(callback: (data: CurrentWeatherData) => void): void {
        this.currentWeatherLoadingManager.addOnDataLoadedListener(callback);
    }

    public addOnCurrentWeatherLoadingErrorListener(callback: () => void): void {
        this.currentWeatherLoadingManager.addOnLoadingErrorListener(callback);
    }

    public addOnForecastWeatherLoadingStartedListener(callback: () => void): void {
        this.forecastWeatherLoadingManager.addOnLoadingStartedListener(callback);
    }

    public addOnForecastWeatherLoadedListener(callback: (data: WeatherData[]) => void): void {
        this.forecastWeatherLoadingManager.addOnDataLoadedListener(callback);
    }

    public addOnForecastWeatherLoadingErrorListener(callback: () => void): void {
        this.forecastWeatherLoadingManager.addOnLoadingErrorListener(callback);
    }

    public addOnLocationSearchLoadingStartedListener(callback: () => void): void {
        this.locationSearchManager.addOnLoadingStartedListener(callback);
    }

    public addOnLocationSearchLoadedListener(callback: (data: LocationData[]) => void): void {
        this.locationSearchManager.addOnDataLoadedListener(callback);
    }

    public addOnLocationSearchLoadingErrorListener(callback: () => void): void {
        this.locationSearchManager.addOnLoadingErrorListener(callback);
    }
}

export default WeatherApp;

/*


Takže o co se to bude starat?
- o načítání aktuálního počasí a předpovědi
    - zbytek už by mělo být na gui, jak si to zpracuje a zobrazí
- bude si to držet nastavený jazyk, město...
    - gui může reagovat na tyto změny


*/