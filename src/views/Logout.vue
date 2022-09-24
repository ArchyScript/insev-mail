<template>
  <main class="main">
    <div class="title">
      Logged out
    </div>

    <router-link to="/auth/login">Login</router-link>
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
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
