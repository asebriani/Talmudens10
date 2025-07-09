// src/features/books/data/parshiyot.ts

import raw from './parshiyot.json'

export interface Parsha {
  /** programmatic name */
  name: string
  /** Hebrew label to render in the UI (without niqqud) */
  hebrewName: string
  /** one of the Torah book IDs (“Genesis”, “Exodus”, …) */
  book: string
  /** first chapter & verse of this parsha */
  start: { chapter: number; verse: number }
  /** last chapter & verse of this parsha */
  end:   { chapter: number; verse: number }
}

/**
 * Strip Hebrew niqqud (vowel points) and cantillation marks from a string.
 */
function stripNikud(str: string): string {
  // Normalize to decomposed form (NFD), remove all combining marks in the Hebrew block,
  // then recompose (NFC).
  return str
    .normalize('NFD')
    .replace(/[\u0591-\u05C7]/g, '')
    .normalize('NFC')
}

/**
 * Load the raw parshiyot data, stripping out any niqqud from the Hebrew names.
 */
export const parshiyot: Parsha[] = raw.parshiyot.map(p => ({
  ...p,
  hebrewName: stripNikud(p.hebrewName),
}))
