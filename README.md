# dva-admin
# 灵感来源
[antd-admin](https://github.com/zuiidea/antd-admin)
不过大部分组件是通过自己的方式实现。

# 技术栈

[![React](https://img.shields.io/badge/react-^15.6.1-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.11.2-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![dva](https://img.shields.io/badge/dva-^1.2.0-orange.svg?style=flat-square)](https://github.com/dvajs/dva)

[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/zuiidea/antd-admin)


## 特性

-   仅需几步简单配置就能调出一个CURD页面！

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 实现的企业级后台管理系统
-   基于Ant design UI框架，提供后台管理系统常见使用场景。
-   基于[dva](https://github.com/dvajs/dva)实现根据路由动态加载model，组件。
-   使用[roadhog](https://github.com/sorrycc/roadhog)本地调试和构建，使用Mock.js实现后端接口的API，使用RESTFUL架构进行前后端数据通信。
-   浅度响应式设计。




## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /mock/           # 数据mock
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口        
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── commonFunc.js     # 公共使用的工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.css      # 入口的css
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
├── .roadhogrc.mock.js # mock.js 汇总文件
├── .roadhogrc.js    # roadhog配置
└── webpack.config.js # 项目配置文件

```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Layout`）。

-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹（如`./src/routes/users/`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）。

### 快速开始

克隆项目文件:

    git clone https://github.com/kkkkzero00/dva-admin.git

进入目录安装依赖:

    npm i 或者 yarn install

开发：

```bash
npm run dev
打开 http://localhost:8000
```

构建：

```bash
npm run build

将会生成dist目录
```

代码检测：

```bash
npm run lint
```


## 后台
该框架目前需要连接thinkphp5 框架的后台
后台逻辑处理部分 请移步到这个路径 <https://github.com/kkkkzero00/TP5Admin> 配合使用



## 参考

用户列表：<https://github.com/dvajs/dva/tree/master/examples/user-dashboard>

dashboard设计稿：<https://dribbble.com/shots/3108122-Dashboard-Admin> 

## 賬號和密碼
    account: 123123
    pw:admin

    account: 456456
    pw:guest

## 截图

![](http://p5xjqxkm5.bkt.clouddn.com/dva-demo3.gif)

### 手機端
![](http://p5xjqxkm5.bkt.clouddn.com/dva-demo4.png)

### 客戶端
![](http://p5xjqxkm5.bkt.clouddn.com/dva-demo1.png)

![](http://p5xjqxkm5.bkt.clouddn.com/dva-demo2.png)
