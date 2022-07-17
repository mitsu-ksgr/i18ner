<!----------------------------------------------------------------------------
  src/components/ui/Header.svelte

  Header.svelte
 !---------------------------------------------------------------------------->
<script lang="ts">
  import {
    Collapse,
    Icon,
    Nav,
    NavItem,
    Navbar,
    NavbarToggler,
  } from 'sveltestrap';

  import env from '@/lib/env.ts';

  let isOpen = false;
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar class="shadow mb-3" color="dark" dark fixed="top" expand="md">
  <div class="navbar-brand">
    <Icon name="journals" class="me-2" />
    <span>
      {env.AppName}
    </span>
    <span class="ms-3 fw-light fs-6">
      {env.AppVersion}
    </span>
  </div>

  <NavbarToggler on:click={() => (isOpen = !isOpen)} />

  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto">
      <NavItem>
        <a
          href={env.GitHubLink}
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link link-light"
        >
          GitHub
        </a>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<style lang="scss">
</style>
