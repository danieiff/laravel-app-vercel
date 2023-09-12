import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import { exec } from 'node:child_process'
import chokidar from 'chokidar'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      ssr: 'resources/js/ssr.js',
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false
        }
      }
    })
  ],
  define: {
    // __VUE_OPTIONS_API__: false // must be true for vue mixin (ziggy-js needs) to work.
  },
  resolve: {
    alias: {
      'ziggy-js': './vendor/tightenco/ziggy/dist/index.m.js'
    }
  },
  server: {
    hmr: {
      host: 'localhost'
    },
  }
})

if (process.env.NODE_ENV === 'development') {
  let command = function () {
    exec(
      'php artisan ziggy:generate resources/js/ziggy.js',
      (_error, stdout, _stderr) => console.log(stdout)
    )
  }

  command()

  let files = ['routes/**/*.php']
  let watcher = chokidar.watch(files)

  // Event listeners.
  watcher.on('change', (path) => {
    console.log(`${path}`)
    command()
  })
}
