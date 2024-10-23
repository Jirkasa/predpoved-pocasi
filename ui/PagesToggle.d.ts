declare class PagesToggle {
    private loadingPage;
    private weatherAppPage;
    private errorPage;
    constructor(loadingPage: HTMLElement, weatherAppPage: HTMLElement, errorPage: HTMLElement);
    showLoadingPage(): void;
    showWeatherAppPage(): void;
    showErrorPage(): void;
}
export default PagesToggle;
