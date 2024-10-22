import PartOfDay from "../../../core/data/PartOfDay";
import WeatherDataHelper, { DayWeatherData } from "../../../core/utils/WeatherDataHelper";
import WeatherApp from "../../../core/WeatherApp";
import SVGIconElementCreator from "../../utils/SVGIconElementCreator";

class DayButton {
    private static readonly BUTTON_CSS_CLASS = "day-button";
    private static readonly BUTTON_CSS_ACTIVE_MODIFIER_CLASS = "day-button--active";
    private static readonly DAY_CSS_CLASS = "day-button__day";
    private static readonly WEATHER_ICON_CSS_CLASS = "weather-icon";
    private static readonly TEMPERATURE_CSS_CLASS = "day-button__temperature";
    private static readonly NIGHT_TEMPERATURE_CSS_CLASS = "day-button__night-temperature";

    private date: Date;
    private buttonElement: HTMLButtonElement;
    private dayElement: HTMLElement;

    constructor(dayWeatherData: DayWeatherData, container: HTMLElement, weatherApp: WeatherApp, locale: string) {
        this.date = dayWeatherData.date;

        this.buttonElement = document.createElement("button");
        this.buttonElement.classList.add(DayButton.BUTTON_CSS_CLASS);
        container.appendChild(this.buttonElement);

        this.dayElement = document.createElement("span");
        this.dayElement.classList.add(DayButton.DAY_CSS_CLASS);
        this.dayElement.innerText = this.date.toLocaleString(locale, { weekday: "short" });
        this.buttonElement.appendChild(this.dayElement);

        const weatherIcon = document.createElement("div");
        weatherIcon.classList.add(DayButton.WEATHER_ICON_CSS_CLASS);
        this.buttonElement.appendChild(weatherIcon);

        const weatherIconImage = document.createElement("img");
        let prevailingIconId = WeatherDataHelper.getPrevailingIconId(dayWeatherData.data, PartOfDay.DAY);
        if (prevailingIconId === null) {
            prevailingIconId = WeatherDataHelper.getPrevailingIconId(dayWeatherData.data, PartOfDay.NIGHT);
        }
        if (prevailingIconId !== null) {
            weatherIconImage.src = weatherApp.getIconImageURL(prevailingIconId);
        }
        weatherIcon.appendChild(weatherIconImage);

        const averageTemperatures = WeatherDataHelper.getAverageTemperatures(dayWeatherData.data);

        const temperatureElement = document.createElement("span");
        temperatureElement.classList.add(DayButton.TEMPERATURE_CSS_CLASS);
        temperatureElement.innerText = this.createTemperatureString(averageTemperatures.dayTemperature);
        this.buttonElement.appendChild(temperatureElement);

        const nightTemperatureContainer = document.createElement("div");
        nightTemperatureContainer.classList.add(DayButton.NIGHT_TEMPERATURE_CSS_CLASS);
        nightTemperatureContainer.innerHTML = SVGIconElementCreator.create("./static/icon-sprite.svg", "night");
        this.buttonElement.appendChild(nightTemperatureContainer);

        const nightTemperatureElement = document.createElement("span");
        nightTemperatureElement.innerText = this.createTemperatureString(averageTemperatures.nightTemperature);
        nightTemperatureContainer.appendChild(nightTemperatureElement);
    }

    public setAsActive(): void {
        this.buttonElement.classList.add(DayButton.BUTTON_CSS_ACTIVE_MODIFIER_CLASS);
    }

    public setAsInactive(): void {
        this.buttonElement.classList.remove(DayButton.BUTTON_CSS_ACTIVE_MODIFIER_CLASS);
    }

    public updateDayName(locale: string) {
        this.dayElement.innerText = this.date.toLocaleString(locale, { weekday: "short" });
    }

    private createTemperatureString(temperature: number | null): string {
        return temperature !== null
        ? Math.round(temperature).toString() + "°C"
        : "-";
    }
}

export default DayButton;