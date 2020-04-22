<template>
  <div class="page">
    <div class="header"><slot name="header" /></div>
    <div class="body">
      <div class="sidebar"><slot name="sidebar" /></div>
      <div class="main">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@pt: 0px;
@pb: @pt;
@pl: 0px;
@pr: @pl;
@sw: 220px;
@g: 10px;
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #eff0f4;
}
.body {
  position: relative;
  flex: 1;
  padding-left: @pl + @sw + @g;
}
.body-wrapper {
  position: relative;
  height: 100%;
}
.sidebar {
  position: absolute;
  left: @pl;
  top: @pt;
  bottom: @pb;
  width: @sw;
  background: #fff;
  overflow: auto;
}
.main {
  position: absolute;
  left: @pl + @sw + @g;
  right: 0;
  top: 0;
  bottom: 0;
  padding: @pt @pr @pb 0;
  height: 100%;
  overflow: auto;
}
</style>
