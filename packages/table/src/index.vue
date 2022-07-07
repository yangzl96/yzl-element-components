<template>
  <el-table
    v-bind="$attrs"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :data="tableData"
    @row-click="rowClick"
    v-loading="isLoading"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :align="item.align"
        :prop="item.prop"
        :width="item.width"
      >
        <template #default="scope">
          <!-- 可编辑行操作的 -->
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]"></el-input>
          </template>
          <!-- 没有编辑行操作的 -->
          <template v-else>
            <!-- 显示输入框 -->
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex; align-items: center">
                <el-input
                  size="small"
                  v-model="scope.row[item.prop]"
                ></el-input>
                <div @click.stop="clickEditCell">
                  <!-- 如果写了插槽的内容 v-if="$slots.editCell" 就使用插槽 -->
                  <slot name="editCell" :scope="scope" v-if="$slots.editCell">
                  </slot>
                  <!-- 否则使用预设的 -->
                  <div class="icons" v-else>
                    <el-icon-check
                      class="check"
                      @click="check(scope)"
                    ></el-icon-check>
                    <el-icon-close
                      class="close"
                      @click="close(scope)"
                    ></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <!-- 显示内容 -->
            <template v-else>
              <!-- 自定义显示 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 展示默认文字内容 -->
              <span v-else>{{ scope.row[item.prop] }}</span>
              <!-- 自定义编辑图标 -->
              <component
                @click.stop="clickEdit(scope)"
                class="edit"
                v-if="item.editable"
                :is="`el-icon-${toLine(editIcon)}`"
              ></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- 操作项 -->
    <el-table-column
      :label="actionOptions!.label"
      :align="actionOptions!.align"
      :width="actionOptions!.width"
    >
      <template #default="scope">
        <!-- 自定义操作插槽 -->
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <!-- 预设插槽 -->
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination" v-if="pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed, onMounted, watch } from 'vue'
import { TableOptions } from './types'
import { toLine } from '../../utils'
import { cloneDeep } from 'lodash'

const props = defineProps({
  // 表格配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 加载的样式...
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  // 可编辑的图标
  editIcon: {
    type: String,
    default: 'edit',
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: '',
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 当前分页类别
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  total: {
    type: Number,
  },
})

// 当前点击的
let currentEdit = ref<string>('')
// 不直接修改父组件传来的数据
// 拷贝一份表格数据
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝一份按钮的标识
let cloneEditRowIndex = ref<string>(cloneDeep(props.editRowIndex))
let currentPage = ref<number>(1)

const emits = defineEmits([
  'confirm',
  'cancel',
  'update:editRowIndex',
  'currentChange',
  'sizeChange',
])

onMounted(() => {
  tableData.value.forEach((item) => {
    // 新增属性 默认不可编辑
    item.rowEdit = false
  })
})

// 监听data
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val)
    tableData.value.forEach((item) => {
      // 新增属性 默认不可编辑
      item.rowEdit = false
    })
  },
  { deep: true }
)

// 监听标识
watch(
  () => props.editRowIndex,
  (val) => {
    console.log(val)
    if (val) cloneEditRowIndex.value = val
  }
)

// 过滤基础数据 除了操作箱
const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
)

// 操作项
const actionOptions = computed(() => props.options.find((item) => item.action))

// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length)

// 分页位置
const paginationAlignJustify = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'center') return 'center'
  else return 'flex-end'
})

const clickEdit = (scope: any) => {
  // 唯一标识
  currentEdit.value = scope.$index + scope.column.id
}

const check = (scope: any) => {
  emits('confirm', scope)
}

const close = (scope: any) => {
  emits('cancel', scope)
}

const clickEditCell = () => {
  currentEdit.value = ''
}

// 无法知道按钮是否被点击 通过监听点击行事件
// 点击行
const rowClick = (row: any, column: any) => {
  if (column.label === actionOptions.value!.label) {
    console.log('操作项')
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      row.rowEdit = !row.rowEdit
      console.log(row.rowEdit)
      // 重置其他的 rowEdit
      tableData.value.forEach((item) => {
        if (item !== row) item.rowEdit = false
      })
      // 重置按钮标识
      if (!row.rowEdit) emits('update:editRowIndex', '')
    }
  }
}

// 分页
const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
}

const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
}
</script>

<style scoped lang="scss">
.edit {
  width: 1rem;
  height: 1rem;
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.icons {
  display: flex;
  align-items: center;
  svg {
    width: 1rem;
    height: 1rem;
    margin-left: 8px;
    cursor: pointer;
  }
  .check {
    color: #67c23a;
  }
  .close {
    color: #f56c6c;
  }
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: v-bind(paginationAlignJustify);
}
</style>
