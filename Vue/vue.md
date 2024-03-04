### 虚拟 DOM
* 参考：[虚拟 DOM]()
* 采用虚拟DOM的更新技术在性能这块，理论上是不可能比原生Js操作DOM高的。不过在大部分情况下，开发者很难写出绝对优化的命令式代码。所以虚拟DOM就是用来解决这一问题，让开发者系的代码在性能上得到保障，甚至无限接近命令式代码的性能。
* 通常情况下，纯Js层面的操作远比DOM操作快。虚拟DOM就是用Js来模拟出DOM结构，通过diff算法来计算出最小的变更，通过对应的渲染器，来渲染到页面上。
* 同时虚拟DOM也为跨平台开发提供了极大的便利，开发者写的同一套代码（有些需要针对不同平台做区分），通过不同的渲染规则，就可以生成不同平台的代码。
* 在vue中会通过渲染器来将虚拟DOM转换为对应平台的真实DOM。如renderer(vnode， container)，该方法会根据vnode描述的信息（如tag、props、children）来创建DOM元素，根据规则为对应的元素添加属性和事件，处理vnode下的children。

### Vue3的变化
* 响应式系统的变化
  * Vue3中的响应式系统使用了Proxy，而不是Object.defineProperty。Proxy可以监听对象的任何属性，而Object.defineProperty只能监听对象的属性。
  * Vue3中的响应式系统使用了WeakMap来存储依赖关系，而不是Vue2中的Dep类。
  * Vue3中的响应式系统使用了栈结构来存储依赖关系，而不是Vue2中的递归。

* 编译器的变化
  * Vue3中的编译器使用了静态提升，将静态节点提升到render函数之外，这样可以减少render函数的创建次数，提高渲染性能。
  * Vue3中的编译器使用了Block tree，将模板编译成了一个Block tree，这样可以减少渲染时的递归次数，提高渲染性能。
  * Vue3中的编译器使用了Patch flag，将需要更新的节点标记为Patch flag，这样可以减少不需要更新的节点的更新次数，提高渲染性能。
  * Vue3中的编译器使用了缓存事件处理函数，将事件处理函数缓存起来，这样可以减少事件处理函数的创建次数，提高渲染性能。

* 组件的变化
  * Vue3中的组件使用了Composition API，将组件的逻辑拆分成了多个函数，这样可以提高组件的复用性。
  * Vue3中的组件使用了Teleport，将组件的内容渲染到指定的DOM节点，这样可以提高组件的灵活性。
  * Vue3中的组件使用了Suspense，将组件的异步内容渲染到指定的DOM节点，这样可以提高组件的性能。

* diff算法的变化
  * 在vue2中使用的是双端diff算法：是一种同时比较新旧两组节点的两个端点的算法（比头、比尾、头尾比、尾头比）。一般情况下，先找出变更后的头部，再对剩下的进行双端diff。
  * 在vue3中使用的是快速diff算法：它借鉴了文本diff算法的预处理思路，先处理新旧两组节点中相同的前置节点和后置节点。当前置节点和后置节点全部处理完毕后，如果无法通过简单的挂载新节点或者卸载已经不存在的节点来更新，则需要根据节点间的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。

### Vue3 双向绑定实现

```js
// WeakMap常用于存储只有当key所引用的对象存在时（没有被回收）才有价值的消息，十分贴合双向绑定场景
const bucket = new WeakMap(); // 存储副作用函数

let activeEffect; // 用一个全局变量处理被注册的函数

const tempObj = {}; // 临时对象，用于操作

const data = { text: "hello world" }; // 响应数据源

// 用于清除依赖
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 处理依赖函数
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };
  effectFn.deps = [];
  effectFn();
}

// 在get时拦截函数调用track函数追踪变化
function track(target, key) {
  if (!activeEffect) return; //
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect);

  activeEffect.deps.push(deps);
}

// 在set拦截函数内调用trigger来触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  const effectsToRun = new Set(effects);
  effectsToRun.forEach(effectFn => effectFn());
  // effects && effects.forEach(fn => fn());
}

const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    if (!activeEffect) return; //
    console.log("get -> key", key);
    track(target, key);
    return target[key];
  },

  // 拦截设置操作
  set(target, key, newValue) {
    console.log("set -> key: newValue", key, newValue);
    target[key] = newValue;
    trigger(target, key);
  },
});

effect(() => {
  tempObj.text = obj.text;
  console.log("tempObj.text :>> ", tempObj.text);
});

setTimeout(() => {
  obj.text = "hi vue3";
}, 1000);


```