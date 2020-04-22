<template>
  <header class="header">
    <img class="logo" src="@/assets/logo.png" alt="" />
    <h1>{{ title }}</h1>
    <div class="user">
      <span v-if="!userInfo" class="not-login" @click="login()">登录</span>
      <el-dropdown size="mini" @command="onClickMenu" v-else>
        <div class="logined">
          <img
            class="avatar"
            :src="userInfo.avatar || require('@/assets/avatar.png')"
            alt=""
          />
          <span class="username">{{ userInfo.name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <el-dropdown-item
            v-for="(menu, i) in menus"
            :key="i"
            :command="menu.command"
            >{{ menu.text }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex"
import UpcAuthUtils from "utils/UpcAuthUtils"
export default {
  data() {
    return {
      title: "标签信息管理后台",
      menus: [
        {
          text: "退出",
          command: "logout"
        }
      ]
    }
  },
  computed: {
    ...mapState("user", {
      userInfo(state) {
        return state.logined ? state : null
      }
    })
  },
  methods: {
    login: UpcAuthUtils.login,
    logout: UpcAuthUtils.logout,
    onClickMenu(command) {
      this[command]()
    }
  }
}
</script>
<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 58px;
  color: #fff;
  background: linear-gradient(90deg, #4474f1, #4ea0ff);
}
.logo {
  margin-right: 20px;
  height: 25px;
}
h1 {
  font: normal 18px/19px PingFangSC-Regular;
}
.user {
  cursor: pointer;
  display: inline-block;
  margin-left: auto;
  vertical-align: top;
}
.logined,
.not-login {
  height: 36px;
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 7px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  overflow: hidden;
}
.username {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
.el-icon-caret-bottom {
  margin-left: 13px;
  color: #fff;
}
</style>
<style lang="less">
.header .dropdown {
  left: auto !important;
  top: 32px !important;
  right: 53px;
  width: 60px;
  padding: 1px 0 !important;
  text-align: center;
  border: 0 !important;
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.19);
  .popper__arrow {
    left: 40px !important;
  }
}
</style>
