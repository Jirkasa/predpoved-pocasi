import CurrentWeatherLoadingManager from "./CurrentWeatherLoadingManager";
import CurrentWeatherData from "./data/CurrentWeatherData";
import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import WeatherData from "./data/WeatherData";
import WeatherDataLoader from "./data/WeatherDataLoader";
import ForecastWeatherLoadingManager from "./ForecastWeatherLoadingManager";
import LocationSearchByCoordinatesManager from "./LocationSearchByCoordinatesManager";
import LocationSearchManager from "./LocationSearchManager";
import EventSourcePoint from "./utils/EventSourcePoint";

class WeatherApp {
    private currentWeatherLoadingManager: CurrentWeatherLoadingManager;
    private forecastWeatherLoadingManager: ForecastWeatherLoadingManager;
    private locationSearchManager: LocationSearchManager;
    private onLocationChangeEventSource = new EventSourcePoint<undefined>();
    private weatherDataLoader: WeatherDataLoader;

    private currentLocation: LocationData | null = null;

    constructor(weatherDataLoader: WeatherDataLoader, locationSearch: LocationSearch, latitude: number, longitude: number, language: string) {
        this.currentWeatherLoadingManager = new CurrentWeatherLoadingManager(weatherDataLoader, latitude, longitude, language);
        this.forecastWeatherLoadingManager = new ForecastWeatherLoadingManager(weatherDataLoader, latitude, longitude, language);
        this.locationSearchManager = new LocationSearchManager(locationSearch);
        this.weatherDataLoader = weatherDataLoader;
        
        const locationSearchByCoordinatesManager = new LocationSearchByCoordinatesManager(locationSearch);
        locationSearchByCoordinatesManager.addOnDataLoadedListener(location => this.onLocationSearchByCoordinatesLoaded(location));
        locationSearchByCoordinatesManager.setCoordinates(latitude, longitude);
        locationSearchByCoordinatesManager.loadData();
    }

    public getCurrentLocationName(locale: string | null = null): string {
        if (!this.currentLocation) return "";

        if (locale) {
            const localeName = this.currentLocation.localNames.get(locale);
            if (localeName) return localeName;
        }
        return this.currentLocation.name;
    }

    public getCurrentLocationCoordinates(): [number, number] | null {
        if (!this.currentLocation) return null;
        return [this.currentLocation.latitude, this.currentLocation.longitude];
    }

    public setLocation(location: LocationData): void {
        if (location === this.currentLocation) return;
        this.currentWeatherLoadingManager.setCoordinates(location.latitude, location.longitude);
        this.forecastWeatherLoadingManager.setCoordinates(location.latitude, location.longitude);
        this.currentLocation = location;
        this.onLocationChangeEventSource.fire(undefined);
    }

    public setLanguage(language: string): void {
        this.currentWeatherLoadingManager.setLanguage(language);
        this.forecastWeatherLoadingManager.setLanguage(language);
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

    public getIconImageURL(iconIdentifier: string, large: boolean = false): string {
        return this.weatherDataLoader.getIconURLByIconIdentifier(iconIdentifier, large);
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

    public addOnLocationChangeListener(callback: () => void): void {
        this.onLocationChangeEventSource.subscribe(callback);
    }

    private onLocationSearchByCoordinatesLoaded(location: LocationData | null) {
        if (this.currentLocation) return;
        this.currentLocation = location;
        if (location) {
            this.onLocationChangeEventSource.fire(undefined);
        }
    }
}

export default WeatherApp;