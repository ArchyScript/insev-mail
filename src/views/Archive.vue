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
  name: 'ArchivePage',
  components: { SideNavVue, MainContentVue },
  data: () => ({
    test: 'ArchivePage',
  }),
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 5fr;
}
</style>
