<template>
  <div>
    <el-button type="primary" @click="open">open</el-button>
    <m-modal-form
      isScroll
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
      :options="options"
      :on-success="handleSuccess"
      title="编辑用户"
      v-model:visible="visible"
    >
      <!-- 底部按钮插槽 -->
      <template #footer="{ form }">
        <el-button @click="cancale(form)">取消</el-button>
        <el-button type="primary" @click="confirm(form)">确认</el-button>
      </template>
      <!-- 内嵌m-form里面的插槽 -->
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </m-modal-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  FormOptions,
  FormInstance,
} from '../../components/form/src/types/types'

let visible = ref<boolean>(false)
const open = () => {
  visible.value = true
}

const cancale = (form: FormInstance) => {}

const confirm = (form: any) => {
  const validate = form.validate()
  // 真实的form实例上没有getFormData所以any
  const model = form.getFormData()
  console.log(validate)
  validate((valid: any) => {
    if (valid) {
      console.log(model)
    } else {
    }
  })
}

const handleChange = (val: any) => {
  console.log('change')
}

const handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
}

const handleSuccess = (val: any) => {
  console.log('success')
}

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
</script>

<style scoped lang="scss"></style>
