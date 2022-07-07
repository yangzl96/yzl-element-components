<template>
  <el-popover popper-class="notification-popper-class" placement="bottom" :width="300" trigger="click">
    <!-- 弹出层插槽 -->
    <template #default>
      <!-- 我们实现的插槽 -->
      <slot></slot>
    </template>
    <template #reference>
      <el-badge
        style="cursor: pointer"
        :value="value"
        :max="max"
        :is-dot="isDot"
      >
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from '../../utils'
let props = defineProps({
  icon: {
    type: String,
    default: 'Bell',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  max: {
    type: Number,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
svg {
  width:1.2rem;
  height: 1.2rem;
}
</style>
