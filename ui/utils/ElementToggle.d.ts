export type ElementToggleConfig = {
    targetElement: HTMLElement;
    openedCSSClass: string;
    buttonElement?: HTMLElement;
    buttonOpenedCSSClass?: string;
    closeOnClickOutside?: boolean;
};
declare class ElementToggle {
    private targetElement;
    private openedCSSClass;
    private buttonElement;
    private buttonOpenedCSSClass;
    private opened;
    constructor(config: ElementToggleConfig);
    isOpened(): boolean;
    open(): void;
    close(): void;
    private onButtonClick;
    private onPageClick;
}
export default ElementToggle;
