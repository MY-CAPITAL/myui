<h1 align="center" style="margin: 30px 0 35px;">myui</h1>

- 包含一些纯CSS控件
- 每个组件都是一个.vue格式的单文件，并且尽量减少代码量，结构简单，方便阅读和理解以及自行修改源码
- 尽量使用最新的技术实现

### 开发
Vue组件和Less文件是分开编译的。

常规组件开发：`npm run serve`

扩展组件开发：`npm run serveExtension`

less编译：`npm run gulp` 或者 `npx gulp` 或者 配置WebStorm的`FileWatchers`代替gulp

访问：http://localhost:10001

### 使用方法
- 第一种：引入已编译的js文件，这样可以使用所有的组件
```
<head>
<link href="path/to/myui.min.css" rel="stylesheet">
<script src="path/to/vue.min.js">
<script src="path/to/myui.min.js" defer>
</head>
<body>
<div id="app">
  <v-input></v-input>
</div>
<script>
  new Vue({
    el: '#app'
  })
</script>
</body>
```


#### Basic
- 左右布局
- 按钮：Button.vue
- 复选框：Checkbox.vue
- 日期选择器：DatePicker.vue
- 图标：Icon.vue
- 菜单：Menu.vue
- 提示：Message.vue
- 模态框：Modal.vue
- 分页：Pagination.vue
- 弹出窗口：Popup.vue
- 进度条：Progress.vue
- 密码强度验证：PwdStrength.vue
- 单选框：Radio.vue
- 搜索框：Search.vue
- 高级下拉列表：Select.vue
- 开关：Switch.vue
- Tab页：Tab.vue
- 表格：Table.vue
- 选择文件按钮：Upload.vue
- 徽标（CSS）：v-badge
- Tooltip：Tooltip.vue

#### Extension
- 收缩菜单：Collapse.vue
- 图片倒影：ImgReflex.vue
- HTML5富文本编辑器：HtmlEditor.vue
- 中国省市选择器：SelectCity.vue
- 步骤：Step.vue
- 标签选择：Tag.vue
