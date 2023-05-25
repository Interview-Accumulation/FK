## Webpack
[参考1](https://juejin.cn/post/6844904094281236487)

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