// src/features/books/hooks/useParshiyot.ts
import { parshiyot, Parsha } from '../data/parshiyot'

/** Returns a map: bookId → Parsha[] */
export function useParshiyot(): Record<string, Parsha[]> {
  return parshiyot.reduce((map, p) => {
    if (!map[p.book]) {
      map[p.book] = []
    }
    map[p.book].push(p)
    return map
  }, {} as Record<string, Parsha[]>)
}
