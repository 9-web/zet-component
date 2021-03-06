
### zet-component
> 提供zet组件，在`antd`基础上做了一层封装,包含基础组件(components)和业务组件(bcomponents)


### 特性
1. 按需加载
2. 支持国际化


### 安装
> `yarn`和`npm`都可以安装依赖，建议用一种方式，不要混装
```
(yarn || npm) install zet-component
```

### 示例
```
import { Resource } from 'zet-component';
ReactDOM.render(<DatePicker>);
```


### 链接
[首页](https://9-web.github.io/zet-component/#/) (文档地址)

### 依赖

[react-powerplug](https://github.com/renatorib/react-powerplug) (提供了可插拔无渲染组件)

[docz](https://github.com/pedronauck/docz) (书写文档和React组件预览工具)

[umi-plugin-library](https://github.com/umijs/umi-plugin-library) (基于umi组件库开发工具，为组件开发提供全套方案，专注库开发)

[lerna](https://github.com/lerna/lerna) (monorepo 管理工具)


### 项目结构

##### 框架目录

  ```
  ├── bcomponents      存放我们的业务组件
  ├── components       存放基础组件
  │   ├── resource       资源组件
  │   └── tag            标签组件 
  ├── index.js         入口文件
  ├── style            样式文件
  │   ├── index.js        
  │   ├── index.less      入口样式
  │   ├── minxins         less minxins
  │   └── themes          默认主题
  ├── utils            工具目录
  │   └── utils.js     工具类
  ```

##### 组件目录

```
├── resource                  resource组件文件夹
│   ├── index.js                入口文件
│   ├── index.less              less描述文件
│   ├── index.mdx               文档和案例
│   ├── resource.js             组件内容
│   ├── resourceContext.js      组件内容
│   └── resourceGroup.js        组件内容
└── tag                       tag组件
    ├── index.js                入口文件
    └── index.mdx               文档和案例
```

### 本地开发
```
$ git clone git@github.com:9-web/zet-component.git
$ cd zet-component
$ yarn bootstrap
$ yarn dev
```

### 命令操作
* `yarn bootstrap` 安装项目依赖
* `yarn dev` 启动开发环境
* `yarn build` 构建组件产物
* `yarn build:watch` 文件改变自动构建组件产物
* `yarn build:doc` 构建组件文档产物
* `yarn deploy:doc` 把文档产物发布到github pages上
* `yarn publish` 发布组件到npm仓库上
* `yarn deploy` 构建组件并并把组件发布到npm仓库上