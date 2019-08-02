# laboratory

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录结构

```
·
|-- build              （打包配置相关，无必要请勿动）
|-- conifg             （打包配置相关，无必要请勿动）
|-- dist               （发布）
|-- mock               （mock接口相关  待议）
|-- node_modules       （node 依赖）
|-- assets             （静态资源文件，图片，css，不走编译  待议）
|-- src                （工程目录）
    |-- assets         （动态资源文件，图片，css，每次都会走编译）
    |-- plugins        （引用的全局插件）
    |-- components     （全局公用组件）
        |--business    （全局业务组件）
        |--common      （全局公共组件）
        |--index        （组件导入）
    |-- config         （项目请求配置）
    |-- view            (页面逻辑）
        | -- LadManage  (实验室管理员)
    |-- style           (样式存放地)
    |-- model          （定义公共基类  位置，动画等）
    |-- routes         （路由配置）
    |-- store          （全局的 store 如登录信息）
    |-- utils          （工具层）
    |-- app.vue        （根vue节点）
    |-- main.js        （业务的根节点 js）

```