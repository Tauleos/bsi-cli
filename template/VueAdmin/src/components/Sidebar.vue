<template>
  <div class="nav">
    <div v-for="(item, index) in menus" :key="index" :class="['nav-item-level1', { active: item.active }]">
      <div class="level1-title" @click="clickLevel1(item)">
        <i v-if="item.iconFont" :class="'icon ' + item.iconFont"></i>
        <img v-else-if="item.iconPath" class="icon" :src="item.iconPath" alt="" />
        <span
          v-else-if="item.iconImage"
          :class="[`icon icon-image icon-image-${item.iconImage}`, { active: item.active }]"
        />
        <span class="text">{{ item.title }}</span>
        <i v-if="item.children && item.children.length > 0" class="dropdown el-icon-arrow-down"></i>
      </div>
      <div class="sub-menu" v-if="item.children && item.children.length > 0">
        <div class="nav-item-level2" v-for="(level2Item, level2Index) in item.children" :key="level2Index">
          <div :class="['level2-title', { active: level2Item.active }]" @click="clickLevel2(level2Item)">
            {{ level2Item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      menus: []
    };
  },
  computed: {
    ...mapState('user', ['allowedRoutes'])
  },
  watch: {
    allowedRoutes: {
      immediate: true,
      handler() {
        this.menus = this.getSidebarMenus(this.allowedRoutes);
      }
    }
  },
  mounted() {},
  methods: {
    clickLevel1(item) {
      if (item.children) {
        item.active = !item.active;
      } else {
        this.inactiveAllRoutes();
        this.openRoute(item);
      }
    },
    clickLevel2(item) {
      this.inactiveAllRoutes();
      this.openRoute(item);
    },
    openRoute(item) {
      item.active = true;
      if (this.$route.path !== item.path) {
        if (item.newWin) {
          let routeUrl = this.$router.resolve({
            path: item.path
          });
          window.open(routeUrl.href, '_blank');
        } else {
          this.$router.push(item.path);
        }
      }
    },
    inactiveAllRoutes() {
      this.menus.forEach(item => {
        if (item.children) {
          item.children.forEach(item => {
            item.active = false;
          });
        } else {
          item.active = false;
        }
      });
    },
    getSidebarMenus(routes) {
      const sidebarMenus = [];
      routes.forEach(route => {
        const children = [];
        if (route.children && route.children.length > 0) {
          route.children.forEach(subRoute => {
            if (subRoute.meta && subRoute.meta.sidebar) {
              const path = this.joinPath(route.path, subRoute.path);
              children.push({
                title: subRoute.meta.title,
                path,
                active: this.matchPath(path)
              });
            }
          });
        }

        const newRoute = {
          path: route.path,
          title: route.meta.title,
          active: this.matchPath(route.path),
          iconFont: route.meta.iconFont,
          iconPath: route.meta.iconPath,
          iconImage: route.meta.iconImage,
          newWin: route.meta.newWin
        };

        if (children && children.length > 0) {
          //二级菜单
          newRoute.children = children;
          sidebarMenus.push(newRoute);
        } else if (route.meta.sidebar) {
          // 一级菜单
          sidebarMenus.push(newRoute);
        }
      });
      return sidebarMenus;
    },
    joinPath(...paths) {
      return '/' + paths.map(path => path.replace(/^\/|\/$/g, '')).join('/');
    },
    matchPath(path) {
      return this.$route.path === path;
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  user-select: none;
  padding-top: 10px;
  padding-right: 20px;
}
.icon {
  font-size: 18px;
  margin-right: 10px;
}
img.icon {
  vertical-align: top;
  width: 18px;
  height: 18px;
}
.nav-item-level1 {
  .level1-title {
    cursor: pointer;
    padding: 0 4px 0 20px;
    display: flex;
    align-items: center;
    height: 35px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      background: #e3f1f9;
    }

    .dropdown {
      margin-left: auto;
      transition: transform 0.2s;
      font-size: 12px;
    }
  }

  .sub-menu {
    max-height: 0;
    overflow: hidden;
    transition: all 0.2s;
  }

  &.active {
    .dropdown {
      transform: rotate(-180deg);
    }
    .level1-title {
      color: #457bfc;
      &:hover {
        background: #fff;
      }
    }
    .sub-menu {
      max-height: 340px;
    }
  }
}
.nav-item-level2 {
  padding: 5px 5px 5px 49px;
  .level2-title {
    cursor: pointer;
    display: inline-block;
    max-width: 100%;
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666;
    background: #f6f6f6;
    border-radius: 2px;
    &:hover {
      background: #e1e1e1;
      color: #666666;
    }
    &.active {
      background: #f0f4ff;
      color: #457bfc;
    }
  }
}
</style>
