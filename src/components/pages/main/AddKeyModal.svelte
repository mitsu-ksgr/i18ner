<!----------------------------------------------------------------------------
  src/components/ui/AddKeyModal.svelte

  AddNewKey Modal.

  * Props
  - is_open ... Modal open/close state.
  - keys ... Keys currently in use.

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
  export let keys = [];

  //---------------------------------------------------------------------------
  // Variables
  const dispatch = createEventDispatcher();
  let elem_input;
  let value = '';
  let errors = [];

  //---------------------------------------------------------------------------
  // Functions
  function toggleModal() {
    is_open = !is_open;
  }

  function addKey() {
    // validation.
    errors = [];
    if (keys.includes(value)) {
      errors.push(`Key '${value}' is already exists`);
    }
    if (errors.length > 0) return;

    // Fire event.
    dispatch('addNewKey', { key: value });
    toggleModal();
    value = '';
  }

  function handleOpening() {
    elem_input.focus();
  }

  function handleKeypress(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      addKey();
    }
  }
</script>

<Modal isOpen={is_open} toggle={toggleModal} on:opening={handleOpening}>
  <ModalHeader toggle={toggleModal}>
    {i18n.t('page/translations/add-new-key')}
  </ModalHeader>

  <ModalBody>
    <input
      type="text"
      class="form-control"
      placeholder="Enter the new key"
      bind:this={elem_input}
      bind:value
      on:keypress={handleKeypress}
    />

    {#if errors.length > 0}
      <div>
        {#each errors as error}
          <p class="text-danger">{error}</p>
        {/each}
      </div>
    {/if}
  </ModalBody>

  <ModalFooter>
    <Button outline color="primary" on:click={addKey}>
      {i18n.t('ui/add')}
    </Button>
    <Button outline color="secondary" on:click={toggleModal}>
      {i18n.t('ui/cancel')}
    </Button>
  </ModalFooter>
</Modal>
