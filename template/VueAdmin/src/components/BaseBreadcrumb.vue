<template>
  <div>
    <span v-for="(item, index) in items" :key="index">
      <span
        @click="item.path && !item.current && $router.push(item.path)"
        :class="['title', { link: item.path, current: item.current }]"
        >{{ item.title }}</span
      >
      <i v-if="index !== items.length - 1" class="sep el-icon-arrow-right"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.title {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #333;
  line-height: 14px;
  &.link:not(.current) {
    cursor: pointer;
    &:hover {
      color: #3062dd;
    }
  }
}
.sep {
  margin: 0 8px;
  font-size: 14px;
  color: #999;
}
</style>
<style lang="less"></style>
