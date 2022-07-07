<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :disabled="endTimeDisabled"
      />
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
  // 开始时间的开始选择
  startTimeStart: {
    type: String,
    default: '08:00',
  },
  // 开始时间的步进
  startStep: {
    type: String,
    default: '00:30',
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: '24:00',
  },
  // 结束时间定义
  endPlaceholder: {
    type: String,
    default: '请选择结束时间',
  },
  endTimeStart: {
    type: String,
    default: '08:00',
  },
  endStep: {
    type: String,
    default: '00:30',
  },
  endTimeEnd: {
    type: String,
    default: '24:00',
  },
})

const emits = defineEmits(['startChange', 'endChange'])
// 开始时间
let startTime = ref<string>('')
// 结束时间
let endTime = ref<string>('')
let endTimeDisabled = ref<boolean>(true)

watch(startTime, (val) => {
  if (val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
  } else {
    endTimeDisabled.value = false
    emits('startChange', val)
  }
})

watch(endTime, (val) => {
  if (val !== '') {
    emits('endChange', {
      startTime: startTime.value,
      endTime: val,
    })
  }
})
</script>

<style scoped lang="scss"></style>
