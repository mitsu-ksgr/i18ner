/*----------------------------------------------------------------------------
  src/lib/env.ts

  Environment variables.
  see also: vite.config.ts
 *---------------------------------------------------------------------------*/

const env = {
  // env
  Mode: import.meta.env.Mode,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  isSSR: import.meta.env.SSR,

  // Application info
  AppName: __APP_NAME__,
  AppVersion: __APP_VERSION__,
  GitHubLink: __GITHUB_LINK__,
};

export default env;
