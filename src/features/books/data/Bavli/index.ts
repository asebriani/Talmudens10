// src/features/books/data/Bavli/index.ts

import { Book } from '../../types';

import Arakhin      from '@assets/text/Bavli/Arakhin.json';
import AvodahZarah  from '@assets/text/Bavli/AvodahZarah.json';
import BavaBatra    from '@assets/text/Bavli/BavaBatra.json';
import BavaKamma    from '@assets/text/Bavli/BavaKamma.json';
import BavaMetzia   from '@assets/text/Bavli/BavaMetzia.json';
import Beitzah      from '@assets/text/Bavli/Beitzah.json';
import Bekhorot     from '@assets/text/Bavli/Bekhorot.json';
import Berakhot     from '@assets/text/Bavli/Berakhot.json';
import Chagigah     from '@assets/text/Bavli/Chagigah.json';
import Chullin      from '@assets/text/Bavli/Chullin.json';
import Eruvin       from '@assets/text/Bavli/Eruvin.json';
import Gittin       from '@assets/text/Bavli/Gittin.json';
import Horayot      from '@assets/text/Bavli/Horayot.json';
import Keritot      from '@assets/text/Bavli/Keritot.json';
import Ketubot      from '@assets/text/Bavli/Ketubot.json';
import Kiddushin    from '@assets/text/Bavli/Kiddushin.json';
import Makkot       from '@assets/text/Bavli/Makkot.json';
import Megillah     from '@assets/text/Bavli/Megillah.json';
import Meilah       from '@assets/text/Bavli/Meilah.json';
import Menachot     from '@assets/text/Bavli/Menachot.json';
import MoedKatan    from '@assets/text/Bavli/MoedKatan.json';
import Nazir        from '@assets/text/Bavli/Nazir.json';
import Nedarim      from '@assets/text/Bavli/Nedarim.json';
import Niddah       from '@assets/text/Bavli/Niddah.json';
import Pesachim     from '@assets/text/Bavli/Pesachim.json';
import RoshHashanah from '@assets/text/Bavli/RoshHashanah.json';
import Sanhedrin    from '@assets/text/Bavli/Sanhedrin.json';
import Shabbat      from '@assets/text/Bavli/Shabbat.json';
import Shevuot      from '@assets/text/Bavli/Shevuot.json';
import Sotah        from '@assets/text/Bavli/Sotah.json';
import Sukkah       from '@assets/text/Bavli/Sukkah.json';
import Taanit       from '@assets/text/Bavli/Taanit.json';
import Tamid        from '@assets/text/Bavli/Tamid.json';
import Temurah      from '@assets/text/Bavli/Temurah.json';
import Yevamot      from '@assets/text/Bavli/Yevamot.json';
import Yoma         from '@assets/text/Bavli/Yoma.json';
import Zevachim     from '@assets/text/Bavli/Zevachim.json';

import { bavliOrder } from './order';

const raw: Record<typeof bavliOrder[number], Book> = {
  Berakhot,
  Shabbat,
  Eruvin,
  Pesachim,
  Yoma,
  Sukkah,
  Beitzah,
  RoshHashanah,
  Taanit,
  Megillah,
  MoedKatan,
  Chagigah,
  Yevamot,
  Ketubot,
  Nedarim,
  Nazir,
  Sotah,
  Gittin,
  Kiddushin,
  BavaKamma,
  BavaMetzia,
  BavaBatra,
  Sanhedrin,
  Makkot,
  Shevuot,
  AvodahZarah,
  Horayot,
  Zevachim,
  Menachot,
  Chullin,
  Bekhorot,
  Arakhin,
  Temurah,
  Keritot,
  Meilah,
  Tamid,
  Niddah,
};

export const bavliBooks: Book[] = bavliOrder.map((id) => {
  const book = raw[id];
  if (!book) {
    throw new Error(`Missing Bavli JSON for tractate "${id}"`);
  }
  return book;
});
