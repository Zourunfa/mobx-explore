import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { observer } from 'mobx-react-lite'
import { makeAutoObservable, action, autorun, computed, configure, runInAction } from 'mobx'
// import './es6/decorator'
// 配置 MobX
// configure({ enforceActions: 'never' }); // 可选配置

// 开启使用action严格 修改
configure({
  enforceActions: 'observed',
})
// 1. 初始化 MobX 容器仓库
class Store {
  count = 3
  price = 10
  // 和vue的一模一样
  @computed get totalPrice() {
    return this.price * this.count
  }
  constructor() {
    makeAutoObservable(this)
  }

  @action
  increament() {
    this.count++
  }

  @action
  change() {
    this.count = 10
    this.price = 2
  }

  @action asyncChange() {
    setTimeout(() => {
      // 异步修改的方式
      // 1.在class定义action函数
      this.change()
      // 2.直接调用action函数
      action('changePrice', () => {
        this.price = 123123
      })()
      // 3.使用runInAction包裹
      runInAction(() => {
        this.count = 100
      })
    }, 1000)
  }
}
const store = new Store()
// 类比vue的watchEffect
autorun(() => {
  // 当store.count发生变化时，会触发该函数
  console.log('count:', store.count)
  console.log('price:', store.price)
})

// 直接修改会多次触发autorun,所以用装饰action change避免 ,还可以用runInAction包裹
store.count = 20
store.price = 20

runInAction(() => {
  store.count = 20
  store.price = 20
})

store.asyncChange()
// 在组件中使用 MobX 容器状态
const App = observer(({ store }) => {
  return (
    <div>
      <h1>{store.count}</h1>
      <button onClick={() => store.increament()}>increament</button>
      <p>Total price: {store.count * store.price}</p>
      <p>Total price: {store.count * store.price}</p>
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
