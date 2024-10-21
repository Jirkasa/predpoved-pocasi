class ForecastDisplayToggle {
    private loadingIcon: HTMLElement;
    private contentContainer: HTMLElement;

    constructor(loadingIcon: HTMLElement, contentContainer: HTMLElement) {
        this.loadingIcon = loadingIcon;
        this.contentContainer = contentContainer;
    }

    public showLoadingIcon(): void {
        this.loadingIcon.style.removeProperty("display");
        this.contentContainer.style.display = "none";
    }

    public showContent(): void {
        this.loadingIcon.style.display = "none";
        this.contentContainer.style.removeProperty("display");
    }
}

export default ForecastDisplayToggle;