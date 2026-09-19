import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// For GitHub Pages project sites (https://<user>.github.io/<repo>/), assets must
// be served under /<repo>/. We set base automatically in CI (GITHUB_ACTIONS=true),
// so local dev keeps using "/" and nothing changes for local usage.
export default defineConfig(({ mode }) => {
  const isPagesDeploy = process.env.GITHUB_ACTIONS === 'true';

  return {
    plugins: [react(), tailwindcss()],
    base: isPagesDeploy ? '/birthday-website-template/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
