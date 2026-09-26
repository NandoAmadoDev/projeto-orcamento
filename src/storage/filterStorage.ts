import AsyncStorage from '@react-native-async-storage/async-storage';

import { QuoteStatus } from '@/types/Quote';

const FILTER_STORAGE = '@projeto_orcamento:status_filter';
const SORT_STORAGE = '@projeto_orcamento:sort_order';

export type StatusFilter = QuoteStatus | 'ALL';
export type SortOrder = 'NEWEST' | 'OLDEST';

async function get(): Promise<StatusFilter> {
  const storage = await AsyncStorage.getItem(FILTER_STORAGE);

  if (!storage) {
    return 'ALL';
  }

  return storage as StatusFilter;
}

async function save(status: StatusFilter) {
  await AsyncStorage.setItem(
    FILTER_STORAGE,
    status
  );
}

async function getSort(): Promise<SortOrder> {
  const storage = await AsyncStorage.getItem(SORT_STORAGE);

  if (!storage) {
    return 'NEWEST';
  }

  return storage as SortOrder;
}

async function saveSort(sort: SortOrder) {
  await AsyncStorage.setItem(
    SORT_STORAGE,
    sort
  );
}

export const filterStorage = {
  get,
  save,
  getSort,
  saveSort,
};