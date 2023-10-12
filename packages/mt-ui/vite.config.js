import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import typescript from '@rollup/plugin-typescript'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import dts from 'vite-plugin-dts'

function resolve(str) {
    return path.resolve(__dirname, str);
}

export default defineConfig({
    build: {
        outDir: 'lib',
        // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
        cssTarget: 'chrome61',
        lib: {
            entry: resolve('components/index.ts'),
            name: 'mt-ui',
            fileName: 'mt-ui',
        },
        cssCodeSplit: true,
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'react',
                    'react-dom': 'react-dom'
                }
            }
        }
    },
    server: {
        hmr: true
    },
    plugins: [
        dts({
            rollupTypes: true,
        }),
        react(),
        tailwindcss,
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), "icons/svg")],
            symbolId: 'icon-[name]',
        }),
        typescript({
            target: 'es5',
            // rootDir: resolve(''),
            declaration: true,
            declarationDir: 'lib/types',
            exclude: resolve('node_modules/**'),
            allowSyntheticDefaultImports: true,
        }),
    ],
    resolve: {
        conditionNames: ['browser', 'import'],
        mainFields: ['module', 'main'],
        alias: {
            '@components': './components',
            '@constant': './constant.tsx',
            '@assets': "./assets",
            '@utils':'./utils.ts',
        }
    }
})