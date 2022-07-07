<template>
  <div :class="{ 'm-choose-icon-dialog-body-height': isScroll }">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <m-form
          @on-change="onChange"
          @before-upload="onBeforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
          ref="form"
          :options="options"
          label-width="100px"
        >
          <!-- 使用上传插槽 -->
          <template #uploadArea>
            <!-- 再向外预留插槽 -->
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <!-- 再向外预留插槽 -->
            <slot name="uploadTip"></slot>
          </template>
        </m-form>
      </template>
      <!-- el-dialog的内部插槽 -->
      <template #footer>
        <!-- 预留给外部的插槽 -->
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue'
import { FormOptions, FormInstance } from '../../form/src/types/types'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // 配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 只在屏幕区域内滚动
  isScroll: {
    type: Boolean,
    default: false,
  },
  // 处理上传事件
  onChange: {
    type: Function,
  },
  onBeforeUpload: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
})

const form = ref<FormInstance>()

const emits = defineEmits(['update:visible'])

const dialogVisible = ref<boolean>(props.visible)

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)

// 弹窗关闭后 dialogVisible.value 变为了 false 但是父组件的值没变还是true
watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)
</script>

<style scoped lang="scss"></style>
