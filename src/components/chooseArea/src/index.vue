<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      style="margin: 0 10px"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      >
      </el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

export interface AreaItem {
  name: string
  code: string
  children?: AreaItem[]
}

export interface Data {
  name: string
  code: string
}

let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
// 获取所有数据
let areas = ref(allAreas)
// 城市选择下拉
let selectCity = ref<AreaItem[]>([])
// 区域选择下拉
let selectArea = ref<AreaItem[]>([])

// 分发事件给父组件
const emits = defineEmits(['change'])

// 监听选择省份
watch(province, (val) => {
  if (val) {
    let cities = areas.value.find(
      (item) => item.code === province.value
    )!.children
    selectCity.value = cities
  }
  city.value = ''
  area.value = ''
})

// 监听选择城市
watch(city, (val) => {
  if (val) {
    let area = selectCity.value.find(
      (item: { code: string }) => item.code === city.value
    )!.children!
    selectArea.value = area
  }
  area.value = ''
})

// 监听选择区域
watch(area, (val) => {
  if (val) {
    const provinceData: Data = {
      code: province.value,
      name:
        province.value &&
        allAreas.find((item) => item.code === province.value)!.name,
    }
    const cityData: Data = {
      code: city.value,
      name:
        city.value &&
        selectCity.value.find((item) => item.code === city.value)!.name,
    }
    const areaData: Data = {
      code: val,
      name: selectArea.value.find((item) => item.code === area.value)!.name,
    }
    emits('change', {
      provinceData,
      cityData,
      areaData,
    })
  }
})
</script>

<style lang="scss" scoped></style>
