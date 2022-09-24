<template>
  <div class="sidenav">
    <div class="sidenav__list">
      <span class="sidenav__list-item" @click="toggleRoute('inbox')">
        inbox ({{ $store.state.emails.length }})
      </span>

      <span class="sidenav__list-item" @click="toggleRoute('archive')">
        Archive ({{ $store.state.archivedMails.length }})
      </span>
    </div>

    <div class="sidenav__btn">
      <span @click="logout()">
        Logout
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useStore } from 'vuex'

export default {
  name: 'SideBar',
  data: () => ({
    store: useStore(),
  }),
  methods: {
    toggleRoute(route: string) {
      router.push(`/${route}`)
    },
    logout() {
      // If there is a login and it it stored in the local storage
      localStorage.removeItem('x-auth-token')
      router.push('/auth/login')
    },
  },
}
</script>

<style scoped>
.sidenav {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #333;
}

.sidenav .sidenav__list {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.sidenav .sidenav__list-item {
  color: #333;
  background: #ddd;
  padding: 10px 16px;
  text-align-last: center;
  width: 80%;
  margin: 0.5rem auto;
  display: block;
  font-weight: 400;
  border-radius: 10px;
  cursor: pointer;
}
.sidenav .sidenav__list-item:hover {
  font-weight: 600;
  color: #222;
  background: #ccc;
}

.sidenav__btn {
  position: absolute;
  bottom: 0.5rem;
  left: 0%;
  width: 100%;
  padding: 1rem 0;
}
.sidenav__btn > span {
  color: #333;
  background: #ddd;
  padding: 10px 0;
  text-align-last: center;
  width: 80%;
  margin: 0.5rem auto;
  display: block;
  font-weight: 400;
  border-radius: 10px;
}
.sidenav__btn > span:hover {
  font-weight: 600;
  color: #222;
  background: #ccc;
}
</style>
