export interface MenuItem {
  icon?: string
  // 处理之后的图标
  i?: any
  // 导航名称
  name: string
  // 导航标识
  index: string
  children?: MenuItem[]
}
