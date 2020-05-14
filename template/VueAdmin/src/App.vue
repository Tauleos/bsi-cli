<template>
  <div id="app" class="yp-app-wrap">
    <el-container>
      <el-header> </el-header>
      <el-container class="contain-wrapper">
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loginStatus: state => state.loginStatus,
      userInfo: state => state.userInfo,
      menuMap: state => state.menuMap
    })
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
/*@import './base-be-fe/styles/base';*/
.main {
  overflow-y: overlay;
  padding-right: 17px;
}
</style>
