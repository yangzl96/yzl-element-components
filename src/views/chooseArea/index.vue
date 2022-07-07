<template>
  <m-choose-area @change="changeArea"></m-choose-area>
</template>

<script setup lang="ts">
const changeArea = (val: any) => {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
