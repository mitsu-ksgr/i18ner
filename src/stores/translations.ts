/*----------------------------------------------------------------------------
  src/stores/translations.ts

  i18n support.
 *---------------------------------------------------------------------------*/

import { writable, derived } from 'svelte/store';

function createMapStore() {
  const store = writable({});
  const dstore = derived(store, (map) => ({
    keys: Object.keys(map),
    has(key) {
      return key in map;
    },

    getTranslation(key, lang) {
      if (key in map && lang in map[key]) {
        return map[key][lang];
      }
      return '';
    },

    getTranslations(key) {
      if (key in map) {
        return map[key];
      }
      return {};
    },

    getLangTranslations(lang, ignore_missing_data_keys = false) {
      const ret = {};
      for (const [key, trs] of Object.entries(map)) {
        let value = trs[lang];
        if (value === undefined || value === null) {
          value = '';
        }

        if (ignore_missing_data_keys && value === '') {
          continue;
        }

        ret[key] = value;
      }
      return ret;
    },

    //-------------------------------------------------------------------------
    // for debug.
    dumpAll() {
      return map;
    },
  }));

  return {
    subscribe: dstore.subscribe,

    addKey: (key) =>
      store.update((map) => {
        if (key in map === false) {
          map[key] = {};
        }
        return map;
      }),

    addTranslation: (key, lang, value) => {
      store.update((map) => {
        if (key in map === false) {
          map[key] = {};
        }
        map[key][lang] = value;
        return map;
      });
    },

    updateKey: (oldkey, newkey) => {
      store.update((map) => {
        if (newkey in map) return map; // TODO: alert?

        Object.defineProperty(
          map,
          newkey,
          Object.getOwnPropertyDescriptor(map, oldkey),
        );
        delete map[oldkey];
        return map;
      });
    },

    removeKey: (key) => {
      store.update((map) => {
        if (key in map) delete map[key];
        return map;
      });
    },

    removeLang: (lang) => {
      store.update((map) => {
        for (const key of Object.keys(map)) {
          if (lang in map[key]) {
            delete map[key][lang];
          }
        }
        return map;
      });
    },

    replaceTranslations: (lang, data) => {
      store.update((map) => {
        for (const key of Object.keys(data)) {
          if (key in map === false) map[key] = {};
          map[key][lang] = data[key];
        }
        return map;
      });
    },

    mergeTranslations: (lang, data, skip_existing_key = true) => {
      store.update((map) => {
        for (const key of Object.keys(data)) {
          if (key in map === false) {
            map[key] = {};
            map[key][lang] = data[key];
            continue;
          }

          if (lang in map[key] && skip_existing_key) {
            // skip.
            continue;
          }

          map[key][lang] = data[key];
        }
        return map;
      });
    },

    clear: () => {
      store.set({});
    },
  };
}

export const translations = createMapStore();
