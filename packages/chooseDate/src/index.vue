<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-date-picker
        :placeholder="startPlaceholder"
        :disabledDate="startDisabledDate"
        v-model="startDate"
        type="date"
      >
      </el-date-picker>
    </div>
    <div>
      <el-date-picker
        :placeholder="endPlaceholder"
        v-model="endDate"
        type="date"
        :disabled="endDateDisabled"
        :disabledDate="endDisabledDate"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  // 开始时间占位符
  startPlaceholder: {
    type: String,
    default: '请选择开始时间',
  },
  // 结束时间定义
  endPlaceholder: {
    type: String,
    default: '请选择结束时间',
  },
  // 是否禁用今天之前的
  disableToday: {
    type: Boolean,
    default: true,
  },
})

let startDate = ref<Date | null>(null)
let endDate = ref<Date | null>(null)
let endDateDisabled = ref<boolean>(true)

// 禁用今天之前的日期
const startDisabledDate = (time: Date) => {
  if (props.disableToday)
    // 小于当前时间 - 一天的时间 不可选
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
}

// 禁用结束日期的函数
const endDisabledDate = (time: Date) => {
  if (startDate.value)
    // 小于开始日期 + 1天的时间 不可选
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24
}

const emits = defineEmits(['startChange', 'endChange'])

watch(startDate, (val) => {
  if (!val) {
    endDateDisabled.value = true
    endDate.value = null
  } else {
    endDateDisabled.value = false
    emits('startChange', val)
  }
})

watch(endDate, (val) => {
  if (val) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: val,
    })
  }
})

watch(endDate, (val) => {})
</script>

<style scoped lang="scss"></style>
