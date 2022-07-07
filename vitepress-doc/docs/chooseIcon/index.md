## 图标选择
用户点击按钮，弹出框显示所有图标，点击图标可以复制图标代码

### 基本用法
<br>
<div style="padding:1rem;margin:1rem;border:1px solid #eee">
  <m-choose-icon title="选择图标" v-model:visible="visible">选择图标</m-choose-icon>
</div>

### 代码示例
<script setup>
  import { ref } from 'vue'

  let visible = ref(false)
</script>

``` js
  <m-choose-icon title="选择图标" v-model:visible="visible">选择图标</m-choose-icon>
  <script setup>
  import { ref } from 'vue'

  let visible = ref(false)
  </script>
```