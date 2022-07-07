<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom'
import { onMounted, ref, PropType, watch } from 'vue'
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import { EventItem } from './types'

const props = defineProps({
  // 语言
  local: {
    type: String,
    default: 'zh-cn',
  },
  // 视图模式
  initalValue: {
    type: String,
    default: 'dayGridMonth',
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月',
      }
    },
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next',
      }
    },
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => {},
  },
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  // 日历显示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  // 自定义渲染日历内容
  eventContent: {
    type: Function,
  },
})

const calendar = ref<Calendar>()
const emits = defineEmits(['dateClick', 'eventClick'])

onMounted(() => {
  renderCalendar()
})

// 渲染日历
const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initalValue,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      buttonText: props.buttonText,
      displayEventEnd: props.displayEventEnd,
      // 自定义渲染事件内容
      eventContent: props.eventContent,
      // 事件源
      eventSources: [
        {
          // 渲染日历的事件
          events(e, callback) {
            if (props.events.length) callback(props.events)
            else callback([])
          },
        },
      ],
      // 事件点击
      eventClick(info: EventClickArg) {
        emits('eventClick', info)
      },
      // 点击日历上的某一天
      dateClick(info: DateClickArg) {
        emits('dateClick', info)
      },
    })
    calendar.value.render()
  }
}

// 监听事件源的变化
watch(
  () => props.events,
  () => {
    renderCalendar()
  },
  {
    deep: true,
  }
)
</script>

<style scoped lang="scss"></style>
