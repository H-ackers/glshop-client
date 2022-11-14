# glwm

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##  vue项目引入背景图报Module not found: Error: Can't resolve '../../common/stylus/images/stars/star48_on@3x.png' in 'E:\WEB_BASIC\VUE\glwm\src\pages\MSite'错误
- 路径明明是 `'./images/stars/star48_on@3x.png'`,为什么解析后会变成`'../../common/stylus/images/stars/star48_on@3x.png'`呢?去查资料 很快找到了解决办法

  ```stylus
  bg-image('./images/stars/star48_on')
  ```
  改为

  ```stylus
  bg-image('@~./images/stars/star48_on')
  ```

- 那么问题来了,

  1. 之前这样写为什么没有错? 

     vue2.5及以下版本以上两种写法都没有问题, 2.6就出现这个问题,应该和webpack配置相关 .

     vue2.6用的是webpack4.0

  2. 为什么要这么写? ~和@是什么意思呢?

     webpack资源处理的规则,分为相对路径,没有前缀的路径,带~的路径,相对根目录的路径

     ```css
     1.相对路径  './images/stars/star48_on'
     2.没有前缀的路径  'images/stars/star48_on'   被webpack解析为 相对路径
     3.带~的路径 '~./images/stars/star48_on'    被webpack解析为 require(arc/images/stars/star48_on)  动态引入
     	@在webpack 被resolve.alias配置下等价于/src
     4.相对根目录的路径  '/images/stars/star48_on'  webpack不解析
     ```

##  JavaScript一维数组转二维数组
1. slice截取

   ```js
   function fn(arr, num) {
       let newArr = []
       let arr2 = []
       const total = Math.ceil(arr.length / num)	//	Math.ceil()方法：向上取整
       console.log(total)
       for (let i = 0; i< total; i++) {
           arr2 = arr.slice(i * num, (i + 1) * num)	//	.slice(start, end)方法：从下标start开始（包含start）截取到下标end结束（不包含end）
           newArr.push(arr2)
       }
       return newArr
   }
   
   //	举例
   let arr = [1,2,3,4,5,6]
   console.log(fn(arr,3))
   ```

   说明：

   newArr 用来接收转换的二维数组

   total 代表外层数组需要包含几个内层数组

   slice进行分隔 第一个参数 开始截取的索引 第二个参数 结束的索引 

   把每次截取的数组添加到newArr里

2. splice

   ```js
   function fn(arr, num) {
       let newArr = []
       let arr2 = []
       let copyArr = JSON.parse(JSON.stringify(arr))	//	深拷贝高级代码
       const total = Math.ceil(arr.length / num)
       console.log(total)
       for (let i = 0; i< total; i++) {
           arr2 = copyArr.splice(0, num)
           newArr.push(arr2)
       }
       return newArr
   }
   ```

   说明：

   思路大致一致 只不过这次拿到的是splice的返回值 

   注意直接splice拿到返回值 会改变原数组  相当于把原数组全部删除了，任何情况下最好都不要删除原数组，因为原数组可能还有别的地方要用到哈！

3. 遍历判断

   ```js
   function fn(arr, num) {
       let newArr = []
       arr.forEach((it ,idx) => {
           const total = Math.floor(idx / num)		//	判断当前在第几个数组内
           if(!(newArr[total])){	//	判断当前数组内是否有数组
               newArr[total] = []	//	如果没有赋值一个空数组
           }
           newArr[total].push(it)
       })
       return newArr
   }
   ```

   ![](https://img-blog.csdnimg.cn/img_convert/74f2493bc077a1000d9309b9fff4cc7e.png)
## nextTick

1. 语法：`this.$nextTick(回调函数)` 
2. 作用：在下一次DOM更新结束后执行其指定的回调
3. 什么时候使用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调中执行

## 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁

2. 具体编码：

   ```html
   <keep-alive include="News">		//	让News组件在不展示时也保持挂载
   	<router-view></router-view>
   </keep-alive>
   ```

##  切换变量0 和 1
````js
//  通过位运算符异或^切换状态0和1
num = num ^ 1
````

##  Vue项目中按需引入mint-ui
1. 下载按需打包工具 babel-plugin-component
   ````
   npm i --save-dev babel-plugin-component
   ````
2. 在babel.config.js 文件中添加配置
   ````js
   //   原文件内容
   module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
   }
   //   添加配置后的文件内容
   module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
      ["component",
        {
          "libraryName": "mint-ui",  
          "style": true  
        }
      ]
    ]
   }
   ````

##  多维对象数组转一维对象数组
```js
  // 生成包含所有地区的一维对象数组的方法
  flatten(arr){
    return [].concat(...arr.map(city => {
      return city.districts
      ? [].concat(city.districts, ...this.flatten(city.districts))
      : [].concat()
    }))
  },
```

##  理解Array.prototype.slice.call()方法详解
JavaScript中的Array.prototype.slice.call(arguments)能将有length属性的对象转换为数组(特别注意： 这个对象一定要有length属性). 但有一个例外，IE下的节点集合它不能转换(因为IE下的dom对象是以com对象的形式实现，js对象和com对象不能进行转换)

首先，我们来看看JavaScript中的slice用法， 在JavaScript中Array是一个类，slice是此类中的一个方法，slice的中文意思是 ‘截取’

一个是String.slice  => 返回值是字符串

一个是Array.slice => 返回值是数组

Array.prototype.slice.call(arguments)能够将具有length属性的arguments转换为数组,  我们可以理解为就是 arguments.toArray().slice()

所以，这个过程我们是不是可以理解为 Array.prototype.slice.call(arguments)的实现过程就是把传入进来的具有length属性的第一个参数arguments转换为数组，再调用它的slice（截取）方法

这个Array.prototype.slice.call(arguments) 不单有slice方法，还有call方法。

- 理解第一步:  其中，arguments是一个具有length属性的对象, 通过call 这个方法，把arguments 指向了Array.prototype.slice方法的作用域，也就是说通过call方法，让Array.prototype.slice对arguments对象进行操作

- 理解第二步:  Array.prototype.slice就是对该对象使用Array类的slice方法。但是呢arguments它又不是个Array对象
  ```js
  console.log(typeof arguments) ===> "Object"  //而不是"Array"
  ```
 所以我们没法用arguments.slice()方法，这样是会报错的。 所以这里，我们需要使用Array.prototype.slice， 它的作用就是第一步把arguments转换为一个Array对象，第二步对转换后的Array对象使用slice方法

##  Vue 监视数据的原理：
    (1).vue 会监视 data 中所有层次的数据
    (2).如何监视对象中的数据？
        通过 setter 实现监视，且要在 new Vue() 时就传入要监测的数据
        1).对象中后追加的属性， Vue 默认不做响应处理
        2).如需给后追加的属性做响应式，请使用如下 API
        ```js
          Vue.set(target, propertyName/index, value) 或 vm.$set(target, propertyName/index, value)
        ```
    (3).如何监视数组中的数据？
        通过包裹数据更新元素的方法实现，本质就是做了两件事：
        1).调用原生对应方法对数组进行更新
        2).重新解析模板，更新页面
    (4).在 Vue 中修改数组中的某个元素一定要用如下方法：
        1).使用这些 API：push()、shift()、unshift()、splice()、sort()、reverse()
        2).使用 Vue.set() 或 vm.$set()
    注意：Vue.set() 和 vm.$set() 不能给 实例vm 或 vm的根数据对象添加属性

##  JS reduce()方法详解
- 语法: ```reduce(callback, [initialValue])```
- reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接收四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。
  ```js
    callback （执行数组中每个值的函数，包含四个参数）
      previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
      currentValue （数组中当前被处理的元素）
      index （当前元素在数组中的索引）
      array （调用 reduce 的数组）
      initialValue （作为第一次调用 callback 的第一个参数。）
  ```
##  给输入框加监听事件判断输入法类型
1.  键盘事件
    监听keydown 和 keyup事件是最直接的方法，通过keyCode我们可以获取按键值。
    当输入法是中文时，keyCode都会有一个值等于229，然后才是每个键自己的键值
    ```js
    let my_search = document.getElementById('my_searchbar')
    my_search.addEventListener('keyup', (e) => {
      console.log(e.keyCode==229)   //  true, false
    })
    ```
2.  非直接输入——中文输入法
    监听compositionstart 与 compositionend 事件
    这是一对事件，当非直接输入开始第一个按键的时候，触发compositionstart事件，非直接输入结束的时候触发compositionend事件， 在直接输入情况下，这两个事件都不会触发。
    ```js
    let my_search = document.getElementById('my_searchbar')
    my_search.addEventListener('compositionstart', () => {
      console.log("compositionstart")
      this.$nextTick(()=>{
        this.input_type = 'chinese'   //  设置输入法类型
      })
    })
    if(this.input_type == 'chinese'){
      my_search.addEventListener('keydown', (e) => {
        console.log(e.keyCode==229)
      })
    }
    my_search.addEventListener('compositionend', function () {
      console.log("compositionend")
    })
    ```