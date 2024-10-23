import { DayWeatherData } from "../../../core/utils/WeatherDataHelper";
import WeatherApp from "../../../core/WeatherApp";
declare class DayButton {
    private static readonly BUTTON_CSS_CLASS;
    private static readonly BUTTON_CSS_ACTIVE_MODIFIER_CLASS;
    private static readonly DAY_CSS_CLASS;
    private static readonly WEATHER_ICON_CSS_CLASS;
    private static readonly TEMPERATURE_CSS_CLASS;
    private static readonly NIGHT_TEMPERATURE_CSS_CLASS;
    private onClickEventSource;
    private dayWeatherData;
    private buttonElement;
    private dayElement;
    constructor(dayWeatherData: DayWeatherData, container: HTMLElement, weatherApp: WeatherApp, locale: string);
    getDayWeatherData(): DayWeatherData;
    setAsActive(): void;
    setAsInactive(): void;
    updateDayName(locale: string): void;
    addOnClickListener(callback: (button: DayButton) => void): void;
    private onButtonClick;
    private createTemperatureString;
}
export default DayButton;
