// src/features/books/data/sedarim.ts

/** Hebrew labels for each seder */
export const SEDARIM_LABELS: Record<string, string> = {
    Zeraim:   'זרעים',
    Moed:     'מועד',
    Nashim:   'נשים',
    Nezikin:  'נזיקין',
    Kodashim: 'קדשים',
    Taharot:  'טהרות',
  }
  
  /** Explicit list of Mishnah tractates in each seder */
  export const mishnahSedarim: Record<keyof typeof SEDARIM_LABELS, string[]> = {
    Zeraim: [
      'Berakhot','Peah','Demai','Kilayim','Sheviit','Terumot',
      'Maasrot','MaaserSheni','Challah','Orlah','Bikkurim',
    ],
    Moed: [
      'Shabbat','Eruvin','Pesachim','Shekalim','Yoma','Sukkah',
      'Beitzah','RoshHashanah','Taanit','Megillah','MoedKatan','Chagigah',
    ],
    Nashim: [
      'Yevamot','Ketubot','Nedarim','Nazir','Sotah','Gittin','Kiddushin',
    ],
    Nezikin: [
      'BavaKamma','BavaMetzia','BavaBatra','Sanhedrin','Makkot',
      'Shevuot','AvodahZarah','Horayot','PirkeiAvot',
    ],
    Kodashim: [
      'Zevachim','Menachot','Chullin','Bekhorot','Arakhin','Temurah',
      'Keritot','Meilah','Tamid','Middot','Kinnim',
    ],
    Taharot: [
      'Kelim','Oholot','Negaim','Parah','Tahorot','Mikvaot',
      'Niddah','Makhshirin','Zavim','TevulYom','Yadayim','Oktzin',
    ],
  }
  
  /** Explicit list of Bavli tractates in each seder */
  export const bavliSedarim: Record<keyof typeof SEDARIM_LABELS, string[]> = {
    Zeraim:   ['Berakhot'],
    Moed:     [
      'Shabbat','Eruvin','Pesachim','Yoma','Sukkah','Beitzah',
      'RoshHashanah','Taanit','Megillah','MoedKatan','Chagigah',
    ],
    Nashim:   ['Yevamot','Ketubot','Nedarim','Nazir','Sotah','Gittin','Kiddushin'],
    Nezikin:  [
      'BavaKamma','BavaMetzia','BavaBatra','Sanhedrin',
      'Makkot','Shevuot','AvodahZarah','Horayot',
    ],
    Kodashim: [
      'Zevachim','Menachot','Chullin','Bekhorot',
      'Arakhin','Temurah','Keritot','Meilah','Tamid',
    ],
    Taharot:  ['Niddah'],
  }
  
  export type TextType = 'Mishnah' | 'Bavli'
  export type SederName = keyof typeof SEDARIM_LABELS
  
  interface PerTextConfig {
    sedarim: Record<SederName, string[]>
    labels:  Record<SederName, string>
  }
  
  /**
   * Unified config for each text’s seder+labels,
   * so the UI can drive off of one source of truth.
   */
  export const sederConfig: Record<TextType, PerTextConfig> = {
    Mishnah: { sedarim: mishnahSedarim, labels: SEDARIM_LABELS },
    Bavli:   { sedarim: bavliSedarim,  labels: SEDARIM_LABELS },
  }
  