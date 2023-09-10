import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
    server: {
        hmr: true
    },
    plugins: [
        react(),
        tailwindcss,
    ],
    resolve: {
        alias: {
            '@components': './components',
            '@constant': './constant.tsx',
            '@assets': "./assets",
            '@utils':'./utils.ts',
        }
    }
})