<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="430"
    trigger="click"
  >
    <template #reference>
      <div class="result">
        <div style="margin-right: 3px">{{ result }}</div>
        <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="15">
          <el-select
            placeholder="请搜索"
            size="small"
            @change="changeSelect"
            filterable
            :filter-method="filterMethods"
            v-model="selectValue"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <!-- 循环对象 -->
          <!-- <div v-for="(value, key) in cities">
          {{ key }}
        </div> -->
          <div
            @click="clickChart(item)"
            class="city-item"
            v-for="(item, index) in Object.keys(cities)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities" ::key="key">
            <el-row style="margin-bottom: 10px" :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  @click="clickItem(item)"
                  class="city-name-item"
                  v-for="item in value"
                  :key="item.id"
                >
                  <div>{{ item.name }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            @click="clickChart(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="(item1, index1) in item" :key="index1">
              <el-row style="margin-bottom: 10px" :id="item1.id">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21" class="province-name">
                  <div
                    class="province-name-item"
                    v-for="(item2, index2) in item1.data"
                    :key="index2"
                    @click="clickProvince(item2)"
                  >
                    <div>{{ item2 }}</div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import city from '../lib/city'
import province from '../lib/province.json'
import { City } from './types'

let result = ref<string>('请选择')
let visible = ref<boolean>(false)
let radioValue = ref<string>('按城市')
let selectValue = ref<string>('')
const cities = ref(city.cities)
const provinces = ref(province)
const options = ref<City[]>([])
// 所有城市数据
const allCity = ref<City[]>([])

onMounted(() => {
  const values = Object.values(cities.value).flat(2)
  options.value = values
  allCity.value = values
})

const emits = defineEmits(['changeCity', 'changeProvince'])

// 点击字母
const clickChart = (item: string) => {
  let el = document.getElementById(item)
  if (el) el.scrollIntoView()
}
// 点击城市
const clickItem = (item: City) => {
  result.value = item.name
  visible.value = false
  emits('changeCity', item)
}

// 点击省份
const clickProvince = (item: string) => {
  result.value = item
  visible.value = false
  emits('changeProvince', item)
}

const filterMethods = (val: string) => {
  const values = Object.values(cities.value).flat(2)

  if (val === '') {
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter((item) => {
        return item.name.includes(val)
      })
    }
  }
}

const changeSelect = (val: number) => {
  const item = allCity.value.find((item) => item.id === val)!
  result.value = item.name
  if (radioValue.value === '按城市') {
    emits('changeCity', item)
  } else {
    emits('changeProvince', item, name)
  }
}
</script>

<style scoped lang="scss">
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
svg {
  width: 1rem;
  height: 1rem;
  transition: all 0.25s;
}
.rotate {
  transform: rotate(180deg);
}
.container {
  padding: 6px;
}
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
  }
}

.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>
