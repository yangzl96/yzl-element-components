<template>
  <el-form
    v-if="model"
    ref="form"
    :validate-on-rule-change="false"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div id="editor" v-if="item.type === 'editor'"></div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <!-- 给插槽传值 ：实例 数据对象 -->
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch, nextTick } from 'vue'
import { FormOptions, FormInstance } from './types/types'
import cloneDeep from 'lodash/cloneDeep'
import E from 'wangeditor'
import { Value } from './types/rule'

let props = defineProps({
  // 配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
})

const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance | null>()
const edit = ref()

onMounted(() => {
  initForm()
})

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    const r: any = {}
    // 设置 model  rules
    props.options.forEach((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules as any
      if (item.type === 'editor') {
        // 初始化富文本
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            editor.txt.html(item.value)
            // 监听变化
            editor.config.onchange = (newStr: string) => {
              model.value[item.prop!] = newStr
            }
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 重置表单
const resetFields = () => {
  // 重置表单
  form.value!.resetFields()
  // 重置富文本
  if (props.options && props.options.length) {
    const editorItem = props.options.find((item) => item.type === 'editor')!
    edit.value.txt.html(editorItem.value)
  }
}

// 表单验证
const validate = () => {
  return form.value!.validate
}

// 获取表单数据
const getFormData = () => {
  return model.value
}

// 分发方法
defineExpose({
  resetFields,
  validate,
  getFormData,
})

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed',
])

// 上传组件的所有方法
const onPreview = (file: File) => {
  emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  const uploadItem = props.options.find((item) => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
const onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
const beforeUpload = (file: File) => {
  emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
const onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

// 监听options
watch(
  props.options,
  () => {
    initForm()
  },
  { deep: true }
)
</script>

<style scoped lang="scss"></style>
