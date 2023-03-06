## JS

参考：
* https://juejin.cn/post/7194400984490049573



### 数据类型
分类： Undefined、Null、Number、String、Soolean、BigInt、Symbol、Object
* Symbol表示独一无二的值，场用于定义对象的唯一属性名。
* BigInt可以表示任意大小的整数。

#### 数据类型判断
1. typeof：能判断所有值类型，函数。不可对 null、对象、数组进行精确判断，因为都返回 object 。

```js
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```
2. instanceof: 能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型

3. Object.prototype.toString.call(): 所有原始数据类型都是能判断的，还有 Error 对象，Date 对象等。

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```


### ES6
[阮一峰ES6文档](https://es6.ruanyifeng.com/#docs/intro)
[文章参考](https://juejin.cn/post/6844903959283367950)

* let声明变量和const声明常量，都具有块级作用域。
* 箭头函数
* 解构赋值
* ...扩展运算符
* 模板字符串，在其中加入${}，其中可加入任意js表达式
* Object.values(obj)获取obj对象中所有属性值
* Array.prototype.flat(),[扁平化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
* 可选链操作符（?.）:允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 运算符的功能类似于 . 链式运算符，不同之处在于，在引用为空 (nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。
* 空值合并运算符（??）:当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
* for of循环，可遍历数组、Set、Map、arguments对象、类似数组的对象([TypeArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray))、字符串等[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
* [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)、[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
* class、extends、super
* Symbol
* Proxy、Reflect
* 剩余参数、默认参数
* promise、async/await

#### const、let、var的区别

#### 箭头函数和普通函数的区别
[参考](https://juejin.cn/post/7069943937577779214)
1. 声明方式不同，普通函数使用function关键字，箭头函数则使用箭头
2. this指向不同：普通函数this指向运行时所在的对象，即可理解为谁调用函数this就指向谁。箭头函数没有自己的执行上下文，this指向是在定义函数时就被确定下来的，箭头函数中的this，永远指向外层作用域中最接近自己的普通函数的this

```js
    let obj = {
        fn2:function(){
            console.log('fn2', this);
        },
        fn3: ()=> {
            console.log('fn3', this);
        },
        fn5: function () {
            console.log('fn5',this);
            const test = ()=> {
                console.log('test', this);
            }
            test()
        }
    }
    obj.fn2(); // fn2 obj
    obj.fn3();// fn3 Window
    obj.fn5();// fn5 obj, test obj
```
3. 箭头函数会忽略任何形式的this指向的改变，箭头函数的this指向是静态的,bind、call、apply等方法无法改变箭头函数的this指向。
```js
    let fn4 = () => {
        console.log('fn4', this);
    }
    const fn6 = fn4.bind(obj)
    fn4();// fn4 Window
    fn6();// fn4 Window
```
4. 普通函数能使用new关键字作为构造函数创建实例对象,this指向被创建出来的对象实例。 箭头函数不能作为构造函数使用
5. 普通函数有arguments对象，箭头函数没有.
6. 箭头函数没有原型prototype,这也解释了箭头函数不能作为构造函数的原因。从下面new内部实现的步骤可以看出，箭头函数没有原型prototype，没法让他的实例的__proto__属性指向，所以箭头函数也就无法作为构造函数.
```js
function myNew() {
    // 1.新建一个空对象
    let obj = {}
    // 2.获得构造函数
    let con = arguments.__proto__.constructor
    // 3.链接原型
    obj.__proto__ = con.prototype
    // 4.绑定this，执行构造函数
    let res = con.apply(obj, arguments)
    // 5.返回新对象
    return typeof res === 'object' ? res : obj
}
```
7. 箭头函数没有new.target。
8. 不能当做Generator函数,不能使用yied关键字




### 原型和原型链


### Promise
参考：
* https://es6.ruanyifeng.com/#docs/promise
* https://juejin.cn/post/6844904077537574919
* https://juejin.cn/post/6945319439772434469#heading-0

* Promise的状态一经改变就不能再改变。
* .then和.catch都会返回一个新的Promise。
* catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
* 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
* Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。
* .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
* .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
* .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
* .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。
* .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

#### Promise.all() 和 Promise.race()
* `.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
* `.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

总结
* Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
* .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
* Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
* all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。


### async/await


### 事件捕获与冒泡
参考：
* https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
* https://juejin.cn/post/6844904190280466440

```js
element.addEventListener(type, listener, useCapture)
```
* type:监听事件类型的字符串
* listener:事件监听回调函数，即事件触发后要处理的函数
* useCapture:默认值false，表示事件冒泡；设为true时，表示事件捕获

#### 事件代理（事件委托）
> 事件代理就是利用事件冒泡或事件捕获的机制把一系列的内层元素事件绑定到外层元素。


### 箭头函数和普通函数
参考：
* https://juejin.cn/post/6844903805960585224
* https://juejin.cn/post/7069943937577779214


## TS

### 断言
#### 类型断言
* 尖括号写法

```ts
let str: any = "to be or not to be";
let strLength: number = (<string>str).length;
```
* as写法

```ts
let str: any = "to be or not to be";
let strLength: number = (str as string).length;
```

#### 非空断言
> 在上下文中当类型检查器无法断定类型时，可以使用缀表达式操作符 `!` 进行断言操作对象是非 `null` 和非 `undefined` 的类型，即x!的值不会为 `null` 或 `undefined`
```ts
  let user: string | null | undefined;
  console.log(user!.toUpperCase()); // 编译正确
  console.log(user.toUpperCase()); // 错误
```
#### 确定赋值断言
> 定义了变量, 没有赋值就使用，则会报错.通过 `let x!: number;` 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。
```ts
let value:number
console.log(value); // Variable 'value' is used before being assigned.

let value1!:number
console.log(value1); // undefined 编译正确
```

### 交叉类型
> 交叉类型用&操作符表示，交叉类型就是两个类型必须存在。即下面代码中，person 即是 IpersonA 类型，又是 IpersonB 类型
```ts
interface IpersonA{
  name: string,
  age: number
}
interface IpersonB {
  name: string,
  gender: string
}

let person: IpersonA & IpersonB = { 
    name: "师爷",
    age: 18,
    gender: "男"
};
```
`注意：交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为never类型`
```ts
interface IpersonA {
    name: string
}

interface IpersonB {
    name: number
}

function testAndFn(params: IpersonA & IpersonB) {
    console.log(params)
}

testAndFn({name: "黄老爷"}) // error TS2322: Type 'string' is not assignable to type 'never'.
```

### 接口interface
> 使用接口来定义对象的类型。接口是对象的状态(属性)和行为(方法)的抽象(描述)。简单理解：为我们的代码提供一种约定。

#### 接口可选 | 只读
* 可选属性，我们最常见的使用情况是，不确定这个参数是否会传，或者存在。
* 只读属性用于限制只能在对象刚刚创建的时候修改其值。
* 此外 TypeScript 还提供了 ReadonlyArray 类型，它与 Array 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```ts
interface Person {
  readonly name: string;
  age?: number;
}
```
#### 索引签名
> 若希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

> 需注意，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
```ts
interface Person {
  name: string;
  age?: number;
  [prop: string]: any; //  prop字段必须是 string类型 or number类型。 值是any类型，也就是任意的
}

const p1:Person = { name: "张麻子" };
const p2:Person = { name: "树哥", age: 28 };
const p3:Person = { name: "汤师爷", sex: 1 }
```

#### interface和type
> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
> type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

**相同点：**
* 都可以用来描述对象或函数的类型，只是语法不同
```ts
type MyTYpe = {
  name: string;
  say(): void;
}

interface MyInterface {
  name: string;
  say(): void;
}
```
* 都允许扩展。interface 使用`extends`实现扩展。type使用`&`实现扩展

```ts
interface MyInterface {
  name: string;
  say(): void;
}

interface MyInterface2 extends MyInterface {
  sex: string;
}

let person:MyInterface2 = {
  name:'kk',
  sex:'男',
  say(): void {
    console.log("hello！");
  }
}

type MyType = {
  name:string;
  say(): void;
}
type MyType2 = MyType & {
  sex:string;
}
let value: MyType2 = {
  name:'f',
  sex:'男',
  say(): void {
    console.log("hello！");
  }
}
```

**不同点：**
* type可以声明基本数据类型别名/联合类型/元组等，而interface不行
* interface能够合并声明，而type不行
```ts
// 基本类型别名
type UserName = string;
type UserName = string | number;
// 联合类型
type Animal = Pig | Dog | Cat;
type List = [string, boolean, number];

interface Person {
  name: string
}
interface Person {
  age: number
}
// 此时Person同时具有name和age属性
```

### 泛型
参考：https://juejin.cn/post/7064351631072526350
> 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

> 泛型就像一个占位符一个变量，在使用的时候我们可以将定义好的类型像参数一样传入，原封不动的输出

例如，定义一个函数，出入任意类型的值，返回相应类型的值，此时就需要用到泛型
```ts
function getValue<T>(arg:T):T  {
  return arg;
}
```
以上代码中，泛型的语法是尖括号 <> 里面写类型参数，一般用 T 来表示第一个类型变量名称，其实它可以用任何有效名称来代替

#### 多个参数
可以引入希望定义的任何数量的类型变量。比如上述代码中引入一个新的类型变量 U
```ts
function getValue<T, U>(arg:[T,U]):[T,U] {
  return arg;
}

// 使用， typescript 给我们自动推断出输入、返回的类型
const str = getValue(['K', 18]);
```

#### 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法,如下代码，泛型 T 不一定包含属性 length,所以会报错。
```ts
function getLength<T>(arg:T):T  {
  console.log(arg.length); // 报错，不能调用 length 属性
}
```
此时可以约束getLength 这个函数只允许传入包含 length 属性的变量。使用extends关键字来对泛型进行约束
```ts
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg:T):T  {
  console.log(arg.length); 
  return arg;
}
// 使用
const str = getLength('K')
const arr = getLength([1,2,3])
const obj = getLength({ length: 5 })
```
可以看出，不管你是 str，arr 还是obj，只要具有 length 属性，都可以

#### 泛型接口
```ts
interface KeyValue<T,U> {
  key: T;
  value: U;
}

const person1:KeyValue<string,number> = {
  key: 'F',
  value: 18
}
const person2:KeyValue<number,string> = {
  key: 20,
  value: 'K'
}
```
#### 泛型类
```ts
class Test<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myTest = new Test<number>();
myTest.value = 0;
myTest.add = function (x, y) {
  return x + y;
};
```
#### 泛型类型别名
```ts
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ["1"] };
let c2: Cart<number> = [1];
```