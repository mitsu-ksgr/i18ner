/*----------------------------------------------------------------------------
  src/stores/modalState.js

  Manage the modal state
 *---------------------------------------------------------------------------*/
import { writable } from 'svelte/store';

export function createModalState() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    set,
    show: () => set(true),
    close: () => set(false),
  };
}
