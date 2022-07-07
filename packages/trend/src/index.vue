<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <!-- <el-icon-arrowup
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
        v-if="type === 'up'"
      ></el-icon-arrowup>
      <el-icon-arrowdown
        :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
        v-else
      ></el-icon-arrowdown> -->
      <component
        v-if="type === 'up'"
        :is="`el-icon-${toLine(upIcon)}`"
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
      ></component>
      <component
        v-else
        :is="`el-icon-${toLine(downIcon)}`"
        :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { toLine } from '../../utils'
let props = defineProps({
  type: {
    type: String,
    default: 'up',
  },
  // 趋势文字
  // 1. 父组件传递
  // 2. 插槽
  text: {
    type: String,
    default: '',
  },
  // 上升图标
  upIcon: {
    type: String,
    default: 'ArrowUp',
  },
  // 下降图标
  downIcon: {
    type: String,
    default: 'ArrowDown',
  },
  // 上升颜色
  upIconColor: {
    type: String,
    default: '#f5222d',
  },
  // 下降颜色
  downIconColor: {
    type: String,
    default: '#52c41a',
  },
  // 上升文字颜色
  upTextColor: {
    type: String,
    default: '#000',
  },
  // 下降文字颜色
  downTextColor: {
    type: String,
    default: '#000',
  },
  // 反色反转 只在默认颜色上生效
  reverseColor: {
    type: Boolean,
    default: false,
  },
})
const slots = useSlots()
const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  .icon {
    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
