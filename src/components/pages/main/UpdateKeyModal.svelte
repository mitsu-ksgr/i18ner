<!----------------------------------------------------------------------------
  src/components/ui/UpdateKeyModal.svelte

  UpdateKey Modal.

  * Props
  - is_open ... Modal open/close state.
  - keys ... Keys currently in use.
  - target ... Update target key.

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
  export let target = '';

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

  function updateKey() {
    // Same
    if (target === value) {
      toggleModal();
      return;
    }

    // validation.
    errors = [];
    if (value === '') {
      errors.push('Key is empty.');
    }
    if (keys.includes(value)) {
      errors.push(`Key '${value}' is already exists`);
    }
    if (errors.length > 0) return;

    // Fire event.
    dispatch('updateKey', {
      oldkey: target,
      newkey: value,
    });
    toggleModal();
    value = '';
  }

  function handleOpening() {
    value = target;
    elem_input.focus();
  }

  function handleKeypress(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      updateKey();
    }
  }
</script>

<Modal isOpen={is_open} toggle={toggleModal} on:opening={handleOpening}>
  <ModalHeader toggle={toggleModal}>
    {i18n.t('page/translations/edit-key')}
  </ModalHeader>

  <ModalBody>
    <div class="form-floating">
      <input
        type="text"
        id="edit-key"
        class="form-control"
        placeholder="Enter the new key"
        bind:this={elem_input}
        bind:value
        on:keypress={handleKeypress}
      />
      <label for="edit-key">{target}</label>
    </div>

    {#if errors.length > 0}
      <div>
        {#each errors as error}
          <p class="text-danger">{error}</p>
        {/each}
      </div>
    {/if}
  </ModalBody>

  <ModalFooter>
    <Button outline color="primary" on:click={updateKey}>
      {i18n.t('ui/update')}
    </Button>
    <Button outline color="secondary" on:click={toggleModal}>
      {i18n.t('ui/cancel')}
    </Button>
  </ModalFooter>
</Modal>
