/*----------------------------------------------------------------------------
  src/lib/i18n.ts

  i18n support.
 *---------------------------------------------------------------------------*/
import { derived, get } from 'svelte/store';
import en from '@/assets/json/locales/en.json';
import ja from '@/assets/json/locales/ja.json';

import { uilang } from '@/stores/configs.ts';

const dict = {
  en: en,
  ja: ja,
};

const i18n = (() => {
  const locale = derived(uilang, ($uilang) => $uilang);

  return {
    t: (key: string, vars = {}) => {
      const loc = get(locale);

      do {
        if (dict[loc] === undefined) break;
        if (dict[loc][key] === undefined) break;

        const txt = dict[loc][key];

        // expand variables
        if (vars && Object.keys(vars).length > 0) {
          const keys = Object.keys(vars);
          const values = Object.values(vars);
          return Function(...keys, `return \`${txt}\`;`)(...values);
        }

        return txt;
      } while (0); // eslint-disable-line no-constant-condition

      console.warn(`i18n#t translation not found: ${loc}/${key}`);
      return '';
    },
  };
})();

export default i18n;
