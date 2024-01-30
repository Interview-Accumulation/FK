type MyPick<T ,K extends keyof T> = {
    [key in K]: T[key]
}


/**
 * keyof: 获取对象的所有key,取interface的键后保存为联合类型
 */
interface Person {
    name: string;
    age: number;
}
type K1 = keyof Person; // "name" | "age"

/**
 * in: 遍历联合类型,不可用于interface
 */
type K2 = "name" | "age";
type TPerson = {
    [key in K2]: string;
}
// type TPerson = {
//     name: string;
//     age: string;
// }

/**
 * 用于实际开发，下面函数，无法确定返回值类型，无法对 key 进行约束：
    function getValue(o:object, key: string){
        return o[key]
    }
 */
function getValue<T extends Object, K extends keyof T>(o: T, key: K): T[K] {
    return o[key];
}
getValue({ name: "jack", age: 18 }, "name"); // jack
// getValue({ name: "jack", age: 18 }, "age1"); // 报错：类型“"age1"”的参数不能赋给类型“"name" | "age"”的参数