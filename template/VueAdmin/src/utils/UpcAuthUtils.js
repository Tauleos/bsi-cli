import { login, logout } from "@mi/ypjs/utils/authUpc"
import { upcApis } from "@mi/ypjs"
import { UPC_PROJECT_NAME } from "constants/upc"

export default {
  async getLoginInfo() {
    const { code, data } = await upcApis.getUserInfo()
    if (code === 0 && data.login && data.userInfo) {
      return {
        name: data.userInfo.name,
        avatar: data.userInfo.avatar
      }
    }
    throw new Error("解析登录信息失败")
  },
  async getPermissionInfo() {
    const { code, data } = await upcApis.getMenuInfo({
      project: UPC_PROJECT_NAME
    })
    if (code === 0 && data) {
      if (!data.hasUpcPermission) {
        location.href = data.upcRedirectUrl
      }
      const allowedUrls = data.systemResourceList.map(item => item.resourceUrl)
      return {
        allowedUrls
      }
    }
    throw new Error("解析允许的路由信息失败")
  },
  login,
  logout
}
