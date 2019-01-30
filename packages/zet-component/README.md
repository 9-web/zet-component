
### zet-component
> 提供zet组件，在`antd`基础上做了一层封装,包含基础组件(components)和业务组件(bcomponents)


### 特性
1. 按需加载
2. 支持国际化


### 安装
> `yarn`和`npm`都可以安装依赖，建议用一种方式，不要混装
```
(yarn || npm) install zet-component
```

### 示例
```
import { Resource } from 'zet-component';
ReactDOM.render(<DatePicker>);
```

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

### 命令操作
* `yarn dev` 启动开发环境
* `yarn build:doc` 构建文档
* `yarn deploy:doc` 构建文档并发布到github pages
* `yarn build` 构建组件产物
* `yarn build:watch` 文件改变自动构建组件产物


* push test1111
