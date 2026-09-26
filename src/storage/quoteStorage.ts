import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuoteDoc, QuoteStatus } from '@/types/Quote';

const QUOTES_STORAGE = '@projeto_orcamento:quotes';

async function getAll(): Promise<QuoteDoc[]> {
  const storage = await AsyncStorage.getItem(QUOTES_STORAGE);

  const quotes: QuoteDoc[] = storage
    ? JSON.parse(storage)
    : [];

  return quotes;
}

async function save(newQuote: QuoteDoc) {
  const quotes = await getAll();

  const storage = JSON.stringify([
    ...quotes,
    newQuote,
  ]);

  await AsyncStorage.setItem(
    QUOTES_STORAGE,
    storage
  );
}

async function updateStatus(
  id: string,
  status: QuoteStatus
) {
  const quotes = await getAll();

  const updatedQuotes = quotes.map((quote) => {
    if (quote.id === id) {
      return {
        ...quote,
        status,
        updatedAt: new Date().toISOString(),
      };
    }

    return quote;
  });

  await AsyncStorage.setItem(
    QUOTES_STORAGE,
    JSON.stringify(updatedQuotes)
  );
}

async function duplicate(id: string) {
  const quotes = await getAll();

  const quote = quotes.find((item) => item.id === id);

  if (!quote) {
    return;
  }

  const now = new Date().toISOString();

  const duplicatedQuote: QuoteDoc = {
    ...quote,

    id: Date.now().toString(),

    title: `${quote.title} - Cópia`,

    items: quote.items.map((item, index) => ({
      ...item,
      id: `${Date.now()}-${index}`,
    })),

    status: QuoteStatus.DRAFT,

    createdAt: now,
    updatedAt: now,
  };

  await save(duplicatedQuote);
}

async function remove(id: string) {
  const quotes = await getAll();

  const updatedQuotes = quotes.filter(
    (quote) => quote.id !== id
  );

  await AsyncStorage.setItem(
    QUOTES_STORAGE,
    JSON.stringify(updatedQuotes)
  );
}

export const quoteStorage = {
  getAll,
  save,
  updateStatus,
  duplicate,
  remove,
};