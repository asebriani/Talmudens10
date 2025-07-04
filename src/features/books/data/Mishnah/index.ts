// src/features/books/data/Mishnah/index.ts

import { Book } from '../../types';

import Arakhin       from '@assets/text/Mishnah/Arakhin.json';
import AvodahZarah   from '@assets/text/Mishnah/AvodahZarah.json';
import BavaBatra     from '@assets/text/Mishnah/BavaBatra.json';
import BavaKamma     from '@assets/text/Mishnah/BavaKamma.json';
import BavaMetzia    from '@assets/text/Mishnah/BavaMetzia.json';
import Beitzah       from '@assets/text/Mishnah/Beitzah.json';
import Bekhorot      from '@assets/text/Mishnah/Bekhorot.json';
import Berakhot      from '@assets/text/Mishnah/Berakhot.json';
import Bikkurim      from '@assets/text/Mishnah/Bikkurim.json';
import Chagigah      from '@assets/text/Mishnah/Chagigah.json';
import Challah       from '@assets/text/Mishnah/Challah.json';
import Chullin       from '@assets/text/Mishnah/Chullin.json';
import Demai         from '@assets/text/Mishnah/Demai.json';
import Eduyot        from '@assets/text/Mishnah/Eduyot.json';
import Eruvin        from '@assets/text/Mishnah/Eruvin.json';
import Gittin        from '@assets/text/Mishnah/Gittin.json';
import Horayot       from '@assets/text/Mishnah/Horayot.json';
import Kelim         from '@assets/text/Mishnah/Kelim.json';
import Keritot       from '@assets/text/Mishnah/Keritot.json';
import Ketubot       from '@assets/text/Mishnah/Ketubot.json';
import Kiddushin     from '@assets/text/Mishnah/Kiddushin.json';
import Kilayim       from '@assets/text/Mishnah/Kilayim.json';
import Kinnim        from '@assets/text/Mishnah/Kinnim.json';
import MaaserSheni   from '@assets/text/Mishnah/MaaserSheni.json';
import Maasrot       from '@assets/text/Mishnah/Maasrot.json';
import Makhshirin    from '@assets/text/Mishnah/Makhshirin.json';
import Makkot        from '@assets/text/Mishnah/Makkot.json';
import Megillah      from '@assets/text/Mishnah/Megillah.json';
import Meilah        from '@assets/text/Mishnah/Meilah.json';
import Menachot      from '@assets/text/Mishnah/Menachot.json';
import Middot        from '@assets/text/Mishnah/Middot.json';
import Mikvaot       from '@assets/text/Mishnah/Mikvaot.json';
import MoedKatan     from '@assets/text/Mishnah/MoedKatan.json';
import Nazir         from '@assets/text/Mishnah/Nazir.json';
import Nedarim       from '@assets/text/Mishnah/Nedarim.json';
import Negaim        from '@assets/text/Mishnah/Negaim.json';
import Niddah        from '@assets/text/Mishnah/Niddah.json';
import Oholot        from '@assets/text/Mishnah/Oholot.json';
import Oktzin        from '@assets/text/Mishnah/Oktzin.json';
import Orlah         from '@assets/text/Mishnah/Orlah.json';
import Parah         from '@assets/text/Mishnah/Parah.json';
import Peah          from '@assets/text/Mishnah/Peah.json';
import Pesachim      from '@assets/text/Mishnah/Pesachim.json';
import PirkeiAvot    from '@assets/text/Mishnah/PirkeiAvot.json';
import RoshHashanah  from '@assets/text/Mishnah/RoshHashanah.json';
import Sanhedrin     from '@assets/text/Mishnah/Sanhedrin.json';
import Shabbat       from '@assets/text/Mishnah/Shabbat.json';
import Shekalim      from '@assets/text/Mishnah/Shekalim.json';
import Sheviit       from '@assets/text/Mishnah/Sheviit.json';
import Shevuot       from '@assets/text/Mishnah/Shevuot.json';
import Sotah         from '@assets/text/Mishnah/Sotah.json';
import Sukkah        from '@assets/text/Mishnah/Sukkah.json';
import Taanit        from '@assets/text/Mishnah/Taanit.json';
import Tahorot       from '@assets/text/Mishnah/Tahorot.json';
import Tamid         from '@assets/text/Mishnah/Tamid.json';
import Temurah       from '@assets/text/Mishnah/Temurah.json';
import Terumot       from '@assets/text/Mishnah/Terumot.json';
import TevulYom      from '@assets/text/Mishnah/TevulYom.json';
import Yadayim       from '@assets/text/Mishnah/Yadayim.json';
import Yevamot       from '@assets/text/Mishnah/Yevamot.json';
import Yoma          from '@assets/text/Mishnah/Yoma.json';
import Zavim         from '@assets/text/Mishnah/Zavim.json';
import Zevachim      from '@assets/text/Mishnah/Zevachim.json';

import { mishnahOrder } from './order';

const raw: Record<typeof mishnahOrder[number], Book> = {
  Berakhot,
  Peah,
  Demai,
  Kilayim,
  Sheviit,
  Terumot,
  Maasrot,
  MaaserSheni,
  Challah,
  Orlah,
  Bikkurim,

  Shabbat,
  Eruvin,
  Pesachim,
  Shekalim,
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
  Eduyot,
  AvodahZarah,
  Horayot,
  PirkeiAvot,

  Zevachim,
  Menachot,
  Chullin,
  Bekhorot,
  Arakhin,
  Temurah,
  Keritot,
  Meilah,
  Tamid,
  Middot,
  Kinnim,

  Kelim,
  Oholot,
  Negaim,
  Parah,
  Tahorot,
  Mikvaot,
  Niddah,
  Makhshirin,
  Zavim,
  TevulYom,
  Yadayim,
  Oktzin,
};

export const mishnahBooks: Book[] = mishnahOrder.map(id => {
  const book = raw[id];
  if (!book) {
    throw new Error(`Missing Mishnah JSON for tractate "${id}"`);
  }
  return book;
});
