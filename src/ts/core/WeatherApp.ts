import CurrentWeatherLoadingManager from "./CurrentWeatherLoadingManager";
import CurrentWeatherData from "./data/CurrentWeatherData";
import LocationSearch from "./data/LocationSearch";
import WeatherDataLoader from "./data/WeatherDataLoader";

class WeatherApp {
    private currentWeatherLoadingManager: CurrentWeatherLoadingManager;

    constructor(weatherDataLoader: WeatherDataLoader, locationSearch: LocationSearch, latitude: number, longitude: number, language: string) {
        this.currentWeatherLoadingManager = new CurrentWeatherLoadingManager(weatherDataLoader, latitude, longitude, language);

    }

    public async loadCurrentWeather(): Promise<undefined> {
        this.currentWeatherLoadingManager.loadData();
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
}

export default WeatherApp;

/*


Takže o co se to bude starat?
- o načítání aktuálního počasí a předpovědi
    - zbytek už by mělo být na gui, jak si to zpracuje a zobrazí
- bude si to držet nastavený jazyk, město...
    - gui může reagovat na tyto změny


*/