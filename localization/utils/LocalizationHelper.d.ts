import AppLanguage from "../AppLanguage";
declare class LocalizationHelper {
    static getLocale(language: AppLanguage, useCzForCzech?: boolean): string;
}
export default LocalizationHelper;
