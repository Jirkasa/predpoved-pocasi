import CurrentWeatherData from "./data/CurrentWeatherData";
import LocationSearch from "./data/LocationSearch";
import WeatherDataLoader from "./data/WeatherDataLoader";
import EventSourcePoint from "./utils/EventSourcePoint";

class WeatherApp {
    private weatherDataLoader: WeatherDataLoader;
    private locationSearch: LocationSearch;

    private onCurrentWeatherLoadingStartedEventSource = new EventSourcePoint<undefined>();
    private onCurrentWeatherLoadedEventSource = new EventSourcePoint<CurrentWeatherData>();
    private onCurrentWeatherLoadingErrorEventSource = new EventSourcePoint<undefined>();

    private latitude: number;
    private longitude: number;
    private language: string;
    private currentWeatherAbortController: AbortController | null = null;

    constructor(weatherDataLoader: WeatherDataLoader, locationSearch: LocationSearch, latitude: number, longitude: number, language: string) {
        this.weatherDataLoader = weatherDataLoader;
        this.locationSearch = locationSearch;
        this.latitude = latitude;
        this.longitude = longitude;
        this.language = language;
    }

    public async loadCurrentWeather() : Promise<undefined> {
        if (this.currentWeatherAbortController) {
            this.currentWeatherAbortController.abort();
        } else {
            this.onCurrentWeatherLoadingStartedEventSource.fire(undefined);
        }

        this.currentWeatherAbortController = new AbortController();

        try {
            const currentWeatherData = await this.weatherDataLoader.loadCurrentWeatherData(this.latitude, this.longitude, this.language, this.currentWeatherAbortController.signal);
            this.onCurrentWeatherLoadedEventSource.fire(currentWeatherData);
        } catch(err) {
            if (err instanceof Error && err.name === "AbortError") return;
            console.error(err);
            this.onCurrentWeatherLoadingErrorEventSource.fire(undefined);
        }

        this.currentWeatherAbortController = null;
    }

    public addOnCurrentWeatherLoadingStartedListener(callback: () => void): void {
        this.onCurrentWeatherLoadingStartedEventSource.subscribe(callback);
    }

    public addOnCurrentWeatherLoadedListener(callback: (data: CurrentWeatherData) => void): void {
        this.onCurrentWeatherLoadedEventSource.subscribe(callback);
    }

    public addOnCurrentWeatherLoadingErrorListener(callback: () => void): void {
        this.onCurrentWeatherLoadingErrorEventSource.subscribe(callback);
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