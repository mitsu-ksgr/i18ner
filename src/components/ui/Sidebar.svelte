<!----------------------------------------------------------------------------
  src/components/ui/Sidebar.svelte

  Sidebar
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { Nav, NavItem, NavLink, Icon } from 'sveltestrap';
  import { location } from 'svelte-spa-router';

  import env from '@/lib/env.ts';

  function style(item, current_location) {
    return item['link'] === current_location ? 'active' : 'link-dark';
  }

  let items = [
    {
      title: 'Translation',
      icon: 'translate',
      link: '/',
    },
    {
      title: 'Upload',
      icon: 'upload',
      link: '/upload',
    },
    {
      title: 'Download',
      icon: 'download',
      link: '/download',
    },
    {
      title: 'Config',
      icon: 'gear',
      link: '/config',
    },
    {
      title: 'Info',
      icon: 'info-square',
      link: '/info',
    },
  ];

  if (env.isDevelopment) {
    items.push({
      title: 'Debug',
      icon: 'bug',
      link: '/debug',
    });
  }
</script>

<div class="d-flex flex-column p-3 h-100 bg-light" style="width: 280px;">
  <Nav pills class="flex-column mb-auto">
    {#each items as item}
      <NavItem>
        <NavLink
          href="#{item['link']}"
          class={style(item, $location)}
          aria-current="page"
        >
          <Icon name={item['icon']} class="bi me-2" />
          {item['title']}
        </NavLink>
      </NavItem>
    {/each}
  </Nav>
</div>

<style lang="scss">
</style>
