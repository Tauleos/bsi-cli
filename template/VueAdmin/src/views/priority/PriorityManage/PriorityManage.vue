<template>
  <Main>
    <Breadcrumb slot="header-left" />
    <div slot="header-right">右侧按钮</div>
    <div slot="content">
      优先级管理页面
    </div>
  </Main>
</template>
<script>
import Main from "components/Main"
import Breadcrumb from "components/Breadcrumb"
export default {
  components: {
    Main,
    Breadcrumb
  }
}
</script>
