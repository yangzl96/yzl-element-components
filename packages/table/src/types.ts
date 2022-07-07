export interface TableOptions {
  // 表头
  label: string
  // 字段名称
  prop: string
  // 列宽度
  width?: string | number
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 自定义模板
  slot?: string
  // 是否是操作项
  action?: boolean
  // 是否是可编辑的单元格
  editable?: boolean
}
