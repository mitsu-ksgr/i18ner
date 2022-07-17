<!----------------------------------------------------------------------------
  src/components/pages/upload/Index.svelte

  Upload page
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { Button, Container, Icon, Input } from 'sveltestrap';
  import PageContent from '@/components/ui/PageContent.svelte';

  import i18n from '@/lib/i18n.ts';
  import { translations } from '@/stores/translations.ts';

  //---------------------------------------------------------------------------
  // Variables
  let files = null;
  let replace_data = false;
  let skip_existing_key = false;
  let notifs = [];

  //---------------------------------------------------------------------------
  // Events / Functions
  function loadFile(file) {
    const lang = file.name.replace(/\.[^/.]+$/, '');
    const reader = new FileReader();
    reader.readAsText(file);

    return new Promise(
      (resolve) =>
        (reader.onload = (e) => {
          console.log(`onLoadFile: File=${file.name}, Lang=${lang}`);

          try {
            const data = JSON.parse(e.target.result);

            if (replace_data) {
              translations.replaceTranslations(lang, data);
            } else {
              translations.mergeTranslations(lang, data, skip_existing_key);
            }

            notifs = [
              ...notifs,
              {
                class: 'alert-success',
                filename: file.name,
                message: 'Load succeeded.',
              },
            ];
          } catch (err) {
            notifs = [
              ...notifs,
              {
                class: 'alert-danger',
                filename: file.name,
                message: `${err.name}: ${err.message}`,
              },
            ];
          }

          resolve();
        }),
    );
  }

  async function btnLoad() {
    if (files === null || files.length === 0) return;

    notifs = [];
    for (let i = 0; i < files.length; ++i) {
      await loadFile(files[i]);
    }
  }
</script>

<PageContent>
  <h3>
    <Icon name="upload" class="bi me-2" />
    {i18n.t('page/upload/title')}
  </h3>

  <hr />

  <Container>
    <div class="mb-3">
      <label for="files" class="form-label">
        {i18n.t('page/upload/locale-files')}
      </label>
      <input
        class="form-control"
        type="file"
        id="files"
        accept="application/json"
        multiple
        bind:files
      />
    </div>

    <div class="mb-3">
      <Input
        type="switch"
        label={i18n.t('page/upload/replace-flag-label')}
        bind:checked={replace_data}
      />
      <p class="fw-light ms-3">
        {i18n.t('page/upload/replace-flag-note')}
      </p>
    </div>

    {#if !replace_data}
      <div class="mb-3">
        <Input
          type="switch"
          label={i18n.t('page/upload/skip-flag-label')}
          bind:checked={skip_existing_key}
        />
        <p class="fw-light ms-3">
          {i18n.t('page/upload/replace-flag-note')}
        </p>
      </div>
    {/if}

    {#if files && files.length > 0}
      <div class="mb-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">{i18n.t('page/upload/th-filename')}</th>
              <th scope="col">{i18n.t('page/upload/th-size')}</th>
              <th scope="col">{i18n.t('page/upload/th-type')}</th>
            </tr>
          </thead>
          <tbody>
            {#each files as file}
              <tr>
                <td>{file.name}</td>
                <td>{file.size} Bytes</td>
                <td>{file.type}</td>
              </tr>
            {/each}
          </tbody>
        </table>

        <Button outline class="me-3" on:click={btnLoad}>
          {i18n.t('ui/load')}
        </Button>
      </div>
    {/if}
  </Container>

  <hr />

  {#if notifs.length > 0}
    <Container>
      {#each notifs as notif}
        <div class="alert {notif.class}" role="alert">
          <div class="row">
            <div class="col-2">{notif.filename}</div>
            <div class="col-10">{notif.message}</div>
          </div>
        </div>
      {/each}
    </Container>
  {/if}
</PageContent>

<style lang="scss">
</style>
