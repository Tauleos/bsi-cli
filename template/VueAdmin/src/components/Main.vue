<template>
  <div :class="['container', { 'has-header': hasHeader }]">
    <div class="header-wrapper">
      <div class="header">
        <div class="left">
          <slot name="header-left" />
        </div>
        <div class="right">
          <slot name="header-right" />
        </div>
      </div>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;

  &.has-header {
    .header-wrapper {
      display: block;
    }
    .content {
      padding-top: 70px;
    }
  }

  .header-wrapper {
    position: absolute;
    left: 0;
    right: 20px;
    top: 0;
    height: 70px;
    padding: 10px 0;
    background: #eff0f4;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #ffffff;
    height: 50px;
  }

  .content {
    height: 100%;
    padding-right: 20px;
    overflow: auto;
  }
}
</style>
<script>
export default {
  computed: {
    hasHeader() {
      return Boolean(this.$slots["header-left"] || this.$slots["header-right"])
    }
  }
}
</script>
