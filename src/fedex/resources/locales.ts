export const localeCodes = {
  Arabic: "ar_AE",
  Bulgarian: "bg_BG",
  ChineseChina: "zh_CN",
  ChineseHongKong: "zh_HK",
  ChineseTaiwan: "zh_TW",
  Czech: "cs_CZ",
  Danish: "da_DK",
  Dutch: "nl_NL",
  EnglishCanada: "en_CA",
  EnglishUK: "en_GB",
  EnglishUS: "en_US",
  Estonian: "et_EE",
  Finnish: "fi_FI",
  FrenchCanada: "fr_CA",
  FrenchFrance: "fr_FR",
  GermanGermany: "de_DE",
  GermanSwitzerland: "de_CH",
  Greek: "el_GR",
  Hungarian: "hu_HU",
  Italian: "it_IT",
  Japanese: "ja_JP",
  Korean: "ko_KR",
  Latvian: "lv_LV",
  Lithuanian: "lt_LT",
  Norwegian: "no_NO",
  Polish: "pl_PL",
  PortugueseBrazil: "pt_BR",
  PortuguesePortugal: "pt_PT",
  Romanian: "ro_RO",
  Russian: "ru_RU",
  Slovak: "sk_SK",
  Slovenian: "sl_SI",
  SpanishArgentina: "es_AR",
  SpanishMexico: "es_MX",
  SpanishSpain: "es_ES",
  SpanishUS: "es_US",
  Swedish: "sv_SE",
  Thai: "th_TH",
  Turkish: "tr_TR",
  Ukrainian: "uk_UA",
  Vietnamese: "vi_VN",
} as const;

export type LocaleCodes = keyof typeof localeCodes;
export type LocaleCodeValues = typeof localeCodes[LocaleCodes];

export function getLocaleCode(country: LocaleCodes): LocaleCodeValues | null {
  return localeCodes[country] || null;
}
