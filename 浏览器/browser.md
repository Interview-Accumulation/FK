# 浏览器

### 垃圾回收
文章参考：https://juejin.cn/post/6981588276356317214
分为两种策略：
* **标记清理**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁
* **引用计数**：它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收。

### 浏览器渲染流程
#### 浏览器渲染流程:
![浏览器渲染流程](../00_images/url_browser.png)
1. 解析HTML，生成DOM树，解析CSS，生成CSSOM树
2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5. Display:将像素发送给GPU，展示在页面上。

#### 生成渲染树
![渲染树](../00_images/render_tree.png)
为了构建渲染树，浏览器主要完成了以下工作：
1. 从DOM树的根节点开始遍历每个可见节点。
2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们。
3. 根据每个可见节点以及其对应的样式，组合生成渲染树

**注：** 不可见节点：
* 不会渲染输出的节点，比如script、meta、link等。
* 通过css进行隐藏的节点。比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上。

#### 回流（重排）重绘触发时机
> 回流一定会触发重绘，而重绘不一定会回流

* 添加或删除可见的DOM元素
* 元素的位置发生变化
* 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
* 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
* 页面一开始渲染的时候（这肯定避免不了）
* 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

#### 浏览器重排优化机制
* 由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。
* 但是，当获取布局信息的操作的时候，会强制队列刷新，比如当你访问以下属性或者使用以下方法：
  * offsetTop、offsetLeft、offsetWidth、offsetHeight
  * scrollTop、scrollLeft、scrollWidth、scrollHeight
  * clientTop、clientLeft、clientWidth、clientHeight
  * getComputedStyle()
  * getBoundingClientRect
  * 具体参考：https://gist.github.com/paulirish/5d52fb081b3570c81e3a

#### 减少回流(重排)和重绘
1. 最小化重绘和重排,如合并多次对DOM和样式的修改，然后一次处理掉
     * 以下代码中，有三个样式属性被修改，且都会影响元素几何属性，引起重排，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。
     * 因此可以使用cssText或者class合并所有的改变然后依次处理.
```js
const el = document.getElementById('test');
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';

// 以上代码使用cssText优化
const el = document.getElementById('test');
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';
// 修改CSS的class
const el = document.getElementById('test');
el.className += ' active';
```
2. 批量修改DOM
   * 需要对DOM对一系列修改的时候，可以通过以下步骤减少回流重绘次数：
     * 使元素脱离文档流
     * 对其进行多次修改(该步骤的修改不会引起回流重绘，因为已经不在渲染树上)
     * 将元素带回到文档中。
   * 让DOM脱离文档流的三种方式：
     * 隐藏元素，应用修改，重新显示
     * 使用文档片段(document fragment)在当前DOM之外构建一个子树，再把它拷贝回文档。
     * 将原始元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素。
3. 避免触发同步布局事件
4. 对于复杂动画效果,使用绝对定位让其脱离文档流
5. css3硬件加速（GPU加速）
   * 使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。
   * 常见的触发硬件加速的css属性：
     * transform
     * opacity
     * filters
     * Will-change

### 浏览器不同tab页之间的通信
参考：
* https://www.jianshu.com/p/72b7b69ac101
* https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
* https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker
* https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
* https://developer.mozilla.org/zh-CN/docs/Web/API/Window/storage_event