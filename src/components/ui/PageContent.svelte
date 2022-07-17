<!----------------------------------------------------------------------------
  src/components/ui/PageContent.svelte

  Base element of the page contents.
 !---------------------------------------------------------------------------->
<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div class="container" in:fly={{ x: 100 }}>
  <slot />
</div>

<style lang="scss">
</style>
