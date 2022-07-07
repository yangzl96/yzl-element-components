<template>
  <m-table
    @confirm="check"
    @cancel="close"
    :data="tableData"
    :options="options"
    paginationAlign="center"
    v-model:editRowIndex="editRowIndex"
    isEditRow
    pagination
    @sizeChange="sizeChange"
    @currentChange="currentChange"
    :total="total"
  >
    <template #date="{ scope }">
      <el-icon-timer></el-icon-timer>
      {{ scope.row.date }}
    </template>
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <!-- 操作列 -->
    <template #action="{ scope }">
      <el-button size="small" type="primary" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button size="small" type="danger" @click="del(scope)">删除</el-button>
    </template>
    <!-- 编辑行后自定义显示 -->
    <template #editRow="{ scope }">
      <el-button size="small" type="primary">确认</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </template>
    <!-- 自定义编辑单元格按钮 -->
    <!-- <template #editCell="{ scope }">
      <div style="display: flex; margin-left: 8px">
        <el-button size="mini" type="primary" @click="confirm(scope)"
          >确认</el-button
        >
        <el-button size="mini">取消</el-button>
      </div>
    </template> -->
  </m-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { TableOptions } from '../../components/table/src/types'

interface TableData {
  date: string
  name: string
  address: string
}

const tableData = ref<TableData[]>([])
// 点击的标识
let editRowIndex = ref<string>('')
// 分页
let current = ref<number>(1)
let pageSize = ref<number>(10)
const total = ref<number>(0)

onMounted(() => {
  getData()
})

const getData = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      tableData.value = res.data.data.rows
      total.value = res.data.data.total
    })
}

const currentChange = (val: number) => {
  current.value = val
  getData()
}

const sizeChange = (val: number) => {
  console.log(val)
  pageSize.value = val
  getData()
}

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true,
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true,
  },
  {
    label: '操作',
    align: 'center',
    action: true,
    prop: 'action',
  },
]

const edit = (scope: any) => {
  editRowIndex.value = 'edit'
}

const del = (scope: any) => {
  // editRowIndex.value = 'del'
}

const check = (scope: any) => {
  console.log(scope)
}

const close = (scope: any) => {
  console.log(scope)
}

const confirm = (scope: any) => {
  console.log(scope)
}
</script>

<style scoped lang="scss">
svg {
  width: 1rem;
  height: 1rem;
}
</style>
