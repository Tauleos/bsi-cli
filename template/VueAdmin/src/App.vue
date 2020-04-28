<template>
    <div id="app" class="yp-app-wrap">
        <el-container>
            <el-header>
                <shop-header :user-info="userInfo">
                    <template v-slot:head-ot>
                        <header-menu :menus="menuMap"></header-menu>
                    </template>
                </shop-header>
            </el-header>
            <el-container class="contain-wrapper">
                <el-main class="main">
                    <menu-temp></menu-temp>
                    <keep-alive include="AllPlanList">
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ShopHeader from '@/base-be-fe/components/YPShopHeader.vue';
import HeaderMenu from '@/common/components/HeaderMenu.vue';
import MenuTemp from '@/common/components/MenuTemp';

export default {
    name: 'Home',
    components: {
        MenuTemp,
        ShopHeader,
        HeaderMenu
    },
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
    mounted() {
        this.getDiscountTypeList();
        this.getMaterialTypeList();
        this.getActInfo();
    },
    methods: {
        ...mapActions(['getDiscountTypeList', 'getMaterialTypeList', 'getActInfo'])
    }
};
</script>

<style lang="less">
/*@import './base-be-fe/styles/base';*/
@import './common/style/common.less';
.main {
    overflow-y: overlay;
    padding-right: 17px;
}
</style>
