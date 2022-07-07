<template>
  <div>
    <div class="flex">
      默认：
      <m-trend text="营业额"></m-trend>
      <m-trend text="销售额" type="down"></m-trend>
    </div>
    <hr />
    <div class="flex">
      图标颜色：
      <m-trend text="营业额" upIconColor="blue"></m-trend>
      <m-trend text="销售额" type="down" downIconColor="black"></m-trend>
    </div>
    <hr />
    <div class="flex">
      反转图标默认颜色：
      <m-trend text="营业额" reverseColor></m-trend>
      <m-trend text="销售额" reverseColor type="down"></m-trend>
    </div>
    <hr />
    <div class="flex">
      文字颜色：
      <m-trend text="营业额" upTextColor="pink"></m-trend>
      <m-trend text="销售额" type="down" downTextColor="red"></m-trend>
    </div>
    <hr />
    <div class="flex">
      自定义图标：
      <m-trend text="营业额" upIcon="caretTop"></m-trend>
      <m-trend text="销售额" type="down" downIcon="caretBottom"></m-trend>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.flex {
  display: flex;
  div {
    margin-right: 10px;
  }
}
</style>
