import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { observer } from 'mobx-react-lite'
import { makeAutoObservable, action, autorun, computed, configure, runInAction, when, reaction } from 'mobx'
// import './es6/decorator'
// 配置 MobX
// configure({ enforceActions: 'never' }); // 可选配置
// 监视数据的方式reaction.dispose不生效了
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
  change(countValue) {
    this.count = countValue
    this.price = 2
  }

  @action asyncChange() {
    setTimeout(() => {
      // 异步修改的方式
      // 1.在class定义action函数
      this.change(101)
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
// 类比vue的watchEffect 默认会执行一次 当内部所依赖的被观测数据发生变化的时候会执行
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

// when 当count>100的时候，执行一次自定义逻辑
when(
  () => {
    return store.count > 100
  },
  () => {
    console.log('count > 100')
  }
)

// reaction 只有当被观察的数据发生改变的时候才会执行，先执行第一个函数 第一个函数的返回结果 给第二个函数 在执行第二个函数
reaction(
  () => {
    // 执行一些业务操作，返回数据给下一个函数使用
    return store.count
  },
  (data, reaction) => {
    console.log('reaction', data)
    // // 监视数据的方式reaction.dispose不生效了
    // reaction.dispatch()
  }
)

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
