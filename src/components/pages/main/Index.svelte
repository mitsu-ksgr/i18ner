<!----------------------------------------------------------------------------
  src/components/pages/main/MainPage.svelte

  MainPage
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { slide } from 'svelte/transition';
  import {
    Button,
    Container,
    Icon,
    FormGroup,
    Input,
    Row,
    Col,
  } from 'sveltestrap';

  import PageContent from '@/components/ui/PageContent.svelte';
  import LangSelector from './LangSelector.svelte';
  import AddKeyModal from './AddKeyModal.svelte';
  import RemoveKeyModal from './RemoveKeyModal.svelte';
  import UpdateKeyModal from './UpdateKeyModal.svelte';

  import i18n from '@/lib/i18n.ts';
  import { translations } from '@/stores/translations.ts';
  import { langs } from '@/stores/languages.ts';
  import { createModalState } from '@/stores/modal_state.ts';

  //---------------------------------------------------------------------------
  // Variables
  let filter = '';
  let show_incomplete_keys_only = false;

  //---------------------------------------------------------------------------
  // Reactive
  $: keys = (() => {
    let keys = $translations.keys;

    // filtering
    if (filter !== '') {
      keys = keys.filter((key) => key.includes(filter));
    }
    if (show_incomplete_keys_only) {
      keys = keys.filter((key) => {
        let trs = $translations.getTranslations(key);
        let is_incomplete = false;
        $langs.forEach((lang) => {
          if (lang in trs && trs[lang]) {
            // pass
          } else {
            is_incomplete = true;
          }
        });
        return is_incomplete;
      });
    }

    // Sort
    keys.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return keys;
  })();

  //---------------------------------------------------------------------------
  // Events

  // Add key
  let ms_addkey = createModalState();
  function onAddNewKey(event) {
    translations.addKey(event.detail.key);
  }

  // Remove key
  let ms_removekey = createModalState();
  let remove_target_key = '';
  function btnRemoveKey(key) {
    remove_target_key = key;
    ms_removekey.show();
  }
  function onRemoveKey(event) {
    translations.removeKey(event.detail.key);
  }

  // Edit key
  let ms_editkey = createModalState();
  let update_target_key = '';
  function btnEditKey(key) {
    update_target_key = key;
    ms_editkey.show();
  }
  function onUpdateKey(event) {
    translations.updateKey(event.detail.oldkey, event.detail.newkey);
  }

  // Update translations
  function updateTranslation(key, lang, value) {
    translations.addTranslation(key, lang, value);
  }
</script>

<PageContent>
  <h3>
    <Icon name="translate" class="bi me-2" />
    {i18n.t('page/translations/title')}
  </h3>

  <hr />

  <Container>
    <div class="d-flex align-items-center mb-3">
      <Button outline class="me-3" on:click={ms_addkey.show}>
        {i18n.t('page/translations/add-new-key')}
      </Button>
      <Input
        type="switch"
        label={i18n.t('page/translations/show-only-incomplete-keys')}
        bind:checked={show_incomplete_keys_only}
      />
    </div>

    <LangSelector class="mb-3">
      <span class="me-2">
        {i18n.t('page/translations/languages')}：
      </span>
      {#each $langs as lang}
        <span class="me-2">{lang}</span>
      {/each}
    </LangSelector>

    <FormGroup
      floating
      label={i18n.t('page/translations/key-filter')}
      class="mb-3"
    >
      <Input
        placeholder={i18n.t('page/translations/key-filter')}
        bind:value={filter}
      />
    </FormGroup>
  </Container>

  <hr />

  <Container fluid class="pt-3">
    {#if keys.length > 0}
      {#each keys as key}
        <div transition:slide|local>
          <Container
            class="mb-3 pb-3"
            style="border-bottom: 2px dashed lightgray;"
          >
            <Row>
              <Col><h5>{key}</h5></Col>
            </Row>
            <Row>
              <Col xs="2" class="d-flex align-items-center">
                <Button
                  outline
                  dark
                  class="me-3"
                  on:click={() => btnEditKey(key)}
                >
                  <Icon name="pencil" />
                </Button>
                <Button outline dark on:click={() => btnRemoveKey(key)}>
                  <Icon name="trash" />
                </Button>
              </Col>

              <Col xs="10">
                <Container sm>
                  {#each $langs as lang}
                    <div class="input-group input-group-sm mb-1">
                      <span class="input-group-text" style="min-width: 3em;">
                        {lang}
                      </span>
                      <textarea
                        class="form-control"
                        aria-label={lang}
                        on:change={(event) =>
                          updateTranslation(key, lang, event.target.value)}
                        >{$translations.getTranslation(key, lang)}</textarea
                      >
                    </div>
                  {/each}
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      {/each}
    {:else}
      <p>{i18n.t('page/translations/p-no-keys')}</p>
      <p>{@html i18n.t('page/translations/p-add-key')}</p>
    {/if}
  </Container>

  <Container class="d-flex flex-row-reverse">
    <Button outline class="me-3" on:click={ms_addkey.show}>
      {i18n.t('page/translations/add-new-key')}
    </Button>
  </Container>
</PageContent>

<AddKeyModal
  keys={$translations.keys}
  bind:is_open={$ms_addkey}
  on:addNewKey={onAddNewKey}
/>

<RemoveKeyModal
  target={remove_target_key}
  bind:is_open={$ms_removekey}
  on:removeKey={onRemoveKey}
/>

<UpdateKeyModal
  keys={$translations.keys}
  target={update_target_key}
  bind:is_open={$ms_editkey}
  on:updateKey={onUpdateKey}
/>

<style lang="scss">
</style>
