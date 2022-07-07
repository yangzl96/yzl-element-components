<template>
  <!-- <m-notification :value="50"></m-notification>
  <br />
  <br />
  <m-notification :value="50" :max="30"></m-notification>
  <br />
  <br />
  <m-notification :value="50" :max="30" isDot></m-notification>
  <br />
  <br />
  <m-notification :value="50" :max="30" icon="chatRound"></m-notification> -->
  <m-notification :value="50" :max="30" icon="chatRound">
    <template #default>
      <m-list
        @clickItem="clickItem"
        @clickAction="clickAction"
        :list="list"
        :actions="actions"
      ></m-list>
    </template>
  </m-notification>
</template>

<script setup lang="ts">
import { list, actions } from './data'

const clickItem = (val: any) => {
  console.log(val)
}
const clickAction = (val: any) => {
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
