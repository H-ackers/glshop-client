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

     

