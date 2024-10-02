/**
 * 装饰器：
 * 对类进行处理的函数
 *
 */
@fn
@fn2(10)
@fn3
// @mixins(Foo)
class MyClass {
  @readonly message = 'Hello'
  @nonumerable bar = 'world'
}

function fn(target) {
  target.foo = 'bar'
}

function fn2(value) {
  return function (target) {
    target.count = value
  }
}
/**
 * 
 * function fnStore(target) {
  // 确保 target 已经是一个构造函数
  if (typeof target === 'function') {
    target.prototype.aide = 'baz';
    console.log(target.prototype, '---target.prototype');
  } else {
    throw new Error('Target must be a constructor function.');
  }
}

// 使用装饰器语法糖
const MyStore = fnStore(class {
  // 类定义
});

console.log(new MyStore().aide, '---new MyStore().aide');
 */
// 添加实例属性
function fn3(target) {
  target.proptotype.aide = 'baz'
  console.log(target.proptotype, '---target.proptotype')
}
console.log(MyClass.foo) // =>bar
console.log(MyClass.count)
console.log(new MyClass().aide) // =>baz

function readonly(target, name, descriptor) {
  console.log(target) //目标类的.prototype
  console.log(name) //被修饰的类成员的名称
  console.log(descriptor) //被修饰的类成员的描述对象
  descriptor.writable = false
}

function nonumerable(target, name, descriptor) {
  descriptor.enumerable = false
}

const c1 = new MyClass()
for (let key in c1) {
  console.log(key, c1[key])
}
// mixins.js

export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
    console.log(target.prototype, '--target.prototype')
  }
}

var Foo = {
  objFn() {
    console.log('objFn')
  },
}

// let obj = new MyClass()
// obj.objFn()
