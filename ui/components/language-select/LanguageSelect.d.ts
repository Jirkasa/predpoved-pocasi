import LanguageManager from "../../../localization/LanguageManager";
export type LanguageSelectElementsConfig = {
    selectButton: HTMLElement;
    selectButtonFlagImage: HTMLImageElement;
    selectButtonText: HTMLElement;
    selectItemsContainer: HTMLElement;
    englishButton: HTMLElement;
    czechButton: HTMLElement;
    slovakButton: HTMLElement;
    germanButton: HTMLElement;
};
declare class LanguageSelect {
    private static readonly SELECT_ITEMS_CONTAINER_OPENED_CSS_MODIFIER_CLASS;
    private static readonly SELECT_BUTTON_OPENED_CSS_MODIFIER_CLASS;
    private languageManager;
    private selectButtonFlagImage;
    private selectButtonText;
    constructor(languageManager: LanguageManager, elements: LanguageSelectElementsConfig);
    private onLanguageButtonClick;
    private onLanguageChanged;
    private updateSelectButton;
    private getFlagImageURLByLanguage;
    private getButtonTextByLanguage;
}
export default LanguageSelect;
