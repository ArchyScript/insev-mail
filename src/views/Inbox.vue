<template>
  <div class="grid-container">
    <div>
      <SideNavVue />
    </div>

    <div class="">
      <MainContentVue />
    </div>
  </div>
</template>

<script lang="ts">
import SideNavVue from '@/components/SideNav.vue'
import MainContentVue from '@/components/MainContent.vue'

export default {
  name: 'HomePage',
  components: { SideNavVue, MainContentVue },
  data: () => ({
    test: 'HomePage',
  }),
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 5fr;
}
</style>
