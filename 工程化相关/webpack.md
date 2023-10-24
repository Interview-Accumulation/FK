## Webpack
[参考1](https://juejin.cn/post/6844904094281236487)
[参考2](https://juejin.cn/post/7002839760792190989)
[面试题1](https://juejin.cn/post/7023242274876162084)
### 核心概念
- entry（入口），提示webpack从哪里开始构建依赖图
- output（输出），告诉webpack在哪里输出构建后的文件
- loader（加载器）
- plugins（插件）
- mode（模式）

```js
module.exports = {
    //入口
    entry: './src/index.js',
    //输出
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
        // loader配置
        ]
    },
    plugins: [
        // plugins配置
    ],
    // 模式 development/production
    mode: 'development'
}
```

### loader
webpack本身只能识别js和json资源，不能识别其他资源，所以需要loader来处理其他资源，将其转化为webpack能处理的内容。loader本身是一个函数，接受源文件作为参数，返回转换的结果

### plugins
loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，包括打包优化、资源管理、注入环境变量等

### 资源处理
```js
module.exports = {
    //入口
    entry: './src/index.js',
    //输出
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader配置
            {
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: [
                    "style-loader", // 动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容
                    "css-loader" // 将 Css 文件编译成 Webpack 能识别的模块
                    ],
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader" //将 Less 文件编译成 Css 文件
                ],
            },
            { // 处理图片资源
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb 以下的图片会被转化成 base64 格式
                    }
                }
            },
            { // 处理字体资源
                test:  /\.(ttf|woff2?|map4|map3|avi)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:8][ext][query]",
                },
            },
        ]
    },
    plugins: [
        // plugins配置
        // eslint

    ],
    // 模式 development/production
    mode: 'development'
}
```
#### 样式资源
- css资源
  - css-loader：将css文件转换为commonjs模块，内容是样式字符串
  - style-loader：将样式字符串插入到html的head标签中
  - loader的执行顺序是从右到左，从下到上
- less资源
  - less-loader：将less文件编译成css文件
  - css-loader
  - style-loader
- sass/scss资源
  - sass-loader：将sass/scss文件编译成css文件
  - css-loader
  - style-loader

#### 图片资源
- 在 Webpack4 时，我们处理图片资源通过 file-loader 和 url-loader 进行处理
- 在 Webpack5 时已经将两个 Loader 功能内置到 Webpack 里，我们处理图片资源通过 asset-modules 进行处理
- 将小于某个大小的图片转化成 data URI 形式（Base64 格式）
  - 优点：减少请求数量
  - 缺点：代码体积增大（转化为base64会放大图片体积）

#### 字体资源
- Webpack5中，字体资源直接通过 asset-modules 进行处理
- `type: "asset/resource"`和`type: "asset"`的区别：
  - `type: "asset/resource"` 相当于`file-loader`, 将文件转化成 Webpack 能识别的资源，其他不做处理
  - `type: "asset"` 相当于`url-loader`, 将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式

#### 其他资源（音视频等）
- Webpack5中，其他资源直接通过 asset-modules 进行处理，也通过`type: "asset/resource"`处理

#### js资源(babel、eslint)
- Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。
- 此外，开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测
  - 针对 js 兼容性处理，使用 Babel 来完成, [babel-loader](https://webpack.docschina.org/loaders/babel-loader/)
  - 针对代码格式，使用 ESLint 来完成, [eslint-webpack-plugin](https://webpack.docschina.org/plugins/eslint-webpack-plugin/)

#### html资源
- Webpack5中，html资源直接通过plugin进行处理，[html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)

#### babel配置
作用：将ES6+语法转换为ES5语法，从而能兼容更多的浏览器（ie等旧版本浏览器）
- 在webpack中使用：babel-loader @babel/core @babel/preset-env
```bash
npm i babel-loader @babel/core @babel/preset-env -D
```
- 在根目录下创建`.babelrc`文件，并配置
  - presets 预设, 可以理解为babel的插件，扩展了babel的功能
    - `@babel/preset-env`: 基本的预设，包含了最新的ES语法
    - `@babel/preset-react`: 用于编译react jsx语法的预设
    - `@babel/preset-typescript`: 用于编译typescript语法的预设
```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                // 按需加载
                "useBuiltIns": "usage",
                // 指定core-js版本
                "corejs": {
                    "version": 3
                },
                // 指定兼容性做到哪个版本浏览器
                "targets": {
                    "chrome": "60",
                    "firefox": "60",
                    "ie": "9",
                    "safari": "10",
                    "edge": "17"
                }
            }
        ]
    ]
}
```
- 在webpack.config.js中配置babel-loader
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules下的js文件
                loader: "babel-loader",
            },
        ]
    }
}
```




### 输出资源
#### 修改输出资源名称及路径
```js
const path = require("path");
module.exports = {
    //入口
    entry: './src/index.js',
    //输出
    output: {
        filename: 'static/js/index.js', // 输出文件名
        path: resolve(__dirname, 'build'), // 输出文件路径
        publicPath: '/', // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
        library: '[name]', // 整个库向外暴露的变量名
        libraryTarget: 'window', // 变量名添加到哪个上 browser
        // libraryTarget: 'global', // 变量名添加到哪个上 node
        // libraryTarget: 'commonjs', // 变量名添加到哪个上 commonjs
        clean: true, // 自动将上次打包目录资源清空
    },
    module: {
        rules: [
        // loader配置
        // ...
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
            },
            },
            generator: {
            // 将图片文件输出到 static/imgs 目录中
            // 将图片文件命名 [hash:8][ext][query]
            // [hash:8]: hash值取8位
            // [ext]: 使用之前的文件扩展名
            // [query]: 添加之前的query参数
            filename: "static/imgs/[hash:8][ext][query]",
            },
        },
        ]
    },
    plugins: [
        // plugins配置
    ],
    // 模式 development/production
    mode: 'development'
}
```


### 开发服务器
#### webpack-dev-server
- 作用：提供一个简单的web服务器，并能够实时重新加载
- 下载
```bash
npm i webpack-dev-server -D
```
- 配置
```js
const path = require("path");

module.exports={
    // ...
    devServer: {
        contentBase: resolve(__dirname, 'build'), // 静态文件根目录
        compress: true, // 静态文件启动gzip压缩
        host: 'localhost', // 域名
        port: 3000, // 端口号
        open: true, // 自动打开浏览器
        hot: true, // 开启HMR功能
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错了，不要全屏提示~
        overlay: false,
        // 服务器代理 --> 解决开发环境跨域问题
        proxy: {
            // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                pathRewrite: {
                    '^/api': ''
                },
                secure: false, // 对于https接口，需要配置这个参数,默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果希望支持，可以设置为false；
                changeOrigin: true,// 它表示是否更新代理后请求的headers中host地址,一般设置为true
            }
        },
        historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
        // devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的,https://github.com/bripkens/connect-history-api-fallback
    },
}
```

##### 为什么要配制contentBase
- 作用：指定静态资源的根目录
- webpack在进行打包时，对静态文件（如图片）都是直接copy到输出目录中，但对于本地开发来说，这个过程太耗时，所以设置contentBase，直接到指定目录下去找静态文件，不对文件进行移动打包，提高开发效率（减少时间和性能开销）


#### source-map
> SourceMap 是一种映射关系，当项目运行后，如果出现错误，我们可以利用 SourceMap 反向定位到源码位置，从而更快的找到错误原因。
> 开发模式建议使用：`eval-cheap-module-source-map`
> 生产模式不建议使用，避免被看到源码。
```js
module.exports = {
    // ...
    devtool: 'eval-cheap-module-source-map'
}
```


### 优化构建速度
#### 优化resolve配置
- alias
```js
module.exports = {
    // ...
    resolve: {
        // 配置解析模块路径别名: 优点简写路径，缺点路径没有提示
        alias: {
            'css': resolve(__dirname, 'src/css'),
            '@': resolve(__dirname, 'src'),
        },
        // 配置省略文件路径的后缀名,顺序从左到右依次解析
        extensions: ['.js', '.json', '.jsx'],
        // 告诉webpack解析模块是去找哪个目录, 下面配置为优先 src 目录下查找需要解析的文件，找不到再去 node_modules 目录下找
        modules: [resolve(__dirname, 'src'), 'node_modules']
    }
}
```

- resolveLoader
resolveLoader和resolve的配置一样，只不过resolveLoader是用来配置loader解析路径的。
```js
module.exports = {
    // ...
    resolveLoader: {
        // 去哪些目录下寻找 Loader，有先后顺序之分
        modules: ['node_modules', resolve(__dirname, 'src', 'loaders')]
    }
}
```

#### externals
> externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。
> 可以用这样的方法来剥离不需要改动的一些依赖，大大节省打包构建的时间。
```js
module.exports = {
    // ...
    externals: {
        // 拒绝jQuery被打包进来
        jquery: 'jQuery'
    }
}
```

- 缩小范围
在配置loader时，可以通过include和exclude来缩小loader的处理范围，从而提高打包速度。
```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                // 只处理src目录下的js文件，加快webpack的打包速度
                include: resolve(__dirname, 'src'),
                // 排除node_modules目录下的js文件，加快webpack的打包速度
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            },
            // ...
        ]
    }
}
```

#### noParse
  - 不需要解析依赖的第三方大型类库等，可以通过这个字段进行配置，以提高构建速度
  - 使用 noParse 进行忽略的模块文件中不会解析 import、require 等语法
```js
module.exports = {
    // ...
    module: {
        noParse: /jquery|lodash/,
        rules: [
            // ...
        ]
    }
}
```


#### 多进程
- thread-loader
> thread-loader可以将一些复杂的loader放到一个单独的worker pool中，每个worker都是一个单独的进程，这些进程可以并行的处理任务，处理完后再把结果发送给主进程。
```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                // 只处理src目录下的js文件，加快webpack的打包速度
                include: resolve(__dirname, 'src'),
                // 排除node_modules目录下的js文件，加快webpack的打包速度
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            // 2 个 worker 进程
                            workers: 2
                        }
                    },
                    'babel-loader'
                    // ...
                ]
            },
            // ...
        ]
    }
}
```

#### 缓存
使用缓存来提高二次构建速度
##### babel缓存
- babel在转译js过程中时间开销较大，将babel-loader的执行结果缓存起来，下次再编译时，可直接复用缓存，从而提高二次构建速度。
- 缓存位置：默认在node_modules/.cache/babel-loader目录中
```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                // 只处理src目录下的js文件，加快webpack的打包速度
                include: resolve(__dirname, 'src'),
                // 排除node_modules目录下的js文件，加快webpack的打包速度
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            // 2 个 worker 进程
                            workers: 2
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                    // ...
                ]
            },
            // ...
        ]
    }
}
```

##### 其他loader缓存
- 使用[cache-loader](https://www.npmjs.com/package/cache-loader)
```js
module.exports = {
    // ...
    rules: [
        {
            test: /\.(s[ac]|c)ss$/i, // scss, sass, css
            use: [
                MiniCssExtractPlugin.loader,
                'cache-loader', // 缓存前面 loader 的执行结果
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }
    ]
}
    
```
- [cache持久化缓存](https://webpack.docschina.org/configuration/cache/#root)
> webpack自身配置选项，用于缓存生成的webpack模块和chunk，来改善构建速度。
```js
module.exports = {
    // ...
    cache: {
        // 将缓存类型设置为文件系统，默认值是memory
        type: 'filesystem',
        // 可选配置
        buildDependencies: {
            // 将你的配置添加依赖，更改配置时，使得缓存失效
            config: [__filename]
            // 如果有其他的东西被构建依赖，你可以在这里添加它们
            // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
        }
    }
}
```



### 优化构建结果
#### 构建结果分析
- 使用插件[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
    // ...
    plugins: [
        new BundleAnalyzerPlugin({
            // 生成报告的文件名
            // 默认是`webpack-bundle-analyzer-report.html`
            analyzerMode: 'static',
            // 是否启动展示报告的http服务器
            // 默认是false
            openAnalyzer: false,
            // 将在“服务器”模式下使用的端口启动HTTP服务器。
            // 默认是8888
            analyzerPort: 8888
        })
    ]
}
```
- 修改package.json中的scripts
```json
{
    "scripts": {
        "analyzer": "webpack --config webpack.prod.js --profile --json > stats.json"
    }
}
```

#### 压缩css
使用插件[optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    // ...
    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```