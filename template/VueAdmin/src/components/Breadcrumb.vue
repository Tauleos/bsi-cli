<template>
  <BaseBreadcrumb :items="items" />
</template>
<script>
import BaseBreadcrumb from "components/BaseBreadcrumb"
export default {
  components: {
    BaseBreadcrumb
  },
  computed: {
    items() {
      const items = []
      this.$route.matched.forEach(match => {
        if (match && match.meta && match.meta.breadcrumb) {
          items.push({
            title: match.meta.title,
            path: match.path,
            current: match.path === this.$route.fullPath
          })
        }
      })
      return items
    }
  },
  methods: {}
}
</script>
