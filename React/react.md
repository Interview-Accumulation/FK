# React
- https://juejin.cn/post/6941546135827775525
- https://juejin.cn/post/6940942549305524238
## React 15
### JSX


### setState

执行机制： 
* 不会立即更新，多个setState会进行合并，当所有组件及父组件Didmoount后，执行更行
* 每个组件只会更新一次，即对该组件的状态多次setState，进行合并后触发一次更新的生命周期。

和微任务、宏任务的区别：
* 执行顺序：setState操作执行时机先于微任务和宏任务。
* setState的异步特性的主要原因：在React的声明周期及绑定的事件流中，所有的setState的操作会先缓存到一个队列中，等整个事件结束或者mount流程结束后，才会去除之前缓存的setState队列进行一次计算，触发state更新
```js
handleClick = () => {
    const fans = Math.floor(Math.random() * 10); // 8
    this.setState({
        count: this.state.count + fans // 0 + 8
    }, () => {
        console.log('state:', this.state.count)
    })
    setTimeout(() => {
        console.log('宏任务')
    })
    Promise.resolve().then(() => {
        console.log('微任务')
    })

}
// 打印结果：
//    微任务 state:8 宏任务
```
* 跳出React的事件流或生命周期，就可打破React对setState的掌控，即把setState放入setTimeout的匿名函数即可

```js
handleClick = () => {
    const fans = Math.floor(Math.random() * 10); // 8
    setTimeout(() => {
        console.log('开始')
        this.setState({
            count: this.state.count + fans // 0 + 8
        }, () => {
            console.log('state:', count)
        })
        console.log('结束')
    },0)


}
// 打印结果：
// 开始 state:8  结束
```



### 生命周期
> 参考：https://zh-hans.reactjs.org/docs/react-component.html

![生命周期图](../00_images//react-lifecycle.png)



* 挂载阶段: 当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下
  * constructor() ：进行state、props初始化。该阶段修改state，不会执行更新阶段声明周期，可直接对state赋值
  * static getDerivedStateFromProps()
  * render()
  * componentDidMount() ： 发生在 render 函数之后，已经挂载 Dom
> 注意：
> UNSAFE_componentWillMount() ：发生在 render 函数之前，还没有挂载 Dom. 即将过时，在新代码中应该避免使用它们.


* 更新阶段: 当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下
  * static getDerivedStateFromProps()
  * shouldComponentUpdate()
  * render()
  * getSnapshotBeforeUpdate()
  * componentDidUpdate()

> 注意：
> UNSAFE_componentWillUpdate()
> UNSAFE_componentWillReceiveProps()
> 这两个方法即将过时，在新代码中应该避免使用它们

* 卸载阶段：当组件从 DOM 中移除时会调用如下方法
  * componentWillUnmount()

* 错误处理: 当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法
  * static getDerivedStateFromError()
  * componentDidCatch()


### 虚拟dom

### react事件

#### react16
* jsx 中绑定的事件,根本就没有注册到真实的dom上。是绑定在document上统一管理的(react16)
* 真实的dom上的click事件被单独处理,已经被react底层替换成空函数
* 在react绑定的事件,比如onChange，在document上，可能有多个事件与之对应
* react并不是一开始，把所有的事件都绑定在document上，而是采取了一种按需绑定，比如发现了onClick事件,再去绑定document click事件。

合成事件：在react中，绑定的事件onClick等，并不是原生事件，而是由原生事件合成的React事件，比如 click事件合成为onClick事件。比如blur , change , input , keydown , keyup等 , 合成为onChange。

采取合成事件的原因：
* 将事件绑定在document统一管理，防止很多事件直接绑定在原生的dom元素上。造成一些不可控的情况
* React 想实现一个全浏览器的框架， 为了实现这种目标就需要提供全浏览器一致性的事件系统，以此抹平不同浏览器的差异。

事件绑定总结：
* 在React，diff DOM元素类型的fiber的props的时候， 如果发现是React合成事件，比如onClick，会按照事件系统逻辑单独处理。
* 根据React合成事件类型，找到对应的原生事件的类型，然后调用判断原生事件类型，大部分事件都按照冒泡逻辑处理，少数事件会按照捕获逻辑处理（比如scroll事件）。
* 调用 addTrappedEventListener 进行真正的事件绑定，绑定在document上，dispatchEvent 为统一的事件处理函数。
* 有一点值得注意: 只有上述那几个特殊事件比如 scorll,focus,blur等是在事件捕获阶段发生的，其他的都是在事件冒泡阶段发生的，无论是onClick还是onClickCapture都是发生在冒泡阶段，


事件池：
```js
handerClick = (e) => {
    console.log(e.target) // button 
    setTimeout(()=>{
        console.log(e.target) // null
    },0)
}
```

* 对于一次点击事件的处理函数，在正常的函数执行上下文中打印e.target就指向了dom元素，但是在setTimeout中打印却是null，如果这不是React事件系统，两次打印的应该是一样的，但是为什么两次打印不一样呢?
* 因为在React采取了一个事件池的概念，每次我们用的事件源对象，在事件函数执行之后，可以通过releaseTopLevelCallbackBookKeeping等方法将事件源对象释放到事件池中，这样的好处每次我们不必再创建事件源对象，可以从事件池中取出一个事件源对象进行复用，在事件处理函数执行完毕后,会释放事件源到事件池中，清空属性，这就是setTimeout中打印为什么是null的原因了。


#### react17
react17相较于16，事件系统有部分改动
1. 事件统一绑定container上，ReactDOM.render(app， container);而不是document上，这样好处是有利于微前端的，微前端一个前端系统中可能有多个应用，如果继续采取全部绑定在document上，那么可能多应用下会出现问题。
![事件系统对比](../00_images/react6-17-event.png)
2. 对齐原生浏览器事件,React 17 中终于支持了原生捕获事件的支持， 对齐了浏览器原生标准。同时 onScroll 事件不再进行事件冒泡。onFocus 和 onBlur 使用原生 focusin， focusout 合成。
3. 取消事件池 React 17 取消事件池复用，也就解决了上述在setTimeout打印，找不到e.target的问题。

### React16+

### Hooks
> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

#### 函数式组件和类组件
* 在class状态中，通过一个实例化的class，去维护组件中的各种状态；但是在function组件中，没有一个状态去保存这些信息，每一次函数上下文执行，所有变量，常量都重新声明，执行完毕，再被垃圾机制回收。
*  对于class组件，我们只需要实例化一次，实例中保存了组件的state等状态。对于每一次更新只需要调用render方法就可以。但是在function组件中，每一次更新都是一次新的函数执行,为了保存一些状态,执行一些副作用钩子,react-hooks应运而生，去帮助记录组件的状态，处理一些额外的副作用


#### useMemo
* 只要父组件状态更新，无论有没有对子组件进行操作，子组件都会进行更新。 为了解决该问题，可使用useMemo
* 如下，useMemo只有list变化时才会进行更新渲染，从而减少不必要的开销。
```jsx
useMemo(()=> (<MemoFunc list={list}/>),[list])
```
useMemo优势：
* 减少不必要的循环和渲染
* 可以减少子组件渲染次数
* 通过特定的依赖进行更新，可以避免很多不必要的开销。

#### useCallback
* 和useMemo类似，只不过返回的是函数


#### useRef

### 虚拟DOM
虚拟DOM；简单理解，即用JS按照DOM结构实现的树形结构对象。
