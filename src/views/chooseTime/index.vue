<template>
  <m-chooseTime
    @startChange="startChange"
    @endChange="endChange"
    :startOptions="startOptions"
  ></m-chooseTime>
  <div style="margin-bottom: 20px"></div>
  <m-choose-date
    @startChange="startDateChange"
    @endChange="endDateChange"
  ></m-choose-date>
</template>

<script setup lang="ts">
interface endValue {
  startTime: string
  endTime: string
}
interface endDateValue {
  startDate: Date
  endDate: Date
}
// 时间选择
const startChange = (val: string) => {
  console.log(val)
}

const endChange = (val: endValue) => {
  console.log(val)
}

const startOptions = {
  clearable: false,
  size: 'mini',
}

// 日期选择
const startDateChange = (val: string) => {
  console.log(val)
}

const endDateChange = (val: endDateValue) => {
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
