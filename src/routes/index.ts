/*----------------------------------------------------------------------------
  src/routes/index.ts

  Setup routing with svelte-spa-router

  @ref https://github.com/ItalyPaleAle/svelte-spa-router
 *---------------------------------------------------------------------------*/

import env from '@/lib/env.ts';

import MainPage from '@/components/pages/main/Index.svelte';
import UploadPage from '@/components/pages/upload/Index.svelte';
import DownloadPage from '@/components/pages/download/Index.svelte';
import ConfigPage from '@/components/pages/config/Index.svelte';
import InfoPage from '@/components/pages/info/Index.svelte';
import DebugPage from '@/components/pages/debug/Index.svelte';

const routes = {
  '/': MainPage,
  '/upload': UploadPage,
  '/download': DownloadPage,
  '/config': ConfigPage,
  '/info': InfoPage,
};

if (env.isDevelopment) {
  routes['/debug'] = DebugPage;
}

export { routes };
