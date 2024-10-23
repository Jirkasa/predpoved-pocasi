import EventSourcePoint from "../../../core/utils/EventSourcePoint";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";

export type ForecastGraphNavigationElementsConfig = {
    temperatureButton: HTMLElement;
    feelsLikeButton: HTMLElement;
    precipitationButton: HTMLElement;
    humidityButton: HTMLElement;
    windButton: HTMLElement;
}

export enum ForecastGraphNavigationItem {
    TEMPERATURE,
    FEELS_LIKE,
    PRECIPITATION,
    HUMIDITY,
    WIND
}

class ForecastGraphNavigation {
    private static readonly BUTTON_ACTIVE_CSS_MODIFIER_CLASS = "navigation__button--active";

    private buttons = new Map<ForecastGraphNavigationItem, HTMLElement>;
    private onActiveItemChangeEventSource = new EventSourcePoint<ForecastGraphNavigationItem>();

    private activeItem: ForecastGraphNavigationItem;

    constructor(languageManager: LanguageManager, elements: ForecastGraphNavigationElementsConfig) {
        this.buttons.set(ForecastGraphNavigationItem.TEMPERATURE, elements.temperatureButton);
        this.buttons.set(ForecastGraphNavigationItem.FEELS_LIKE, elements.feelsLikeButton);
        this.buttons.set(ForecastGraphNavigationItem.PRECIPITATION, elements.precipitationButton);
        this.buttons.set(ForecastGraphNavigationItem.HUMIDITY, elements.humidityButton);
        this.buttons.set(ForecastGraphNavigationItem.WIND, elements.windButton);

        this.activeItem = ForecastGraphNavigationItem.TEMPERATURE;
        elements.temperatureButton.classList.add(ForecastGraphNavigation.BUTTON_ACTIVE_CSS_MODIFIER_CLASS);

        elements.temperatureButton.addEventListener("click", () => this.onButtonClick(ForecastGraphNavigationItem.TEMPERATURE));
        elements.feelsLikeButton.addEventListener("click", () => this.onButtonClick(ForecastGraphNavigationItem.FEELS_LIKE));
        elements.precipitationButton.addEventListener("click", () => this.onButtonClick(ForecastGraphNavigationItem.PRECIPITATION));
        elements.humidityButton.addEventListener("click", () => this.onButtonClick(ForecastGraphNavigationItem.HUMIDITY));
        elements.windButton.addEventListener("click", () => this.onButtonClick(ForecastGraphNavigationItem.WIND));
        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    public getActiveItem(): ForecastGraphNavigationItem {
        return this.activeItem;
    }

    public addOnActiveItemChangeListener(callback: (itemType: ForecastGraphNavigationItem) => void): void {
        this.onActiveItemChangeEventSource.subscribe(callback);
    }

    private onButtonClick(itemType: ForecastGraphNavigationItem): void {
        if (this.activeItem === itemType) return;

        const currentlyActiveButton = this.buttons.get(this.activeItem);
        if (currentlyActiveButton) {
            currentlyActiveButton.classList.remove(ForecastGraphNavigation.BUTTON_ACTIVE_CSS_MODIFIER_CLASS);
        }

        this.activeItem = itemType;

        const button = this.buttons.get(itemType);
        if (!button) return;
        button.classList.add(ForecastGraphNavigation.BUTTON_ACTIVE_CSS_MODIFIER_CLASS);

        this.onActiveItemChangeEventSource.fire(this.activeItem);
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        const temperatureButton = this.buttons.get(ForecastGraphNavigationItem.TEMPERATURE);
        const feelsLikeButton = this.buttons.get(ForecastGraphNavigationItem.FEELS_LIKE);
        const precipitationButton = this.buttons.get(ForecastGraphNavigationItem.PRECIPITATION);
        const humidityButton = this.buttons.get(ForecastGraphNavigationItem.HUMIDITY);
        const windButton = this.buttons.get(ForecastGraphNavigationItem.WIND);

        if (temperatureButton) temperatureButton.innerText = languageInfo.localizedData.temperature;
        if (feelsLikeButton) feelsLikeButton.innerText = languageInfo.localizedData.feelsLike;
        if (precipitationButton) precipitationButton.innerText = languageInfo.localizedData.precipitation;
        if (humidityButton) humidityButton.innerText = languageInfo.localizedData.humidity;
        if (windButton) windButton.innerText = languageInfo.localizedData.wind;
    }
}

export default ForecastGraphNavigation;