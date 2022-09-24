<template>
  <main class="main">
    <div class="page__header">
      <div class="page__header-title">
        {{ $route.fullPath == '/inbox' ? `inbox` : `archive ` }}
      </div>

      <div class="page__header-message">
        Email Selected ({{ no_of_selected_emails }})
      </div>
    </div>

    <div class="page__content">
      <div class="page__content-header">
        <span>
          <input
            type="checkbox"
            :checked="isAllMailChecked"
            @click="toggleCheckedEmail()"
          />
        </span>

        <span class="page__content-tags">
          <span class="page__content-tags tag">mark as read</span>
          <span class="page__content-tags tag">
            Archive ({{ store.state.archivedMails.length }})
          </span>
        </span>
      </div>

      <div class="page__body">
        <div class="page__items">
          <div
            class="page__items-item"
            :class="email.read ? 'read' : ''"
            v-for="email in emails"
            :key="email.id"
          >
            <span>
              <input
                type="checkbox"
                @click="toggleSingleEmailCheck(email.id)"
                :checked="email.checked ? true : false"
              />
            </span>

            <span
              class="page__items-item email"
              @click="toggleModalbox('open')"
            >
              {{ email.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal" :class="isModalOpen ? 'opoend' : 'closed'">
      <div class="modal__content">
        <div class="modal__content-header">
          <span class="modal__content-tags">
            <span class="modal__content-tags tag">mark as read</span>
            <span class="modal__content-tags tag">
              Archive ({{ store.state.archivedMails.length }})
            </span>
          </span>
        </div>

        <div class="modal__content-body">
          <span class="modal__content-body title">
            Your 7-figure plan goes bye-bye at midnight
          </span>

          <p class="modal__content-body content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
            distinctio cum accusamus omnis laborum corrupti voluptatum ab
            voluptate, modal__contenta aperi
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MainContent',

  setup() {
    const store = useStore()
    const isModalOpen = ref(false)
    const emails = ref([])
    const no_of_selected_emails = ref(0)
    const isAllMailChecked = ref(store.state.isAllMailChecked)

    const toggleCheckedEmail = async () => {
      if (isAllMailChecked.value === false) {
        const params = {
          emails: emails.value,
          value: true,
        }

        await store.dispatch('updateAll', params)
        getEmailFromStore()
        isAllMailChecked.value = true
        no_of_selected_emails.value = emails.value.length
      } else if (isAllMailChecked.value === true) {
        const params = {
          emails: store.state.emails,
          value: false,
        }

        await store.dispatch('updateAll', params)
        getEmailFromStore()
        isAllMailChecked.value = false
        no_of_selected_emails.value = 0
      }
    }

    const toggleSingleEmailCheck = async (email_id: string) => {
      const params = {
        emails: store.state.emails,
        email_id,
      }
      await store.dispatch('updateSingleEmail', params)
      await getEmailFromStore()

      no_of_selected_emails.value = 0
      let allChecked = true

      emails.value.forEach((email: any) => {
        if (email.checked === false) {
          allChecked = false
        } else {
          no_of_selected_emails.value += 1
        }
      })

      isAllMailChecked.value = allChecked
    }

    const getEmailFromStore = () => {
      emails.value = store.state.emails
    }

    const toggleModalbox = (action: string) => {
      if (action === 'open') {
        isModalOpen.value = true
      } else {
        isModalOpen.value = false
      }
    }

    window.addEventListener('keyup', (event) => {
      if (event.code == 'Escape') {
        isModalOpen.value = false
      } else {
        isModalOpen.value = false
      }
    })

    window.onclick = function (event: any) {
      var modal = document.getElementById('myModal')

      if (event.target == modal) {
        isModalOpen.value = false
      }
    }

    onBeforeMount(() => {
      getEmailFromStore()
      store.dispatch('getArchived', store.state.emails)
    })

    return {
      isAllMailChecked,
      emails,
      isModalOpen,
      store,
      toggleModalbox,
      toggleCheckedEmail,
      toggleSingleEmailCheck,
      no_of_selected_emails,
    }
  },
}
</script>

<style scoped>
main.main {
  padding: 0 3rem;
  background: #eee;
  min-height: 100vh;
}

.page__header {
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 3rem;
  padding-top: 3rem;
}

.page__header > .page__header-title {
  display: flex;
  color: #222;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}
.page__header .page__header-message {
  display: block;
  color: #111;
  font-weight: 800;
  font-size: 2rem;
}

.page__content,
.modal__content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.page__content input {
  display: inline;
  align-items: center;
  cursor: pointer;
}

.page__content .page__content-tags,
.modal__content .modal__content-tags {
  display: inline;
  align-items: center;
  margin-left: 1rem;
}

.page__content .page__content-tags,
.modal__content .modal__content-tags {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-top: -0.7rem;
}
.modal__content .modal__content-tags {
  margin: 0;
}

.page__content .page__content-tags.tag,
.modal__content .modal__content-tags.tag {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 8px 16px;
  background: #ccc;
  cursor: pointer;
  border-radius: 8px;
}

.modal__content .modal__content-tags.tag {
  margin: 0;
  margin-right: 0.3rem;
}
.page__content .page__content-tags.tag:hover {
  font-weight: 600;
  background: #222;
  color: #ccc;
}

.page__content .page__body {
  margin-top: 2rem;
}
.page__content .page__body .page__items {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.page__content .page__body .page__items-item {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 0.4rem 0;
  background: #ddd;
  cursor: pointer;
  width: 100%;
}
.page__content .page__body .page__items-item.email {
  margin-left: 0.4rem;
}
.page__content .page__body .page__items-item.read {
  opacity: 0.5;
}
.page__content .page__body .page__items-item:hover {
  background: #ccc;
  color: #333;
}

.modal {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: end;
}

.modal.opened {
  display: block;
}
.modal.closed {
  display: none;
}

.modal__content {
  background-color: #fefefe;
  padding: 3rem 2rem;
  border: 1px solid #888;
  width: 30%;
}

.modal__content-body {
  margin-top: 0.5rem;
}
.modal__content-body .modal__content-body.title {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  width: 80%;
}
.modal__content-body .modal__content-body.content {
  display: block;
  font-weight: 400;
  font-size: 0.7rem;
}
</style>
