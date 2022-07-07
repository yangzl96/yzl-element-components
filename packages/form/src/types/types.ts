import { CSSProperties } from 'vue'
import { RuleItem } from './rule'
import { ValidateFieldsError } from 'async-validator'
interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}
// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  // 表单的值 上传组件没有value
  value?: any
  // 表单项的label
  label?: string
  // 表单项的表标识
  prop?: string
  // 表单项的占位符
  placeholder?: string
  // 验证规则
  rules?: RuleItem[]
  // 表单元素特有的 后续用到就再补充
  attrs?: {
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    // css样式
    style?: CSSProperties
  }
  // 表单项的子元素
  children?: FormOptions[]
  // 处理上传组件
  uploadAttrs?: {
    action: string
    headers?: object
    method?: 'post' | 'put' | 'patch'
    multiple?: boolean
    data?: any
    name?: string
    withCredentials?: boolean
    showFileList?: boolean
    drag?: boolean
    accept?: string
    thumbnailMode?: boolean
    fileList?: any[]
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    disabled?: boolean
    limit?: number
  }
}

export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void
}

// element-Plus ref类型
export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  emit: (evt: string, ...args: any[]) => void
  labelSuffix: string
  inline?: boolean
  model?: Record<string, unknown>
  size?: string
  showMessage?: boolean
  labelPosition?: string
  labelWidth?: string
  rules?: Record<string, unknown>
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  disabled?: boolean
  validate: (callback?: Callback) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void
}
