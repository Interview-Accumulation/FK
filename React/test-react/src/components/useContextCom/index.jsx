import React, {useState} from 'react'
import Panel from './Panel';

export const NameContext = React.createContext('');


const Form = () => {
    return (
        <Panel>
            <button>11111</button>
            <button>22222</button>
        </Panel>
    )
}

export default function UseContext() {
    const [name, setName] = useState('张三')
  return (
    <NameContext.Provider value={name}>
        <Form />
        <button onClick={() => setName(name + '~')}>改变name</button>
    </NameContext.Provider>
  )
}

