<template>
  <div>
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
import NavFooter from 'components/public/NavFooter.vue'

export default {
  components: {
    NavFooter
  }
}
</script>
