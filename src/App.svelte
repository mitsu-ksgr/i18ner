<!----------------------------------------------------------------------------
  src/App.svelte

  App.svelte
 !---------------------------------------------------------------------------->
<script lang="ts">
  import Router from 'svelte-spa-router';
  import Header from '@/components/ui/Header.svelte';
  import Sidebar from '@/components/ui/Sidebar.svelte';
  import { routes } from '@/routes';

  document.body.classList.add('h-100');
  document.getElementById('app').classList.add('h-100');
</script>

<Header />

<main class="d-flex flex-row w-100 h-100" style="padding-top: 65px;">
  <Sidebar />

  <div class="overflow-auto w-100 h-100" style="padding: 2rem 0 10rem;">
    <Router {routes} />
  </div>
</main>

<style lang="scss">
  :global(body) {
    height: 100%;
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    height: 100%;
  }
</style>
