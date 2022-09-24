<template>
  <main class="main">
    <div class="title">
      No login option
    </div>

    <router-link to="/inbox">Goto Inbox</router-link>
  </main>
</template>

<script lang="ts">
export default {
  name: 'LogOut',

  setup() {
    return {}
  },
}
</script>

<style scoped>
main.main {
  padding: 3rem;
}

.main .title {
  font-weight: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
