## CSS

### 水平垂直居中
参考：https://juejin.cn/post/6844903982960214029
#### 文本垂直居中

```html
<!-- css 样式 -->
<style rel="stylesheet" type="text/css">
.text{
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    background: skyblue;
}
</style>
<!-- html 结构 -->
<div class="text">文本垂直居中</div>
```

#### 元素
* 绝对定位

## HTML

### 如何理解HTML语义化
* 让人更容易读懂（增加代码可读性）。
* 让搜索引擎更容易读懂，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重（SEO）。
* 在没有 CSS 样式下，页面也能呈现出很好地内容结构、代码结构。

### script标签中defer和async的区别？
* script ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
* async script ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
* defer script：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。
![script执行](../00_images/script_defer_async.png)

### 从浏览器地址栏输入url到请求返回发生了什么
参考：
* https://juejin.cn/post/6844903784229896199
* https://juejin.cn/post/6935232082482298911

简易流程：
1. 输入 URL 后解析出协议、主机、端口、路径等信息，并构造一个 HTTP 请求
   * 强缓存、协商缓存
2. DNS域名解析
3. TCP连接
4. http请求
5. 服务器处理并返回http报文
6. 浏览器渲染页面
![浏览器渲染](../00_images/url_browser.png)
7. 断开TCP连接


## CSS

### 盒模型
分类： 标准盒模型和IE盒模型
相同点：
* 两种盒子模型都是由 `content + padding + border + margin`构成，其大小都是由 `content + padding + border` 决定的

不同点：
* 盒子`内容宽/高度`（即` width/height`）的计算范围根据盒模型的不同会有所不同
  * 标准盒模型：只包含 content
  * IE盒模型：content + padding + border

通过box-sizing属性改变元素的盒模型：
* `box-sizing: border-box`，IE盒模型
* `box-sizing: content-box`，标准盒模型

### css选择器和优先级
[选择器参考表](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#%E9%80%89%E6%8B%A9%E5%99%A8%E5%8F%82%E8%80%83%E8%A1%A8)
选择器分类：
* 类型选择器
* 类选择器
* ID选择器
* 标签属性选择器
* 伪类

### 重排（reflow）和重绘（repaint）
参考：https://juejin.cn/post/6844903779700047885
**概念：**
* 重排：无论通过什么方式影响了元素的几何信息(元素在视口内的位置和尺寸大小)，浏览器需要**重新计算**元素在视口内的几何属性，这个过程叫做重排。(更新几何属性)
* 重绘：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，接下来就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘。（更新绘制属性）

**如何减少重排和重绘**
* 最小化重绘和重排：如样式集中改变
* 批量操作DOM，
* 使用 **absolute** 或 **fixed** 使元素脱离文档流，这在制作复杂的动画时对性能的影响比较明显。
* 开启 GPU 加速，利用 css 属性 transform 、will-change 等，比如改变元素位置，我们使用 translate 会比使用绝对定位改变其 left 、top 等来的高效，因为它不会触发重排或重绘，transform 使浏览器为元素创建⼀个 GPU 图层，这使得动画元素在一个独立的层中进行渲染。当元素的内容没有发生改变，就没有必要进行重绘。

### BFC
参考：
* https://juejin.cn/post/6960866014384881671
* https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
> BFC（Block Formatting Context） 即块级格式上下文，根据盒模型可知，每个元素都被定义为一个矩形盒子，然而盒子的布局会受到尺寸，定位，盒子的子元素或兄弟元素，视口的尺寸等因素决定，所以这里有一个浏览器计算的过程，计算的规则就是由一个叫做视觉格式化模型的东西所定义的，BFC 就是来自这个概念，它是 CSS 视觉渲染的一部分，用于决定块级盒的布局及浮动相互影响范围的一个区域。

BFC的特性：
* 块级元素会在垂直方向一个接一个的排列，和文档流的排列方式一致。
* 在 BFC 中上下相邻的两个容器的 margin  会重叠，创建新的 BFC 可以避免外边距重叠。
* 计算 BFC 的高度时，需要计算浮动元素的高度。
* BFC 区域不会与浮动的容器发生重叠。
* BFC 是独立的容器，容器内部元素不会影响外部元素。
* 每个元素的左 margin  值和容器的左 border  相接触。

创建BFC方式：
* 绝对定位元素（position 为 absolute 或 fixed ）。
* 行内块元素，即 display 为 inline-block 。
* overflow 的值不为 visible 。

### 元素隐藏的方法

#### display：none和visibility：hidden的区别
> 设置这两种属性的节点，就不会从dom树上消失（和vue中v-if区别，v-if设为false，dom树中不会存在该节点）
* display：none隐藏元素，不会占据原来的空间。visibility：hidden隐藏完元素还是占据对应空间。
* display：none没有继承性，visibility：hidden有继承性。给父元素设置visibility：hidden，其子元素也会继承该属性，如果给子元素设置visibility：visible，则子元素会显示出来。
* visibility：hidden不会影响计数器的运算，比如ol标签中的li标签，隐藏其中的第二个标签，后续标签的序号不变，而如果使用display：none后续标签的序号会衔接上去上一个。
* CSS3的transition支持visibility属性，但是并不支持display
* display:none会引起回流(重排)和重绘 , visibility:hidden会引起重绘 

### 两栏布局
1. 利用浮动，左边元素宽度固定 ，设置向左浮动。将右边元素的 margin-left 设为固定宽度 。注意，因为右边元素的 width 默认为 auto ，所以会自动撑满父元素。

2. 同样利用浮动，左边元素宽度固定 ，设置向左浮动。右侧元素设置 overflow: hidden; 这样右边就触发了 BFC ，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。

3. 利用 flex 布局，左边元素固定宽度，右边的元素设置 flex: 1 。

4. 利用绝对定位，父级元素设为相对定位。左边元素 absolute  定位，宽度固定。右边元素的 margin-left  的值设为左边元素的宽度值。
5. 利用绝对定位，父级元素设为相对定位。左边元素宽度固定，右边元素 absolute  定位， left  为宽度大小，其余方向定位为 0 


### 圣杯布局和双飞翼布局（经典三栏布局）
目的：
* 三栏布局，中间一栏最先加载和渲染（内容最重要，这就是为什么还需要了解这种布局的原因）。
* 两侧内容固定，中间内容随着宽度自适应。
* 一般用于 PC 网页。

技术总结：

* 使用 float  布局。
* 两侧使用 margin 负值，以便和中间内容横向重叠。
* 防止中间内容被两侧覆盖，圣杯布局用 padding ，双飞翼布局用 margin 。

### margin设置百分比
> margin设置为百分比，按照父元素宽度来进行计算。
示例代码如下：
```html
  <!-- css部分 -->
    <style>
        .outer {
            width: 300px;
            height: 400px;
            border: 1px solid gray;
        }
        .innner {
            width: 100px;
            height: 100px;
            border: 1px solid red;
            margin-left: 50%;
            margin-top: 50%;
        }
    </style>
    <!-- html部分 -->
    <div class="outer">
        <div class="innner"></div>
    </div>
```
效果如下：
![margin百分比示例](../00_images/margin-percent.png)