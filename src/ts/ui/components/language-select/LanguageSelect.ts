import AppLanguage from "../../../localization/AppLanguage";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import ElementToggle from "../../utils/ElementToggle";

export type LanguageSelectElementsConfig = {
    selectButton: HTMLElement;
    selectButtonFlagImage: HTMLImageElement;
    selectButtonText: HTMLElement;
    selectItemsContainer: HTMLElement;
    englishButton: HTMLElement;
    czechButton: HTMLElement;
    slovakButton: HTMLElement;
    germanButton: HTMLElement;
}

class LanguageSelect {
    private static readonly SELECT_ITEMS_CONTAINER_OPENED_CSS_MODIFIER_CLASS = "language-select__items--opened";
    private static readonly SELECT_BUTTON_OPENED_CSS_MODIFIER_CLASS = "language-select__button--opened";

    private languageManager: LanguageManager;
    private selectButtonFlagImage: HTMLImageElement;
    private selectButtonText: HTMLElement;

    constructor(languageManager: LanguageManager, elements: LanguageSelectElementsConfig) {
        this.languageManager = languageManager;
        this.selectButtonFlagImage = elements.selectButtonFlagImage;
        this.selectButtonText = elements.selectButtonText;

        this.updateSelectButton(this.languageManager.getCurrentLanguage());

        new ElementToggle({
            targetElement: elements.selectItemsContainer,
            openedCSSClass: LanguageSelect.SELECT_ITEMS_CONTAINER_OPENED_CSS_MODIFIER_CLASS,
            buttonElement: elements.selectButton,
            buttonOpenedCSSClass: LanguageSelect.SELECT_BUTTON_OPENED_CSS_MODIFIER_CLASS,
            closeOnClickOutside: true
        });

        const englishButton = elements.englishButton;
        const czechButton = elements.czechButton;
        const slovakButton = elements.slovakButton;
        const germanButton = elements.germanButton;

        englishButton.addEventListener("click", () => this.onLanguageButtonClick(AppLanguage.ENGLISH));
        czechButton.addEventListener("click", () => this.onLanguageButtonClick(AppLanguage.CZECH));
        slovakButton.addEventListener("click", () => this.onLanguageButtonClick(AppLanguage.SLOVAK));
        germanButton.addEventListener("click", () => this.onLanguageButtonClick(AppLanguage.GERMAN));
        this.languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChanged(languageInfo));
    }

    private onLanguageButtonClick(language: AppLanguage): void {
        this.languageManager.changeLanguage(language);

        this.updateSelectButton(language);
    }

    private onLanguageChanged(languageInfo: LanguageInfo): void {
        this.updateSelectButton(languageInfo.language);
    }

    private updateSelectButton(language: AppLanguage): void {
        this.selectButtonFlagImage.src = this.getFlagImageURLByLanguage(language);
        this.selectButtonText.innerText = this.getButtonTextByLanguage(language);
    }

    private getFlagImageURLByLanguage(language: AppLanguage): string {
        switch (language) {
            case AppLanguage.ENGLISH:
                return "./static/img/flags/united-states.svg";
            case AppLanguage.CZECH:
                return "./static/img/flags/czechia.svg";
            case AppLanguage.SLOVAK:
                return "./static/img/flags/slovakia.svg";
            case AppLanguage.GERMAN:
                return "./static/img/flags/germany.svg";
        }
    }

    private getButtonTextByLanguage(language: AppLanguage): string {
        switch (language) {
            case AppLanguage.ENGLISH:
                return "English";
            case AppLanguage.CZECH:
                return "Česky";
            case AppLanguage.SLOVAK:
                return "Slovensky";
            case AppLanguage.GERMAN:
                return "Deutsch";
        }
    }
}

export default LanguageSelect;