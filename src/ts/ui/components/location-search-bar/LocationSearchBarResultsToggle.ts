import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import SVGIconElementCreator from "../../utils/SVGIconElementCreator";

class LocationSearchBarResultsToggle {
    private static readonly LOADING_ICON_CSS_CLASS = "search-bar__loading-icon";
    private static readonly MESSAGE_CSS_CLASS = "search-bar__message";
    private static readonly ERROR_MESSAGE_CSS_MODIFIER_CLASS = "search-bar__message--error";
    
    private container: HTMLElement;

    private loadingIcon: HTMLElement;
    private noResultsMessage: HTMLElement;
    private errorMessage: HTMLElement;
    private itemsContainer: HTMLElement;

    private currentlyDisplayedElement: HTMLElement | null = null;

    constructor(container: HTMLElement, itemsContainer: HTMLElement, languageManager: LanguageManager) {
        this.container = container;

        this.loadingIcon = document.createElement("div");
        this.noResultsMessage = document.createElement("p");
        this.errorMessage = document.createElement("p");
        this.itemsContainer = itemsContainer;

        this.loadingIcon.classList.add(LocationSearchBarResultsToggle.LOADING_ICON_CSS_CLASS);
        this.noResultsMessage.classList.add(LocationSearchBarResultsToggle.MESSAGE_CSS_CLASS);
        this.errorMessage.classList.add(LocationSearchBarResultsToggle.MESSAGE_CSS_CLASS);
        this.errorMessage.classList.add(LocationSearchBarResultsToggle.ERROR_MESSAGE_CSS_MODIFIER_CLASS);

        this.loadingIcon.innerHTML = SVGIconElementCreator.create("./static/icon-sprite.svg", "progress");
        
        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    public showLoadingIcon(): void {
        if (this.currentlyDisplayedElement) {
            this.currentlyDisplayedElement.remove();
        }
        this.container.appendChild(this.loadingIcon);
        this.currentlyDisplayedElement = this.loadingIcon;
    }

    public showNoResultsMessage(): void {
        if (this.currentlyDisplayedElement) {
            this.currentlyDisplayedElement.remove();
        }
        this.container.appendChild(this.noResultsMessage);
        this.currentlyDisplayedElement = this.noResultsMessage;
    }

    public showErrorMessage(): void {
        if (this.currentlyDisplayedElement) {
            this.currentlyDisplayedElement.remove();
        }
        this.container.appendChild(this.errorMessage);
        this.currentlyDisplayedElement = this.errorMessage;
    }

    public showItems(): void {
        if (this.currentlyDisplayedElement) {
            this.currentlyDisplayedElement.remove();
        }
        this.container.appendChild(this.itemsContainer);
        this.currentlyDisplayedElement = this.itemsContainer;
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        this.noResultsMessage.innerText = languageInfo.localizedData.noResultsForLocationSearch;
        this.errorMessage.innerText = languageInfo.localizedData.locationSearchError;
    }
}

export default LocationSearchBarResultsToggle;