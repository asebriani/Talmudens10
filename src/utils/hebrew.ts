// src/utils/hebrew.ts

const HEBREW_UNITS = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
const HEBREW_TENS  = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
const HEBREW_HUND  = ["", "ק", "ר", "ש", "ת"];

/**
 * Convert a positive integer to its Hebrew-gematria letters (no geresh/gershayim).
 */
export function intToHebrew(num: number): string {
  if (num <= 0) {
    return "";
  }
  let heb = "";

  // hundreds place (100,200,300,400,...)
  const hundreds = Math.floor(num / 100) % 10;
  if (hundreds > 0) {
    if (hundreds <= 4) {
      heb += HEBREW_HUND[hundreds];
    } else {
      // for 500–900: repeat tav (ת) then the remainder
      heb += "ת".repeat(Math.floor(hundreds / 4));
      const rem = hundreds % 4;
      if (rem) {
        heb += HEBREW_HUND[rem];
      }
    }
  }

  // special 15 & 16 (always טו & טז)
  const rem100 = num % 100;
  if (rem100 === 15) {
    return heb + "טו";
  }
  if (rem100 === 16) {
    return heb + "טז";
  }

  // tens place
  const tens = Math.floor(num / 10) % 10;
  if (tens > 0) {
    heb += HEBREW_TENS[tens];
  }

  // units place
  const units = num % 10;
  if (units > 0) {
    heb += HEBREW_UNITS[units];
  }

  return heb;
}
