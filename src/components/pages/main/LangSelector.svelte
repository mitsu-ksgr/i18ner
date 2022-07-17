<!----------------------------------------------------------------------------
  src/components/ui/LangSelector.svelte

  Language selector


  * Props
  - langs ... selected language list.

 !---------------------------------------------------------------------------->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import {
    Accordion,
    AccordionItem,
    Container,
    Button,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from 'sveltestrap';

  import i18n from '@/lib/i18n.ts';
  import { langs } from '@/stores/languages.ts';

  let selected = null;
  let in_value = '';
  let modal_open = false;

  function onClickAddButton() {
    in_value = in_value.trim();
    if (!in_value) return;

    langs.add(in_value);
    in_value = '';
  }

  function onClickSpan(lang) {
    selected = selected === lang ? null : lang;
  }

  function removeSelectedLang() {
    langs.remove(selected);
    // TODO: remove lang from translations
    selected = null;
    toggleModal();
  }

  function toggleModal() {
    modal_open = !modal_open;
  }

  function handleKeypress(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onClickAddButton();
    }
  }
</script>

<Accordion stayOpen class={$$props.class}>
  <AccordionItem>
    <div slot="header">
      <slot>{i18n.t('page/translations/languages')}</slot>
    </div>

    <Container>
      <div class="d-flex flex-wrap selected-langs mb-3">
        {#each $langs as lang}
          <span
            class="span-lang border border-3 rounded-pill px-2 pb-1 m-1"
            class:selected={lang === selected}
            on:click={() => onClickSpan(lang)}
            transition:fade={{ duration: 250 }}
          >
            {lang}
          </span>
        {/each}
      </div>

      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <InputGroup sm>
            <!--
              FromGroup (from sveltestrap) will add mb-3 to the class automatically.
              so, I use plain bootstrap.
            -->
            <div class="form-floating flex-grow-1">
              <input
                name="add-new-lang"
                type="text"
                class="form-control"
                placeholder="add new language"
                bind:value={in_value}
                on:keypress={handleKeypress}
              />
              <label for="add-new-lang">
                {i18n.t('page/translations/add-new-language')}：
              </label>
            </div>
            <Button outline on:click={onClickAddButton}>
              {i18n.t('ui/add')}
            </Button>
          </InputGroup>
        </div>

        <div>
          {#if selected !== null}
            <div transition:fade={{ duration: 250 }}>
              <Button outline class="me-3" on:click={toggleModal}>
                {i18n.t('ui/remove')}
              </Button>
            </div>
          {/if}
        </div>
      </div>
    </Container>
  </AccordionItem>
</Accordion>

<Modal isOpen={modal_open} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>
    {i18n.t('page/translations/remove-language')}: {selected} ?
  </ModalHeader>

  <ModalBody>
    {@html i18n.t('page/translations/remove-lang-description', { selected })}
  </ModalBody>

  <ModalFooter>
    <Button outline color="warning" on:click={removeSelectedLang}>
      {i18n.t('ui/remove')}
    </Button>
    <Button outline color="secondary" on:click={toggleModal}>
      {i18n.t('ui/cancel')}
    </Button>
  </ModalFooter>
</Modal>

<style lang="scss">
  .selected-langs {
    span.selected {
      background-color: lightskyblue;
    }
  }
</style>
