<template>
  <el-progress :percentage="p"></el-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps({
  // 进度
  percentage: {
    type: Number,
    default: 0,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  // 动画时常
  time: {
    type: Number,
    default: 3000,
  },
})

let p = ref(0)

onMounted(() => {
  // 动画
  if (props.isAnimation) {
    // 每隔多少秒 +1
    let t = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>

<style scoped lang="scss"></style>
