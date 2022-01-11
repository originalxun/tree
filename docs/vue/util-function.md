# vue3-工具函数

学习人：木木

学习时间:date:: 2022.01.09 2045:51

学习地址：

[vue-next源码下载]: https://github.com/vuejs/vue-next
[vue-next源码在线阅读]: https://github1s.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
[vue-next贡献指南]: https://github.com/vuejs/vue-next/blob/master/.github/contributing.md
[跟学链接]: https://juejin.cn/post/6994976281053888519

概述：

1. 如何查看vue-next源码；
2. vue-next中使用的工具函数；
3. 总结与期望

## 准备

### 打包构建代码

源码中该文件为ts文件，因为我自己暂时没有ts的基础。所以需要将ts文件转换为js文件。

环境：node.js：12.22.5、npm：6.14.14

下载玩vue-next文件后，在编译器中打开进入到vue-next目录中。输入命令

```node
-- 构建包名为 shared 的目录（我们只需要运行这个命令）
npm run build shared 

-- 注：构建包名包含run-time的目录
npm run build run-time --all
```

构建完了之后会在shared目录下，新增一个dist目录。在目录中找到 shared.esm-bundle.js文件，这个就是我们想要得到的js文件。构建完了之后我们一起看一下该文件中的一些方法。

![image-20220109210426739](C:\Users\POET\AppData\Roaming\Typora\typora-user-images\image-20220109210426739.png)

### 生成source map调试vue-next源码

**为什么要用Source Map？**

- 源码进行压缩转换，减少文件数量
- 减少http的请求次数
- 减少文件的体积

**什么是Source Map？**

> Source Map就是一个信息文件，里面存储着位置信息。可以理解为转换后的代码位置与转换前的代码位置之间的映射关系。

注：这样会让构建速度变慢。

1.在命令行输入：

```NODE
npm run dev:sourcemap
```

2.在vue-next目录下，找到package.json文件，在文件中的script出添加以下代码。这种方式需要手动再构建一次，将脚本生成。

```javascript
"dev:sourcemap": "node scripts/dev.js --sourcemap"
```

![image-20220109212045915](C:\Users\POET\AppData\Roaming\Typora\typora-user-images\image-20220109212045915.png)

构建完了之后会生成一个vue.global.js的文件。

![image-20220109212307969](C:\Users\POET\AppData\Roaming\Typora\typora-user-images\image-20220109212307969.png)

## 工具函数

### 1.EMPTY_OBJ --- 空对象

```javascript
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
```

> Object.freeze（）方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，也不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze()返回和传入的参数相同的对象。

举个栗子 :chestnut:

```
var obj = {
  prop: function() {},
  foo: 'bar'
};

// 新的属性会被添加, 已存在的属性可能
// 会被修改或移除
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// 作为参数传递的对象与返回的对象都被冻结
// 所以不必保存返回的对象（因为两个对象全等）
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true

// 现在任何改变都会失效
obj.foo = 'quux'; // 静默地不做任何事
// 静默地不添加此属性
obj.quaxxor = 'the friendly duck';
```



### 2.EMPTY_ARR --- 空数组

```javascript
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
```



### 3.NOOP --- 空函数

```javascript
const NOOP = () => { };
```



### 4.NO --- 永远返回false的函数

```javascript
/**
 * Always return false.
 */
const NO = () => false;
```



### 5.isON --- 判断字符串是不是 on 开头，并且 on 后首字母不是小写字母

```javascript
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
```



### 6.isModelListener --- 监听器

判断字符串是不是以onUpdate:开头

```javascript
const isModelListener = (key) => key.startsWith('onUpdate:');
```



### 7.extend --- 继承、合并

```javascript
const extend = Object.assign;
```



### 8.remove --- 移除数组中的一项

```javascript
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
```



### 9.hasOwnProperty --- 判断是否对象本身拥有的属性

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
```



### 10.isArra --- 判断数组

```javascript
const isArray$1 = Array.isArray;
```



### 11.isMap --- 判断是不是Map对象

```javascript
const isMap$1 = (val) => toTypeString$1(val) === '[object Map]';
```



### 12.isSet --- 判断是不是Set对象

```javascript
const isSet$1 = (val) => toTypeString$1(val) === '[object Set]';
```



### 13.isDate --- 判断是不是Date(时间)对象

```javascript
const isDate$1 = (val) => val instanceof Date;
```



### 14.isFUnction --- 判断是不是函数

```javascript
const isFunction$1 = (val) => typeof val === 'function';
```



### 15.isString --- 判断是不是字符串

```javascript
const isString$1 = (val) => typeof val === 'string';
```



### 16.isSymbol --- 判断是不是Symbol

```javascript
const isSymbol = (val) => typeof val === 'symbol';
```

> ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。



### 17.isObject --- 判断是不是对象

```javascript
const isObject$1 = (val) => val !== null && typeof val === 'object';
```



### 18.isPromise --- 判断是不是Promise对象

```javascript
const isPromise = (val) => {
    return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
```

> 含义：promise是异步编程的一种解决方案，比传统的解决方案-- 回调函数和时间，更加合理和强大。简单来说就是一个容器，里面保存着某个未来才会结束的时间（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。 
>
> 特点：
>
> - 对象的状态不受外界影响。
> - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
>
> 三种状态：
>
> - pending（进行中）、
> - fulfilled（已成功）、
> - rejected（已失败）
>
> 详细可以看ES6官网：https://es6.ruanyifeng.com/#docs/promise



### 19.objectToString --- 对象转字符串

```javascript
const objectToString$1 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$1.call(value);
```



### 20.toRawType --- 对象转字符串 截取后几位

```javascript
const toRawType = (value) => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString$1(value).slice(8, -1);
};
```



### 21.isPlainObject --- 判断是不是一个纯粹的对象

```javascript
const isPlainObject$1 = (val) => toTypeString$1(val) === '[object Object]';
```



### 22.isIntegerKey --- 判断是不是数字型的字符串key值

```javascript
const isIntegerKey = (key) => isString$1(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
```



### 23.makeMap && isReservedProp

```javascript
const isReservedProp = /*#__PURE__*/ makeMap(
// the leading comma is intentional so empty string "" is also included
',key,ref,ref_for,ref_key,' +
    'onVnodeBeforeMount,onVnodeMounted,' +
    'onVnodeBeforeUpdate,onVnodeUpdated,' +
    'onVnodeBeforeUnmount,onVnodeUnmounted');

function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}
```

> 

传入一个以逗号分隔的字符串，生成一个map(键值对)，并且返回一个函数检测key值在不在这个map中。第二个参数是小写选型。



### 24.cacheStringFunction 缓存

```javascript
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
```



### 25.hasChanged --- 是否有改变

```javascript
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
```



### 26.invokeArrayFns --- 执行数组里的函数

```javascript
const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
    }
};
```



### 27.def --- 定义对象

```javascript
const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
    });
};
```

> Object.defineProperty可以说是一个非常重要的API（为什么呢?我还不知道）。
>
> Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
>
> 注：应当直接在Object构造器对象上调用此方法， 而不是在任意一个Object类型的实例上调用。
>
> 详细可看ES6官网：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty



### 28.toNumber ---转换为数字

```javascript
const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
```



### 29.getGlobalThis --- 全局对象

```javascript
let _globalThis;
const getGlobalThis = () => {
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof global !== 'undefined'
                            ? global
                            : {}));
};
```



## 总结与期望

一周三次读源码任务赶在了周日的晚上十点多完成，还是有点捉急的。不过还是学到了一些新东西，对源码也有了更深的了解，再提起源码的时候也不会有畏惧心里。唯一不足的是，还是有点赶，并没有还认真的去专研其中的一些思想和写代码的思路。暂时没法将这些东西，与项目相融合。