export type ElementToggleConfig = {
    targetElement: HTMLElement;
    openedCSSClass: string;
    buttonElement?: HTMLElement;
    buttonOpenedCSSClass?: string;
    closeOnClickOutside?: boolean;
}

class ElementToggle { // todo - ještě nastavovat tabindex
    private targetElement: HTMLElement;
    private openedCSSClass: string;
    private buttonElement: HTMLElement | null;
    private buttonOpenedCSSClass: string | null;

    private opened: boolean = false;

    constructor(config: ElementToggleConfig) {
        this.targetElement = config.targetElement;
        this.openedCSSClass = config.openedCSSClass;
        this.buttonElement = config.buttonElement || null;
        this.buttonOpenedCSSClass = config.buttonOpenedCSSClass || null;
        const closeOnClickOutside = config.closeOnClickOutside || false;

        if (this.buttonElement) {
            this.buttonElement.addEventListener("click", () => this.onButtonClick());

            for (let i = 0; i < this.buttonElement.children.length; i++) {
                let child = this.buttonElement.children[i];
                if (!(child instanceof HTMLElement)) continue;
                child.style.pointerEvents = "none";
            }
        }
        if (closeOnClickOutside) {
            document.addEventListener("click", event => this.onPageClick(event));
        }

        this.close();
    }

    public isOpened(): boolean {
        return this.opened;
    }

    public open(): void {
        if (this.opened) return;

        this.targetElement.classList.add(this.openedCSSClass);
        if (this.buttonElement && this.buttonOpenedCSSClass) {
            this.buttonElement.classList.add(this.buttonOpenedCSSClass);
        }
        this.opened = true;
    }

    public close(): void {
        if (!this.opened) return;
        
        this.targetElement.classList.remove(this.openedCSSClass);
        if (this.buttonElement && this.buttonOpenedCSSClass) {
            this.buttonElement.classList.remove(this.buttonOpenedCSSClass);
        }
        this.opened = false;
    }

    private onButtonClick(): void {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    private onPageClick(event: MouseEvent): void {
        if (event.target === this.buttonElement) return;
        this.close();
    }
}

export default ElementToggle;