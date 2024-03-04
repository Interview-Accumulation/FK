/**
 * @description MyOmit
 * @param {T} T
 * @param {K} K
 * @return {*}  {MyOmit<T, K>}
 * @example MyOmit({ name: "jack", age: 18 }, "name") // { age: 18 }
 */

type MyOmit<T, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key]
}

