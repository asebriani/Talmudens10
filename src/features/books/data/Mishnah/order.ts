// src/features/books/data/Mishnah/order.ts

/**
 * Classical “Seder” sequence for the Mishnah,
 * with Pirkei Avot placed after Horayot in Seder Nezikin.
 */
export const mishnahOrder = [
    // Seder Zeraim
    'Berakhot',
    'Peah',
    'Demai',
    'Kilayim',
    'Sheviit',
    'Terumot',
    'Maasrot',
    'MaaserSheni',
    'Challah',
    'Orlah',
    'Bikkurim',
  
    // Seder Moed
    'Shabbat',
    'Eruvin',
    'Pesachim',
    'Shekalim',
    'Yoma',
    'Sukkah',
    'Beitzah',
    'RoshHashanah',
    'Taanit',
    'Megillah',
    'MoedKatan',
    'Chagigah',
  
    // Seder Nashim
    'Yevamot',
    'Ketubot',
    'Nedarim',
    'Nazir',
    'Sotah',
    'Gittin',
    'Kiddushin',
  
    // Seder Nezikin
    'BavaKamma',
    'BavaMetzia',
    'BavaBatra',
    'Sanhedrin',
    'Makkot',
    'Shevuot',
    'Eduyot',
    'AvodahZarah',
    'Horayot',
    'PirkeiAvot',
  
    // Seder Kodashim
    'Zevachim',
    'Menachot',
    'Chullin',
    'Bekhorot',
    'Arakhin',
    'Temurah',
    'Keritot',
    'Meilah',
    'Tamid',
    'Middot',
    'Kinnim',
  
    // Seder Taharot
    'Kelim',
    'Oholot',
    'Negaim',
    'Parah',
    'Tahorot',
    'Mikvaot',
    'Niddah',
    'Makhshirin',
    'Zavim',
    'TevulYom',
    'Yadayim',
    'Oktzin',
  ] as const;
  