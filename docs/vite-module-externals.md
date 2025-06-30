# Vite Module Externals Configuration

This document describes how to configure Vite to externalize React and ReactDOM when building Adminizer modules, preventing runtime module resolution errors in the browser.

## Issue

When loading the built `GlobalSettings.js` module in the browser, you may see:
```text
Uncaught (in promise) TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../".
```
This happens because `react` and `react-dom` are marked as external but not provided as global variables in ES modules.

## Solution

1. Install the externals plugin:
   ```bash
   npm install -D vite-plugin-externals
   ```
2. Update `vite.config.ts`:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { viteExternalsPlugin } from 'vite-plugin-externals';
   import path from 'path';

   export default defineConfig({
     // Ensure production-only code paths by replacing process.env.NODE_ENV
     define: {
       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
     },
     build: {
       outDir: 'dist/modules',
       emptyOutDir: true,
       lib: {
         entry: {
           GlobalSettings: path.resolve(__dirname, 'app-base/adminizer/modules/GlobalSettings.tsx'),
         },
         formats: ['es'],
       },
       rollupOptions: {
         external: ['react', 'react-dom', '@inertiajs/react'],
         output: {
           entryFileNames: '[name].js',
         },
       },
     },
     plugins: [
       react(),
       viteExternalsPlugin({
         react: 'React',
         'react-dom': 'ReactDOM',
       }),
     ],
     resolve: {
       extensions: ['.js', '.ts', '.tsx'],
     },
   });
   ```
3. Ensure that your host page includes React and ReactDOM as global scripts:
   ```html
   <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
   <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
   ```

## Result

After rebuilding, the generated module file will use the global `React` and `ReactDOM` variables instead of imports, and will load without module resolution errors.
