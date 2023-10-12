// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// "@mdx-js/loader": "^2.3.0",
// "@mdx-js/mdx": "^2.3.0",
// "@mdx-js/react": "^2.3.0",
// "monaco-editor": "^0.38.0",
// "monaco-editor-webpack-plugin": "^7.0.1",

module.exports = {
    language: 'react',
    entry: './src/index.js',
    // bundleAnalyzer: true,
    chainWebpack: chain => {
        // chain.module
        //     .rule('mdx')
        //     .test(/\.mdx$/)
        //         .use('babel-loader')
        //             .loader('babel-loader')
        //             .end()
        //         .use('@mdx-js/loader')
        //             .loader(require.resolve('@mdx-js/loader'))
        //             .options(
        //                 {
        //                     jsx: true,
        //                     providerImportSource: '@mdx-js/react',
        //                 }
        //             )
        chain.module
          .rule('md')
          .test(/\.md$/)
            .use('babel-loader')
              .loader('babel-loader')
              .options({
                presets: ['@babel/preset-env', '@babel/preset-react'],
                // parserOpts: {
                //   allowImportExportEverywhere: true
                // },
              })
              .end()
            .use('mtui-markdown-loader')
              .loader(require.resolve('../mtui-markdown-loader'))
              .options({
                babelConfig: {
                  parserOpts: {
                    allowImportExportEverywhere: true
                  },
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              })
              .end()

        // chain.plugin('monaco').use(MonacoWebpackPlugin, [
        //     {
        //       languages: ['html'],
        //       features: ['!hover', '!colorPicker']
        //     }
        //   ])
        
        chain.optimization
          .minimize(true)
          .runtimeChunk({ name: entry => `runtime-${entry.name}` })
          .splitChunks({
            chunks: 'all',
            // 表示新分离出的 chunk 必须大于等于 minSize，默认为 3000，约 3kb。
            minSize: 3000,
            // 表示一个模块至少应被 minChunks 个 chunk 所包含才能分割。默认为 1
            minChunks: 1,
            // 表示按需加载文件时，并行请求的最大数目。默认为 1
            maxAsyncRequests: 5,
            cacheGroups: {
              vendor: {
                name: 'chunk-vendors',
                // 需要打包到一起的模块
                test: /[\\/]node_modules[\\/]/, 
                minChunks: 1,
                maxAsyncRequests: 5,
                // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                minSize: 3000,
                // 权重（越大越高
                priority: -10, 
                reuseExistingChunk: true, 
              },
              common: {
                name: 'chunk-common',
                // 被多少模块共享,在分割之前模块的被引用次数
                minChunks: 2,
                priority: -20,
                chunks: 'initial',
                reuseExistingChunk: true,
              },
            }
          })
    }
}