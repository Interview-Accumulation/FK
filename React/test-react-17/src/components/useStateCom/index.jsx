import React, {useState, useRef, useEffect} from 'react'
import { Button } from 'antd'

 const Index = () =>  {
    console.log('render');
    
    const [count, setCount] = useState(0)
    const countRef = useRef(count)
    const [name, setName] = useState("张三");

    const log = () => {
        setTimeout(() => {
            alert(count)
        }, 3000)
    }
    const refLog = () => {
        setTimeout(() => {
            alert(countRef.current)
        }, 3000)
    }
    const handleName = () => {
        setName(name + '~')
        setName(name + '~')
        setName(name + '~')
        console.log(name);
      }
      const handleName2 = () => {
        setName( pre => pre + '~')
        setName( pre => pre + '~')
        setName( pre => pre + '~')
        console.log(name);
      }
      const handleName3 = (e) => {
        // 此处的name是闭包的name，不是最新的name，先显示张三~，然后在现实张三！
        // 这是由于函数组件的闭包特性，setTimeout中的中的name为变更之前的name
        
        setName(name + '~')
        setTimeout(() => {
            setName(name + '!')
            setName(name + '!')
            setName(name + '!')
            console.log(name);
            console.log(e.target);
        }, 1000);
      }
    useEffect(() => {
        countRef.current = count
    }, [count])
    // 依赖变化时，会执行新的effect的第一个函数，然后执行旧的effect返回的destroy函数
    useEffect(() => {
        console.log('count------');
        return () => {
            console.log('count unmount');
        }
    }, [count])
    console.log('render')
  return (
    <div>
        <div>{count}</div>
        <Button onClick={() => setCount(count + 1)}>add</Button>
        <Button onClick={log}>log</Button>
        <Button onClick={refLog}>refLog</Button>
          <Button onClick={handleName}>{name}</Button>
          <Button onClick={handleName2}>{name}</Button>
          <Button onClick={handleName3}>{name}</Button>
    </div>
  )
}
export default Index;
