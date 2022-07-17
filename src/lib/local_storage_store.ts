/*----------------------------------------------------------------------------
  src/lib/local_storage_store.ts

  LocalStorage Store.
 *---------------------------------------------------------------------------*/
import { writable } from 'svelte/store';

function saveToLS(key: string, value: any) {
  if (value === undefined) return; // TODO: error?

  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(data));
  } else {
    window.localStorage.setItem(key, value);
  }
}

function loadFromLS(key: string, defaultValue: any) {
  const dat = window.localStorage.getItem(key);
  if (dat === null || dat === undefined) return defaultValue;

  if (typeof defaultValue === 'object') {
    return JSON.parse(dat);
  }
  return dat;
}

export function createLocalStorageStore(key: string, defaultValue: any) {
  const { subscribe, set } = writable(loadFromLS(key, defaultValue));
  return {
    subscribe,
    set: (value: any) => {
      set(value);
      saveToLS(key, value);
    },
  };
}
