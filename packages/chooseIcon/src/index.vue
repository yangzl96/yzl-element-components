<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(ELIcons)"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="text">
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="icon">
            {{ item }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import * as ELIcons from '@element-plus/icons'
import { toLine } from '../../utils/index'
import { watch, ref } from 'vue'
import { useCopy } from '../../hooks/useCopy'
let props = defineProps<{
  // 标题
  title: string
  // 显影
  visible: boolean
}>()
// 拷贝一份父组件传递过来的visible ,不想直接改变父组件的值
let dialogVisible = ref<boolean>(props.visible)
let emits = defineEmits(['update:visible'])

const handleClick = () => {
  emits('update:visible', !dialogVisible.value)
}

const clickItem = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
  useCopy(text)
  dialogVisible.value = false
}

// 将组件的显影控制在组件内部

// 监听父组件传的visibles
watch(
  () => props.visible,
  (val) => {
    // 赋值给自身 不修改父组件的值
    dialogVisible.value = val
  }
)
// 监听自身的
// 弹窗关闭的时候已经是false了，这里再调一个update，更新父组件的值
watch(
  () => dialogVisible.value,
  (val) => {
    // 通知父组件修改
    emits('update:visible', val)
  }
)
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    height: 70px;
  }
}
svg {
  width: 2rem;
  height: 2rem;
}
</style>
