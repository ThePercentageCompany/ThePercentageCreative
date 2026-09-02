import en from "./en.json";
import ar from "./ar.json";
import hi from "./hi.json";
import fr from "./fr.json";
import de from "./de.json";
import af from "./af.json";
import ln from "./ln.json";
import tr from "./tr.json";
import tl from "./tl.json";
import es from "./es.json";
import it from "./it.json";
import pt from "./pt.json";
import ru from "./ru.json";
import zh from "./zh.json";

export type LocaleKey =
  | "en"
  | "ar"
  | "hi"
  | "fr"
  | "de"
  | "af"
  | "ln"
  | "tr"
  | "tl"
  | "es"
  | "it"
  | "pt"
  | "ru"
  | "zh";

export interface LanguageOption {
  code: LocaleKey;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪", dir: "rtl" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦", dir: "ltr" },
  { code: "ln", name: "Lingala", nativeName: "Lingála (Congo)", flag: "🇨🇩", dir: "ltr" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog / Filipino", flag: "🇵🇭", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", dir: "ltr" }
];

export const DICTIONARIES: Record<LocaleKey, typeof en> = {
  en,
  ar,
  hi,
  fr,
  de,
  af,
  ln,
  tr,
  tl,
  es,
  it,
  pt,
  ru,
  zh
};
