import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist/modules',
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: {
        GlobalSettings: path.resolve(__dirname, 'app-base/adminizer/modules/GlobalSettings.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Prevent bundling of peer dependencies
      external: ['react', 'react-dom', '@inertiajs/react', '@inertiajs/react', 'lucide-react'],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    // Use classic JSX runtime to emit React.createElement calls, relying on external React global
    react({
      jsxRuntime: 'classic'
    }),
    viteExternalsPlugin({
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@inertiajs/react': 'InertiajsReact',
        'lucide-react':'LucideReact',
        '@/components/ui/avatar': 'UIComponents',
        '@/components/ui/badge': 'UIComponents',
        '@/components/ui/breadcrumb': 'UIComponents',
        '@/components/ui/button': 'UIComponents',
        '@/components/ui/calendar': 'UIComponents',
        '@/components/ui/card': 'UIComponents',
        '@/components/ui/checkbox': 'UIComponents',
        '@/components/ui/collapsible': 'UIComponents',
        '@/components/ui/command': 'UIComponents',
        '@/components/ui/context-menu': 'UIComponents',
        '@/components/ui/dialog': 'UIComponents',
        '@/components/ui/dialog-stack': 'UIComponents',
        '@/components/ui/dropdown-menu': 'UIComponents',
        '@/components/ui/input': 'UIComponents',
        '@/components/ui/label': 'UIComponents',
        '@/components/ui/menubar': 'UIComponents',
        '@/components/ui/pagination': 'UIComponents',
        '@/components/ui/popover': 'UIComponents',
        '@/components/ui/select': 'UIComponents',
        '@/components/ui/separator': 'UIComponents',
        '@/components/ui/sheet': 'UIComponents',
        '@/components/ui/sidebar': 'UIComponents',
        '@/components/ui/skeleton': 'UIComponents',
        '@/components/ui/slider': 'UIComponents',
        '@/components/ui/sonner': 'UIComponents',
        '@/components/ui/switch': 'UIComponents',
        '@/components/ui/table': 'UIComponents',
        '@/components/ui/textarea': 'UIComponents',
        '@/components/ui/tooltip': 'UIComponents',
    }),
  ],
  // Replace process.env.NODE_ENV in the bundle for production-only code paths
  define: {
    // Polyfill process.env for client code and replace NODE_ENV
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app-base/adminizer')
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
});
