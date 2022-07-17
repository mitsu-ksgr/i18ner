<!----------------------------------------------------------------------------
  src/components/ui/RemoveKeyModal.svelte

  Remove key Modal.

  * Props
  - is_open ... Modal open/close state.
  - target ... Target key.

 !---------------------------------------------------------------------------->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from 'sveltestrap';

  import i18n from '@/lib/i18n.ts';

  //---------------------------------------------------------------------------
  // Props
  export let is_open = false;
  export let target = '';

  //---------------------------------------------------------------------------
  // Variables
  const dispatch = createEventDispatcher();

  //---------------------------------------------------------------------------
  // Functions
  function toggleModal() {
    is_open = !is_open;
  }

  function removeKey() {
    dispatch('removeKey', { key: target });
    toggleModal();
  }
</script>

<Modal isOpen={is_open} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>
    {i18n.t('page/translations/remove-key')}
  </ModalHeader>

  <ModalBody>
    {@html i18n.t('page/translations/remove-description', { target })}
  </ModalBody>

  <ModalFooter>
    <Button outline color="primary" on:click={removeKey}>
      {i18n.t('ui/remove')}
    </Button>
    <Button outline color="secondary" on:click={toggleModal}>
      {i18n.t('ui/cancel')}
    </Button>
  </ModalFooter>
</Modal>
