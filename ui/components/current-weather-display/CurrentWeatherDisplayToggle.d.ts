declare class CurrentWeatherDisplayToggle {
    private loadingIcon;
    private contentContainer;
    constructor(loadingIcon: HTMLElement, contentContainer: HTMLElement);
    showLoadingIcon(): void;
    showContent(): void;
}
export default CurrentWeatherDisplayToggle;
