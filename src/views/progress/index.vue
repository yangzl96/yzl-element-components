<template>
  <m-progress isAnimation :percentage="60"></m-progress>
  <div style="height: 20px"></div>
  <m-progress
    isAnimation
    :text-inside="true"
    :stroke-width="24"
    :percentage="60"
    status="warning"
  ></m-progress>
  <div style="height: 20px"></div>
  <m-progress isAnimation type="circle" :percentage="60"></m-progress>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
