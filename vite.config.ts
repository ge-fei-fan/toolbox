import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import electron from 'vite-plugin-electron'
import renderer  from 'vite-plugin-electron-renderer'


export default defineConfig({
    plugins: [
        vue(),
        electron({
          entry: 'electron/main/index.ts',
        }),
        renderer(),
        vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    //base:'/vue3-music/',
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3002,
    }
})
