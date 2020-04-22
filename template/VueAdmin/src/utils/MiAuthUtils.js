import { login, logout } from "@mi/ypjs/utils/authMi"

export default {
  async getLoginInfo() {
    // todo
    // 调用业务系统获取用户信息的接口
    // 返回数据结构 {name: '', avatar: ''}
  },
  async getPermissionInfo() {
    // todo
    // 调用业务系统获取权限的接口
    // 返回数据结构 {allowedUrls: ['/a', '/b']}
  },
  login,
  logout
}
