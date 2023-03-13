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