## Webpack
[参考1](https://juejin.cn/post/6844904094281236487)
[参考2](https://juejin.cn/post/7002839760792190989)
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

### 
webpack本身只能识别js资源，不能识别其他资源，所以需要loader来处理其他资源，loader本身是一个函数，接受源文件作为参数，返回转换的结果

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

#### js资源
- Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。
- 此外，开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测
  - 针对 js 兼容性处理，使用 Babel 来完成, [babel-loader](https://webpack.docschina.org/loaders/babel-loader/)
  - 针对代码格式，使用 ESLint 来完成, [eslint-webpack-plugin](https://webpack.docschina.org/plugins/eslint-webpack-plugin/)

#### html资源
- Webpack5中，html资源直接通过plugin进行处理，[html-webpack-plugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)


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