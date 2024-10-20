import AppLanguage from "../AppLanguage";

class LocalizationHelper {
    public static getLocale(language: AppLanguage, useCzForCzech: boolean = false): string {
        switch (language) {
            case AppLanguage.ENGLISH:
                return "en";
            case AppLanguage.CZECH:
                if (useCzForCzech) return "cz";
                return "cs";
            case AppLanguage.SLOVAK:
                return "sk";
            case AppLanguage.GERMAN:
                return "de";
        }
    }


}

export default LocalizationHelper;