import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { toLine } from './utils'
// 本地引入
// import mUI from './components'

// 全量打包引入
import mUI from '../lib/index.es'
import '../lib/style.css'

// 单独引入某一个
// import chooseIcon from '../lib/chooseIcon/index.es'
// import '../lib/chooseIcon/style.css'

import './mock'

const app = createApp(App)

// 全局注册图标
// el-icon-xxx
for (let i in Icons) {
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
// for (let i in Icons) {
//   console.log((Icons as any)[i])
//   app.component(i,  (Icons as any)[i])
// }

app.use(router).use(ElementPlus).use(mUI).mount('#app')
