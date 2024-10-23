/** Utility to create HTML code for SVG icons. */
declare class SVGIconElementCreator {
    /**
     * Creates HTML code for SVG icon.
     * @param svgSpritePath Path to SVG sprite with icons.
     * @param iconName Name of icon.
     * @returns HTML for SVG icon.
     */
    static create(svgSpritePath: string, iconName: string): string;
}
export default SVGIconElementCreator;
