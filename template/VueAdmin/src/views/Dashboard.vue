<template>
  <Layout>
    <Header slot="header" />
    <Sidebar slot="sidebar" />
    <router-view slot="main" />
  </Layout>
</template>
<script>
import Layout from "components/Layout"
import Header from "components/Header"
import Sidebar from "components/Sidebar"
export default {
  components: {
    Layout,
    Header,
    Sidebar
  }
}
</script>
