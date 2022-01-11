# validate-npm-package-name 

学习人：木木

学习时间:date:: 2022.01.04 11:13:21

学习地址：

[VUE ]: https://github1s.com/vuejs/vue-cli/blob/HEAD/packages/@vue/cli/lib/create.js#L8
[vue测试代码]: https://github.com/npm/validate-npm-package-name/tree/main/test
[React]: https://github.com/facebook/create-react-app/blob/2d1829eaf6ff1308da00720fa9984620dd0fb296/packages/create-react-app/createReactApp.js#L850
[validate-npm-package-name]: https://github.com/npm/validate-npm-package-name/blob/main/index.js

概述：

1. 了解 validate-npm-package-name的使用场景和作用；
2. 阅读源码内容。

补充：

- node源码仓库地址：https://github.com/npm
- vue源码仓库地址：https://github1s.com/vuejs/vuex

## 使用场景和作用



### 如何查看运行过程中加载的源码文件？

1. 进入已经创建好的项目中，查看package.json的文件；

2. 在scripts上点击调试，点击build（如图-1）；

   ![image-20220104150048908](C:\Users\POET\AppData\Roaming\Typora\typora-user-images\image-20220104150048908.png)

   ​																							图-1 package.json文件

3. 通过命令：

   ```
   cd .. 
   ```

   （记得cd和..直接有个空格）退出当前文件；

4. 输入命令：

   ```
   vue create project-name
   ```

   选择vue的版本后打开调试窗口（如图-2）。可以看到在已载入的脚本中出现了一个craete.js的源码文件。这个文件就是我们在创建项目中起作用的其中一个文件。

   ![image-20220104145920858](C:\Users\POET\AppData\Roaming\Typora\typora-user-images\image-20220104145920858.png)

   ​																							图-2 调试状态下加载的源文件

### 使用场景和作用总结

**使用场景：**通过查看运行过程中加载的源码文件这一过程可以看出，我们在创建项目的时候会用到validate-npm-package-name这个包。

**作用：**validate-npm-package-name这个包，顾名思义：验证npm包名称。我们在创建项目时，验证我们定义的项目名是否合法。



## 命名规则

- 看下面源码备注





## 源码理解

源码：

```javascript
// 导出validate的包
var validate = module.exports = function (name) {

 var warnings = []

 var errors = []


 // 1.定义命名规则
 if (name === null) {

  errors.push('name cannot be null')

  return done(warnings, errors)

 }

 if (name === undefined) {

  errors.push('name cannot be undefined')

  return done(warnings, errors)

 }

 // 名称必须为字符串
 if (typeof name !== 'string') {

  errors.push('name must be a string')

  return done(warnings, errors)

 }

 if (!name.length) {

  errors.push('name length must be greater than zero')

 }

//不能包含特殊字符
 if (name.match(/^\./)) {

  errors.push('name cannot start with a period')

 }

 // 不能以_（下划线）开头
 if (name.match(/^_/)) {

  errors.push('name cannot start with an underscore')

 }

 if (name.trim() !== name) {

  errors.push('name cannot contain leading or trailing spaces')

 }
 
 // 错误信息
  blacklist.forEach(function (blacklistedName) {
    if (name.toLowerCase() === blacklistedName) {
      errors.push(blacklistedName + ' is a blacklisted name')
    }
  })

  // Generate warnings for stuff that used to be allowed

  // npm中的核心包名一致
  builtins.forEach(function (builtin) {
    if (name.toLowerCase() === builtin) {
      warnings.push(builtin + ' is a core module name')
    }
  })

  // really-long-package-names-------------------------------such--length-----many---wow
  // 长度不能超过214
  if (name.length > 214) {
    warnings.push('name can no longer contain more than 214 characters')
  }

  // mIxeD CaSe nAMEs
  if (name.toLowerCase() !== name) {
    warnings.push('name can no longer contain capital letters')
  }

 // 不能包含特殊字符
  if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
    warnings.push('name can no longer contain special characters ("~\'!()*")')
  }
  
  // 不能跟包名一致
  if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package
    var nameMatch = name.match(scopedPackagePattern)
    if (nameMatch) {
      var user = nameMatch[1]
      var pkg = nameMatch[2]
      if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
        return done(warnings, errors)
      }
    }

    errors.push('name can only contain URL-friendly characters')
  }

  return done(warnings, errors)
}

validate.scopedPackagePattern = scopedPackagePattern

var done = function (warnings, errors) {
  var result = {
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    validForOldPackages: errors.length === 0,
    warnings: warnings,
    errors: errors
  }
  if (!result.warnings.length) delete result.warnings
  if (!result.errors.length) delete result.errors
  return result
}
```





## 测试

```javascript
'use strict'

var validate = require('..')
var test = require('tap').test

test('validate-npm-package-name', function (t) {
  // Traditional

  t.deepEqual(validate('some-package'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('example.com'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('under_score'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('period.js'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('123numeric'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('crazy!'), {
    validForNewPackages: false,
    validForOldPackages: true,
    warnings: ['name can no longer contain special characters ("~\'!()*")']
  })

  // Scoped (npm 2+)

  t.deepEqual(validate('@npm/thingy'), {validForNewPackages: true, validForOldPackages: true})
  t.deepEqual(validate('@npm-zors/money!time.js'), {
    validForNewPackages: false,
    validForOldPackages: true,
    warnings: ['name can no longer contain special characters ("~\'!()*")']
  })

  // Invalid

  t.deepEqual(validate(''), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name length must be greater than zero']})

  t.deepEqual(validate(''), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name length must be greater than zero']})

  t.deepEqual(validate('.start-with-period'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name cannot start with a period']})

  t.deepEqual(validate('_start-with-underscore'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name cannot start with an underscore']})

  t.deepEqual(validate('contain:colons'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name can only contain URL-friendly characters']})

  t.deepEqual(validate(' leading-space'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name cannot contain leading or trailing spaces', 'name can only contain URL-friendly characters']})

  t.deepEqual(validate('trailing-space '), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name cannot contain leading or trailing spaces', 'name can only contain URL-friendly characters']})

  t.deepEqual(validate('s/l/a/s/h/e/s'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['name can only contain URL-friendly characters']})

  t.deepEqual(validate('node_modules'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['node_modules is a blacklisted name']})

  t.deepEqual(validate('favicon.ico'), {
    validForNewPackages: false,
    validForOldPackages: false,
    errors: ['favicon.ico is a blacklisted name']})

  // Node/IO Core

  t.deepEqual(validate('http'), {
    validForNewPackages: false,
    validForOldPackages: true,
    warnings: ['http is a core module name']})

  // Long Package Names

  t.deepEqual(validate('ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou-'), {
    validForNewPackages: false,
    validForOldPackages: true,
    warnings: ['name can no longer contain more than 214 characters']
  })

  t.deepEqual(validate('ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou'), {
    validForNewPackages: true,
    validForOldPackages: true
  })

  // Legacy Mixed-Case

  t.deepEqual(validate('CAPITAL-LETTERS'), {
    validForNewPackages: false,
    validForOldPackages: true,
    warnings: ['name can no longer contain capital letters']})

  t.end()
})

```



