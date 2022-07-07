<template>
  <m-form
    ref="form"
    @on-change="handleChange"
    @before-upload="handleBeforeUpload"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="beforeRemove"
    @on-success="handleSuccess"
    @on-exceed="handleExceed"
    :options="options"
    label-width="100px"
  >
    <template #uploadArea>
      <el-button type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
    <template #action="scope">
      <el-button type="primary" @click="submitForm(scope)">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </template>
  </m-form>
</template>

<script setup lang="ts">
import {
  FormOptions,
  FormInstance,
} from '../../components/form/src/types/types'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

interface Scope {
  form: FormInstance
  model: any
}

const form = ref()

const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'userName',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
      {
        max: 6,
        min: 2,
        trigger: 'blur',
        message: '用户名在2-6位之间',
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码名不能为空',
        trigger: 'blur',
      },
      {
        max: 15,
        min: 6,
        trigger: 'blur',
        message: '密码在6-15位之间',
      },
    ],
    attrs: {
      clearable: true,
      showPassword: true,
    },
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur',
      },
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: 1,
      },
      {
        type: 'option',
        label: '员工',
        value: 2,
      },
    ],
    attrs: {
      style: {
        width: '100%',
      },
    },
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'blur',
      },
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: 1,
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: 2,
      },
    ],
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'blur',
      },
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 1,
      },
      {
        type: 'radio',
        label: '女',
        value: 2,
      },
    ],
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    rules: [
      {
        required: false,
        message: '文件不能为空',
        trigger: 'blur',
      },
    ],
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      multiple: true,
      limit: 3,
    },
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur',
      },
    ],
  },
]

const submitForm = (scope: Scope) => {
  scope.form.validate((vaild) => {
    if (vaild) {
      console.log(scope.model)
    } else {
      ElMessage.error('填写有误')
    }
  })
}

// 重置表单
const resetForm = () => {
  form.value.resetFields()
}

const handleRemove = (file: any, uploadFiles: any) => {
  console.log(file, uploadFiles)
}

const handlePreview = (file: any) => {
  console.log(file)
}

const handleExceed = (val: any) => {
  console.log(val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}

const beforeRemove = (val: any) => {
  console.log(val)
}

const handleSuccess = (val: any) => {
  console.log(val)
}

const handleChange = (val: any) => {
  console.log(val)
}

const handleBeforeUpload = (val: any) => {
  console.log(val)
}
</script>

<style scoped lang="scss"></style>
