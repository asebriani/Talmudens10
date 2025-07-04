import { Book } from '../../types';
import { talmudicOrder } from './order';

// static imports from assets:
import Joshua    from '@assets/text/Prophets/Joshua.json';
import Judges    from '@assets/text/Prophets/Judges.json';
import SamuelI   from '@assets/text/Prophets/SamuelI.json';
import SamuelII  from '@assets/text/Prophets/SamuelII.json';
import KingsI    from '@assets/text/Prophets/KingsI.json';
import KingsII   from '@assets/text/Prophets/KingsII.json';
import Isaiah    from '@assets/text/Prophets/Isaiah.json';
import Jeremiah  from '@assets/text/Prophets/Jeremiah.json';
import Ezekiel   from '@assets/text/Prophets/Ezekiel.json';
import Hosea     from '@assets/text/Prophets/Hosea.json';
import Joel      from '@assets/text/Prophets/Joel.json';
import Amos      from '@assets/text/Prophets/Amos.json';
import Obadiah   from '@assets/text/Prophets/Obadiah.json';
import Jonah     from '@assets/text/Prophets/Jonah.json';
import Micah     from '@assets/text/Prophets/Micah.json';
import Nahum     from '@assets/text/Prophets/Nahum.json';
import Habakkuk  from '@assets/text/Prophets/Habakkuk.json';
import Zephaniah from '@assets/text/Prophets/Zephaniah.json';
import Haggai    from '@assets/text/Prophets/Haggai.json';
import Zechariah from '@assets/text/Prophets/Zechariah.json';
import Malachi   from '@assets/text/Prophets/Malachi.json';

const raw: Record<string, Book> = {
  Joshua, Judges, SamuelI, SamuelII, KingsI, KingsII,
  Isaiah, Jeremiah, Ezekiel,
  Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum,
  Habakkuk, Zephaniah, Haggai, Zechariah, Malachi,
};

export const prophetsBooks: Book[] = talmudicOrder
  .map(id => {
    const book = raw[id];
    if (!book) throw new Error(`Missing Prophets JSON for ${id}`);
    return book;
  });
