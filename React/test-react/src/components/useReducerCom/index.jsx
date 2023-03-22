import React, {useReducer} from "react";

const DemoUseReducer = () => {
  /* number为更新后的state值,  dispatchNumbner 为当前的派发函数 */
  const [number, dispatchNumbner] = useReducer((state, action) => {
    const { payload, name } = action;
    /* return的值为新的state */
    switch (name) {
      case "add":
        return state + 1;
      case "sub":
        return state - 1;
      case "reset":
        return payload;
      default:
        console.log('不变');
        return state;
    }
  }, 0);
  return (
    <div>
      当前值：{number}
      {/* 派发更新 */}
      <button onClick={() => dispatchNumbner({ name: "add" })}>增加</button>
      <button onClick={() => dispatchNumbner({ name: "sub" })}>减少</button>
      <button onClick={() => dispatchNumbner({ name: "reset", payload: 666 })}>赋值</button>
      <button onClick={() => dispatchNumbner({ name: "111" })}>不变</button>
    </div>
  );
};

export default DemoUseReducer;
