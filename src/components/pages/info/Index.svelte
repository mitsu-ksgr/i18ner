<!----------------------------------------------------------------------------
  src/components/pages/info/Index.svelte

  InformationPage
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { Container, Icon } from 'sveltestrap';
  import PageContent from '@/components/ui/PageContent.svelte';
  import env from '@/lib/env.ts';
  import i18n from '@/lib/i18n.ts';
</script>

<PageContent>
  <h3>
    <Icon name="info-square" class="bi me-2" />
    {i18n.t('page/info/title')}
  </h3>

  <hr />

  <Container>
    <dl class="row">
      <dt class="col-sm-3">Version</dt>
      <dd class="col-sm-9">{env.AppName} ver{env.AppVersion}</dd>

      <dt class="col-sm-3">GitHub</dt>
      <dd class="col-sm-9">
        <a href={env.GitHubLink} target="_blank" rel="noopener noreferrer">
          {env.GitHubLink}
        </a>
      </dd>
    </dl>
  </Container>
</PageContent>

<style lang="scss">
</style>
