
# 前端网络
- https://juejin.cn/post/6940942549305524238
- https://juejin.cn/post/6908327746473033741
- https://juejin.cn/post/6844904021308735502
- https://juejin.cn/post/7269952188927017015

## HTTP


### http状态码
* 分类:
  * 1xx - 服务器收到请求。
  * 2xx - 请求成功，如 200。
  * 3xx - 重定向，如 302。
  * 4xx - 客户端错误，如 404。
  * 5xx - 服务端错误，如 500。

* 常见：
  * 200 - 成功。
  * 301 - 永久重定向（配合 location，浏览器自动处理）。
  * 302 - 临时重定向（配合 location，浏览器自动处理）。
  * 304 - 资源未被修改,使用协商缓存
  * 403 - 没权限。
  * 404 - 资源未找到。
  * 500 - 服务器错误。
  * 504 - 网关超时。

### get和post的区别
* get请求是一个幂等的请求，即一般使用get请求不会对服务器的数据产生影响，

### http缓存

##### 强缓存
强缓存不需要客户端向服务端发送请求，有两种响应头实现方案:
* Expires：值是一个绝时间，在这个时间前缓存有效，但是如果本地时间被修改，会导致缓存失效,**在http/1.0中使用**
* Cache-control：值是一个相对时间，单位为秒，资源在这个时间内有效，**在http/1.1中使用**
* expires和cache-control同时存在时，cache-control优先级高于expires

**Expires**
- 即为过期时间，用来指定资源到期的时间，是服务器端的具体的时间点，由服务器返回，用来告诉浏览器在这个时间点之前可以直接从缓存里面获取数据，而无需再次请求.
- 如下,表示资源在2019年11月22号8点41分过期，过期后需要想服务端发送请求
```js
Expires: Wed, 22 Nov 2019 08:41:00 GMT
```
- 如果本地时间被修改，会导致缓存失效。
- 或者浏览器的时间和服务器时间不一致，可能会导致过期时间不准去的问题，所以http1.1中使用Cache-Control代替

**Cache-Control**
- http1.1中使用Cache-Control代替Expires,本质不同在于Cache-Control采用的是相对时间来控制华村，对应字段是max-age，如下，表示资源在3600秒后过期，过期后需要向服务端发送请求
```js
Cache-Control: max-age=3600
```
- Cache-Control的值可以是多个，多个值之间用逗号隔开，如下
  - private：表示资源只能被浏览器缓存，不能被代理服务器缓存
  - no-cache：跳过当前的强缓存，发送HTTP请求，即直接进入协商缓存阶段
  - no-store：禁止浏览器和代理服务器缓存当前的请求返回的结果，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源
  - s-maxage：覆盖max-age或者Expires头，但是仅适用于共享缓存（比如CDN缓存、代理服务器等），私有缓存（比如浏览器缓存）会忽略它
  - public：表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
> 注意：当Expires和Cache-Control同时存在的时候，Cache-Control会优先考虑，即Cache-Control的值会覆盖Expires的值




#### 协商缓存
强缓存过期之后会使用协商缓存，协商缓存需要客户端向服务端发送请求，资源未过期则服务端返回304否则返回新的资源。 协商缓存也有两种实现方案：
* Last-Modified 和 If-Modified-Since：
  * Last-Modified 表示最后修改日期，在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段.
  * If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。否则返回304，告诉浏览器使用缓存。但是如果本地文件被打开，会导致Last-Modified 被修改。
* ETag 和 If-None-Match：
  * ETag 类似于文件指纹，是服务器根据当前文件内容生成的唯一标识，只要内容有改动，Etag就会变化。服务器在响应头中加上这个字段，传给浏览器。
  * 浏览器在接收Etag的值后，在下一次请求时，会将该值作为If-None-Match字段的内容，放到请求头中发送给服务器，询问该资源 ETag 是否变动
  * 服务器在接收到If-None-Match后，会跟服务器上该资源的ETag进行比,有变动的话就将新的资源发送回来,没有变动则返回304告诉浏览器使用缓存。并且 **ETag 优先级比 Last-Modified 高**。

**对比：**
* 精准度：Etag > Last-Modified，因为ETag是根据文件内容生成的指纹，能准确感知资源的变化。而Last-Modified 在一些特殊的情况并不能准确感知资源变化:
  * 编辑了资源文件，但是文件内容并没有更改，这样也会造成缓存失效
  * Last-Modified 能够感知的单位时间是秒，如果文件在 1 秒内改变了多次，那么这时候的 Last-Modified 并没有体现出修改了。
* 性能：Last-Modified > Etag，因为Etag需要服务器通过算法来计算资源的指纹(hash)，而Last-Modified 只需要记录修改时间即可。

#### 缓存位置
浏览器中的缓存位置一共有四种，按优先级从高到低排列分别是:
* Service Worker
  * Service Worker 借鉴了 Web Worker的 思路，即让 JS 运行在主线程之外，由于它脱离了浏览器的窗体，因此无法直接访问DOM
  * 可以帮助完成离线缓存、消息推送和网络代理等功能
  * 其中离线缓存就是通过 Service Worker 实现的，它可以让我们的应用在离线状态下依然可用，这也是 (PWA)[https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps] 的核心功能之一
* Memory Cache
  * 即内存缓存，从效率上讲，内存缓存是最快的一种缓存，但是缓存持续的时间也是最短的，当渲染进程结束后，内存缓存也就不存在了
* Disk Cache
  * 即存储在硬盘中的缓存，相比内存缓存，它的优势在于存储容量和时效性，但是相对于内存缓存来说，它的读取速度就慢了很多
* Push Cache
  * 即推送缓存，这是浏览器缓存中最后一个环节，它只在 https 协议下存在，而且缓存时间也很短暂，只在会话(session)存在，一旦会话结束就被释放，所以它只能用来处理一些非关键性的资源，比如说页面的图标、样式等等

浏览器对于Memory Cache 和 Disk Cache缓存策略：
- 较大的JS、CSS文件会被缓存到硬盘中，而不是内存中
- 内存使用频率较高时，文件优先进入磁盘缓存

### 浏览器本地存储
> 浏览器本地存储主要分为cookie、web storage、indexDB，其中web storage又分为localStorage和sessionStorage

#### Cookie
产生的背景：
* HTTP协议是无状态的，每次请求都是独立的，服务器无法知道当前请求和上一次请求是否来自同一个浏览器，所以无法知道用户的状态
* 为了解决这个问题，服务器可以通过设置响应头的Set-Cookie字段，将用户的状态信息以Cookie的形式发送给浏览器，浏览器会将Cookie保存起来，当下次请求时，会将Cookie发送给服务器，服务器就能知道用户的状态了
* Cookie 是由服务器生成，发送给浏览器的一小段文本信息，浏览器会把 Cookie 保存起来，之后每次请求都会将 Cookie 发送给服务器。其本质就是浏览器存储的一个很小的文本文件，内部以键值对的方式来存储数据

作用： 存储会话状态（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
缺陷:
  * 容量缺陷：每个域名下的 Cookie 数量和大小都是有限制的，不同浏览器的限制也不一样，一般来说不超过 50 个，单个域名下不超过 4KB
  * 性能缺陷：Cookie紧跟域名，不管该域名下的某个地址需不需要这个Cookie,请求都会携带该Cookie，这样随着请求数的增加，会带来性能上的损耗
  * 安全缺陷：Cookie 存储在浏览器中，容易被恶意获取，然后进行篡改，所以 Cookie 中存储的信息一般都是一些不敏感的信息，如用户的登录状态等。且Cookie是明文传输，容易被窃取。在httpOnly为false的情况下，Cookie 信息能直接通过 JS 脚本来读取,容易受到XSS攻击

#### localStorage
* localStorage 是 HTML5 标准中新加入的技术，它并不是什么划时代的新技术，早在 IE6 时代就已经存在了，只不过当时叫做 userData，是 IE 浏览器独有的技术，后来被 HTML5 标准化，改名为 localStorage
和cookie相同点：
* 都是针对某个域名进行存储的
和cookie不同点：
* cookie 是在浏览器和服务器之间来回传递的，而 localStorage 是完全位于浏览器端的，数据不会随着 HTTP 请求被发送出去
* localStorage 的容量比 cookie 大得多，可以达到 5MB 以上，cookie 只有 4KB
* localStorage暴露在全局，通过setItem和getItem方法来进行操作，非常方便，而cookie只能通过document.cookie来进行操作。

[API方法参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
应用场景：利用localStorage的较大容量和持久特性，可以利用localStorage存储一些内容稳定的资源，比如官网的logo，存储Base64格式的图片资源

#### sessionStorage
和localStorage的区别：
* sessionStorage 也是 HTML5 标准中新加入的技术，它和 localStorage 的接口类似，但是保存数据的生命周期与 localStorage 不同，它只是将数据保存在当前会话中，当会话结束（通常是窗口关闭）时，数据也随之被清除

相同点：
* 都是针对某个域名进行存储的
* 容量都比较大，可以达到 5MB 以上
* 只存储在客户端，默认不会发送到服务器端
* 接口方法也类似，都是通过setItem和getItem方法来进行操作，[API方法参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

#### IndexedDB
- IndexedDB 是 HTML5 标准中新加入的技术，它是一种本地（非关系型）数据库，可以在浏览器中存储结构化数据，提供比 localStorage 更强的查询功能，这些查询功能允许开发者使用索引来检索数据
- 其容量理论上没有上限，但是不同浏览器实现上有所差异，一般来说不少于 250MB
- [IndexedDB使用指南](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

注意：
* 键值对存储，内部采用对象仓库（object store）存放数据，在这个对象仓库中的数据采用键值对的方式进行存储
* 异步操作，IndexedDB 的 API 设计采用了异步架构，所有的操作都是异步执行的，这样可以避免大量数据的读写阻塞主线程，从而提升性能
* IndexedDB 也是遵循同源策略的，每一个数据库都是和创建它的域名绑定的，不同域名之间无法互相访问对方的数据库

#### 总结
- cookie并不适合存储，而且存在非常多的缺陷。
- Web Storage包括localStorage和sessionStorage, 默认不会参与和服务器的通信。
- IndexedDB为运行在浏览器上的非关系型数据库，为大型数据的存储提供了接口




### OSI七层模型和TCP/IP四层模型

七层模型：
* 应用层
* 表示层
* 会话层
* 传输层
* 网络层
* 数据链路层
* 物理层


四层模型：
* 应用层：应用层、表示层、会话层：HTTP
* 传输层：传输层：TCP/UDP
* 网络层：网络层：IP
* 数据链路层：数据链路层、物理层


### http响应头
参考：
- https://juejin.cn/post/7124847588070653983

### 常见攻击类型
* [XSS](https://juejin.cn/post/6844903685122703367)


### cookie


