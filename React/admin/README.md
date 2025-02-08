# ADMIN

### 技术栈、工具库
- [vite](https://vitejs.cn/vite3-cn/)
- [react](https://react.dev/)
- [antd](https://ant.design/docs/react/introduce-cn)
- tailwind 用于样式
- msw、faker.js 用于mock
- i18next 国际化
- zustand用于状态管理
- 权限-->动态路由表：后端接口返回用户角色(权限)，动态生成路由表

### 项目规范
- eslint 用于校验代码格式规范,用以下文件规范
    - `.eslintrc.cjs`
    - `.eslintignore`
- prettier 代码格式化
    - `.prettierrc`
    - `.prettierignore`
- stylelint 用于校验 css/less 规范
    - `.prettierrc`
    - `.prettierignore`
- commitlint 用于校验 git 提交信息规范
```js
export default {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    'body-leading-blank': [2, 'always'], // 确保提交消息正文之前有一行空白行
    'type-empty': [2, 'never'], // 不允许提交消息的 type 类型为空
    'subject-case': [0], // subject 大小写不做校验
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚commit
        'build', // 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)',
        'ci', // 修改CI配置、脚本
        'types', // 类型定义文件修改
        'wip', // 开发中
      ],
    ],
  },
};
```
- husky：能够监听 git hooks 的 nodejs 包，让 nodejs 开发者处理 git hooks 任务变得更加容易
- lint-staged：可以将 git 的“已暂存(staged)”的文件作为参数传入你要执行的 shell script 之中

### 路由
在`src/router/routes/modules`目录下的`.tsx`文件会被视为一个路由模块，可通过`src/router/routes/utils.ts`中的 `getRoutesFromModules()`函数自动注册到路由表中。

### 权限
菜单权限由后端返回动态路由表，通过`usePermissionRoutes` hook生生成前端路由表，后端路由表参考：`src/_mock/assets.js`


### 问题记录：
在使用tailwind时，若需要使用postcss，执行以下命令：
```shell
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
在初始化后可能不会生成`postcss.config.js`文件，这是需要手动添加，按照[官网](https://www.tailwindcss.cn/docs/installation/using-postcss)配置即可

