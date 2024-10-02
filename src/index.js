import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { observer } from 'mobx-react-lite'
import { makeAutoObservable, action } from 'mobx'
import './es6/decorator'
// 配置 MobX
// configure({ enforceActions: 'never' }); // 可选配置

// 1. 初始化 MobX 容器仓库
class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  @action
  increament() {
    this.count++
  }
}
@fnStore
class MyStore {}
// 添加实例属性
function fnStore(target) {
  target.proptotype.aide = 'baz'
  console.log(target.proptotype, '---target.proptotype')
}

console.log(new MyStore().aide, '---new Store().aide')

// 在组件中使用 MobX 容器状态
const App = observer(({ store }) => {
  return (
    <div>
      <h1>{store.count}</h1>
      <button onClick={() => store.increament()}>increament</button>
    </div>
  )
})

// 在组件中发起 action 修改容器状态
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App store={new Store()} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
