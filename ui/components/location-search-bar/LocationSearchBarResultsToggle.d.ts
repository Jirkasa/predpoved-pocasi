import LanguageManager from "../../../localization/LanguageManager";
declare class LocationSearchBarResultsToggle {
    private static readonly LOADING_ICON_CSS_CLASS;
    private static readonly MESSAGE_CSS_CLASS;
    private static readonly ERROR_MESSAGE_CSS_MODIFIER_CLASS;
    private container;
    private loadingIcon;
    private noResultsMessage;
    private errorMessage;
    private itemsContainer;
    private currentlyDisplayedElement;
    constructor(container: HTMLElement, itemsContainer: HTMLElement, languageManager: LanguageManager);
    showLoadingIcon(): void;
    showNoResultsMessage(): void;
    showErrorMessage(): void;
    showItems(): void;
    private onLanguageChange;
}
export default LocationSearchBarResultsToggle;
