import LanguageManager from "../../../localization/LanguageManager";
export type ForecastGraphNavigationElementsConfig = {
    temperatureButton: HTMLElement;
    feelsLikeButton: HTMLElement;
    precipitationButton: HTMLElement;
    humidityButton: HTMLElement;
    windButton: HTMLElement;
};
export declare enum ForecastGraphNavigationItem {
    TEMPERATURE = 0,
    FEELS_LIKE = 1,
    PRECIPITATION = 2,
    HUMIDITY = 3,
    WIND = 4
}
declare class ForecastGraphNavigation {
    private static readonly BUTTON_ACTIVE_CSS_MODIFIER_CLASS;
    private buttons;
    private onActiveItemChangeEventSource;
    private activeItem;
    constructor(languageManager: LanguageManager, elements: ForecastGraphNavigationElementsConfig);
    getActiveItem(): ForecastGraphNavigationItem;
    addOnActiveItemChangeListener(callback: (itemType: ForecastGraphNavigationItem) => void): void;
    private onButtonClick;
    private onLanguageChange;
}
export default ForecastGraphNavigation;
