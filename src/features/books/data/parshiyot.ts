// src/features/books/data/parshiyot.ts
import raw from './parshiyot.json'

export interface Parsha {
  /** programmatic name */
  name: string
  /** Hebrew label to render in the UI */
  hebrewName: string
  /** one of the Torah book IDs (“Genesis”, “Exodus”, …) */
  book: string
  /** first chapter & verse of this parsha */
  start: { chapter: number; verse: number }
  /** last chapter & verse of this parsha */
  end:   { chapter: number; verse: number }
}

export const parshiyot: Parsha[] = raw.parshiyot
