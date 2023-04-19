import { defineConfig } from 'tsup';
import stylePlugin from 'esbuild-style-plugin';

export default defineConfig((options) => {
  return {
    entry: ['src/index.tsx'],
    splitting: true,
    sourcemap: true,
    dts: true,
    minify: !options.watch,
    outDir: 'build',
    esbuildPlugins: [
      stylePlugin({
        postcss: {
          plugins: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nested'),
          ],
        },
      }),
    ],
    external: ['react', 'react-dom', 'react-router-dom', 'react-router'],
  };
});
