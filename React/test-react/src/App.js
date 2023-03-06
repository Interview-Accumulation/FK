import logo from './logo.svg';
import './App.css';
import StateComponent from './components/stateCom'
import MemoFunc from './components/useMemoCom';
import {useState, useMemo} from 'react'

function App() {
  const [list, setList] = useState([{name: 'k'},{name: 'F'}])
  // const MemoCom = useMemo(()=> (<MemoFunc list={list}/>),[list])

  const addMemoList = () => {
    setList([...list, {name: 'kkk'}])
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StateComponent />
        <button onClick={addMemoList}>addMemo</button>
        {/* <MemoCom /> */}
        {useMemo(()=> (<MemoFunc list={list}/>),[list])}
      </header>
      
    </div>
  );
}

export default App;
