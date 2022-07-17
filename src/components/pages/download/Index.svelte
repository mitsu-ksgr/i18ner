<!----------------------------------------------------------------------------
  src/components/pages/download/Index.svelte

  Download Page
 !---------------------------------------------------------------------------->
<script lang="ts">
  import JSZip from 'jszip';

  import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Container,
    Icon,
    Input,
  } from 'sveltestrap';
  import PageContent from '@/components/ui/PageContent.svelte';

  import i18n from '@/lib/i18n.ts';
  import { downloadBlob } from '@/lib/downloader.ts';
  import { translations } from '@/stores/translations.ts';
  import { langs } from '@/stores/languages.ts';

  //---------------------------------------------------------------------------
  // Variables
  let ignore_missing_data_keys = false;
  let enable_compression = false;
  let indent = 4;
  let filename = 'i18ner-locales.zip';

  //---------------------------------------------------------------------------
  // Reactive
  $: as_json = (lang) => {
    return JSON.stringify(
      $translations.getLangTranslations(lang, ignore_missing_data_keys),
      null,
      indent,
    );
  };

  //---------------------------------------------------------------------------
  // Functions / Events
  function btnDownload() {
    let zip = new JSZip();
    $langs.forEach((lang) => {
      zip.file(`${lang}.json`, as_json(lang));
    });

    zip
      .generateAsync({
        type: 'blob',
        compression: enable_compression ? 'DEFLATE' : 'STORE',
      })
      .then((content) => {
        downloadBlob(filename, content);
      });
  }
</script>

<PageContent>
  <h3>
    <Icon name="download" class="bi me-2" />
    {i18n.t('page/download/title')}
  </h3>

  <hr />

  <Container>
    <h4 class="mb-3">{i18n.t('page/download/output-config')}</h4>

    <div class="mb-4">
      <h5>{i18n.t('page/download/contents')}</h5>
      <div class="mb-3">
        <Input
          type="switch"
          label={i18n.t('page/download/ignore-flag-label')}
          bind:checked={ignore_missing_data_keys}
        />
      </div>
    </div>

    <div class="mb-4">
      <h5>{i18n.t('page/download/outputs')}</h5>
      <div class="mb-3 row">
        <label for="indent" class="col-sm-4 col-form-label">
          {i18n.t('page/download/indent')}
        </label>
        <div class="col-sm-8">
          <Input
            id="indent"
            type="number"
            min={0}
            max={10}
            bind:value={indent}
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="filename" class="col-sm-4 col-form-label">
          {i18n.t('page/download/filename')}
        </label>
        <div class="col-sm-8">
          <Input id="filename" type="text" bind:value={filename} />
        </div>
      </div>

      <div class="mb-3">
        <Input
          type="switch"
          label={i18n.t('page/download/compression-flag-label')}
          bind:checked={enable_compression}
        />
      </div>
    </div>
  </Container>

  <hr />

  {#if $langs.length > 0}
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>{i18n.t('page/download/preview')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Accordion class="mb-3">
            {#each $langs as lang}
              <AccordionItem header={lang}>
                <pre><code>{as_json(lang)}</code></pre>
              </AccordionItem>
            {/each}
          </Accordion>
        </CardBody>
      </Card>
    </Container>

    <hr />

    <Container>
      <Button outline primary on:click={btnDownload}>
        {i18n.t('page/download/download')}
      </Button>
    </Container>
  {:else}
    <Container>
      <p>{i18n.t('page/download/no-translations')}</p>
    </Container>
  {/if}
</PageContent>

<style lang="scss">
  pre {
    padding: 1em;
    background-color: whitesmoke;
    border-radius: 7px;
  }
</style>
