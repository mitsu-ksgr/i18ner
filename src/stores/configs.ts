/*----------------------------------------------------------------------------
  src/stores/configs.ts

  Configs.

  - working data
  - UI Langs
 *---------------------------------------------------------------------------*/
import { createLocalStorageStore } from '@/lib/local_storage_store.ts';

export const uilang = createLocalStorageStore('uilang', 'en');
