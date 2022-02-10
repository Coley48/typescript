### Renderer

This is a TS project which based on Three.js.

### TS 项目搭建

```sh
# 初始化 node 项目
npm init -y

# 安装 typescript
npm install --save-dev typescript

# 生成 tsconfig.json 配置文件，并修改响应配置项；
tsc --init

# 安装 webpack，并根据项目添加 webpack 配置文件；
npm install --save-dev webpack webpack-cli webpack-dev-server

# 安装 babel
npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript

# 安装 eslint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy

# 以及 webpack 的其他 loader 和 plugin
npm install --save-dev style-loader css-loader ts-loader babel-loader html-webpack-plugin
```

### TS 笔记

TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
TypeScript 是一门静态类型、弱类型的语言。

npm install typescript

TypeScript 编译的时候即使报错了，还是会生成编译结果。
如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。
[tsconfig.json](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

#### 基础

使用构造函数 Boolean 创造的对象不是布尔值，事实上 new Boolean() 返回的是一个 Boolean 对象：

在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样；

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

接口 interface 在赋值的时候，变量的形状必须和接口的形状保持一致。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
```

IArguments 是 TypeScript 中定义好了的类数组类型

```ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

// 函数类型接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
可选参数后面不允许再出现必需参数了：

剩余参数

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    });
}
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：

类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：

d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除

只有 function、class 和 interface 可以直接(export default)默认导出，其他的变量需要先定义出来，再默认导出：

当构造函数修饰为 private 时，该类不允许被继承或者实例化
当构造函数修饰为 protected 时，该类只允许被继承

类可以实现多个接口`class Car implements Alarm, Light`

接口与接口之间可以是继承关系`interface LightableAlarm extends Alarm`
