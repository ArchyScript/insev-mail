import { isMemoSame } from '@vue/runtime-core'
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    emails: [
      {
        subject: 'Title 1',
        read: true,
        content: 'Lorem ipsum dolor sit amet co Tesst content 1',
        id: 'fuyghj',
        archived: false,
        checked: false,
      },
      {
        subject: 'Title 1',
        read: false,
        content: 'Teconsectetur adipisicing elit. Enim veniam  1',
        id: 'fghjhj',
        archived: true,
        checked: false,
      },
      {
        subject: 'Title 1',
        read: true,
        content: 'Tessm dolor sit amet consectetur adipisicing elit.',
        id: 'yutfghjk',
        archived: true,
        checked: false,
      },
      {
        subject: 'Title 1',
        read: true,
        content: 'Tesconsectetur adipisicing elit. Enim veniam et obcaecati.',
        id: 'poujhk',
        archived: false,
        checked: false,
      },
    ],
    archivedMails: <any>[],
    isAllMailChecked: false,
  },
  mutations: {
    setArchived(state, data) {
      state.archivedMails = data
    },
    updateStateEmail(state, data) {
      state.emails = data
    },
     
  },

  actions: {
    getArchived({ commit }, emails) {
      const data = <any>[]

      emails.forEach((email: any) => {
        if (email.archived) {
          data.push(email)
        }
      })

      commit('setArchived', data)
    },

    updateAll({ commit }, { emails, value }: any) {
      const data = <any>[]
      console.log(emails)

      emails.forEach((email: any) => {
        data.push({ ...email, checked: value })
      })

      commit('updateStateEmail', data)
    },

    async updateSingleEmail({ commit }, { emails, email_id }: any) {
      const data = <any>[]

      await emails.forEach((email: any) => {
        if (email.id === email_id) {
          let checked = false
          if (email.checked === false) {
            checked = true
          } else {
            checked = false
          }

          const updated = { ...email, checked }
          data.push(updated)
        } else {
          data.push(email)
        }
      })

      commit('updateStateEmail', data)
    },
  },

  modules: {},
})
