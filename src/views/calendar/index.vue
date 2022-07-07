<template>
  <m-calendar
    :events="events"
    @dateClick="dateClick"
    @eventClick="eventClick"
    :eventContent="eventContent"
    displayEventEnd
  ></m-calendar>
</template>

<script setup lang="ts">
import { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import { EventItem } from '../../components/calendar/src/types'
import { ref } from 'vue'

const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2022-07-06 10:00',
    end: '2022-07-06 12:00',
    editable: true,
  },
  {
    title: '编码',
    start: '2022-07-07 06:00',
    end: '2022-07-07 15:00',
    editable: true,
  },
])
// 日历点击
const dateClick = (info: DateClickArg) => {
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '打游戏',
  })
}
// 事件点击
const eventClick = (info: EventClickArg) => {
  console.log(info)
}
// 自定义事件显示内容
const eventContent = (arg: EventContentArg) => {
  const el = document.createElement('div')
  const timeTextArr = arg.timeText.split('-')
  const start = timeTextArr[0].replace('时', '')
  const end = timeTextArr[1].replace('时', '')
  el.innerHTML = `
          <img src="src/assets/logo.png" width="30" height="30" />
          <div>开始时间：${start}</div>
          <div>结束时间：${end}</div>
          <div>标题：${arg.event._def.title}</div>
        `
  return {
    domNodes: [el],
  }
}
</script>

<style scoped lang="scss"></style>
base
