/*----------------------------------------------------------------------------
  src/stores/languages.ts

  Select languages.
 *---------------------------------------------------------------------------*/
import { writable } from 'svelte/store';

const default_langs = ['en', 'ja'];

export const langs = (() => {
  const { subscribe, update } = writable([...default_langs]);

  return {
    subscribe,
    add: (lang: string) =>
      update((array) => {
        if (!array.includes(lang)) {
          array.push(lang);
        }
        return array;
      }),

    remove: (lang: string) =>
      update((array) => {
        array = array.filter((v) => v !== lang);
        return array;
      }),
  };
})();
