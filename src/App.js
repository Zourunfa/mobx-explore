import logo from './logo.svg'
import './App.css'

import { observable } from 'mobx'

// 初始化mobx容器仓库
// 在组件种使用mbox容器状态
// 在组件中发起action修改容器状态

class Store {
  @observable count = 0
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
