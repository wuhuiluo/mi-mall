<template>
  <div>
    <nav-header />
    <router-view/>
    <nav-footer />
  </div>
</template>

<script>
import NavHeader from 'components/public/NavHeader.vue'
import NavFooter from 'components/public/NavFooter.vue'

export default {
  components: {
    NavHeader,
    NavFooter
  }
}
</script>
