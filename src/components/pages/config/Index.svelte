<!----------------------------------------------------------------------------
  src/components/pages/config/Index.svelte

  ConfigPage
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { Container, Icon } from 'sveltestrap';
  import PageContent from '@/components/ui/PageContent.svelte';

  import i18n from '@/lib/i18n.ts';
  import { uilang } from '@/stores/configs.ts';

  const langs = [
    { key: 'en', name: 'English' },
    { key: 'ja', name: 'Japanese' },
  ];
</script>

<PageContent>
  <h3>
    <Icon name="gear" class="bi me-2" />
    {i18n.t('page/config/title')}
  </h3>

  <hr />

  <Container>
    <div class="mb-4">
      <h4>{i18n.t('page/config/ui-language')}</h4>
      <div class="mb-3">
        <select
          class="form-select"
          aria-label="Select box for languages"
          bind:value={$uilang}
        >
          {#each langs as lang}
            <option value={lang.key}>{lang.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </Container>
</PageContent>

<style lang="scss">
</style>
