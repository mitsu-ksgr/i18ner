<!----------------------------------------------------------------------------
  src/components/pages/debug/Index.svelte

  Debug page
 !---------------------------------------------------------------------------->
<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Button,
    Container,
    Icon,
  } from 'sveltestrap';
  import PageContent from '@/components/ui/PageContent.svelte';

  import { translations } from '@/stores/translations.ts';
  import { langs } from '@/stores/languages.ts';

  function addDummyKeys(idx, count) {
    for (let i = idx; i <= idx + count; ++i) {
      const id = String(i).padStart(3, '0');
      const key = `debug-key${id}`;
      translations.addKey(key);
      translations.addTranslation(key, 'en', `Key ${id}`);
      translations.addTranslation(key, 'ja', `キー ${id}`);
    }
  }

  function addMissingKeys() {
    translations.addTranslation('debug-mkey', 'en', 'ok');
    translations.addTranslation('debug-mkey', 'ja', '');
  }
</script>

<PageContent>
  <h3>
    <Icon name="bug" class="bi me-2" />
    Debug
  </h3>

  <hr />

  <Container>
    <div class="d-flex align-items-center mb-3">
      <Button outline dark class="me-3" on:click={() => addDummyKeys(1, 15)}>
        Add dummy keys
      </Button>
      <Button outline dark class="me-3" on:click={() => addMissingKeys()}>
        Add key without translation data
      </Button>
      <Button outline dark class="me-3" on:click={() => translations.clear()}>
        Clear all translations
      </Button>
    </div>
  </Container>

  <hr />

  <Container>
    <h5>row data</h5>
    <Accordion class="mb-3">
      <AccordionItem header="langs">
        <pre><code>{JSON.stringify($langs, null, 4)}</code></pre>
      </AccordionItem>

      <AccordionItem header="translations">
        <pre><code>{JSON.stringify($translations.dumpAll(), null, 4)}</code
          ></pre>
      </AccordionItem>
    </Accordion>
  </Container>
</PageContent>

<style lang="scss">
  pre {
    padding: 1em;
    background-color: whitesmoke;
    border-radius: 7px;
  }
</style>
