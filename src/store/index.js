import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groups: {items: []},
  },
  mutations: {
    mutationInitStore(state, items){
      state.groups.items = items
    },

    mutationCreateGroup(state, newGroup){
      state.groups.items.push(newGroup)
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },

    mutationCreateCard(state, opts) {
      let groupId = opts.groupId
      let card = opts.card
      card.visible = true
      state.groups.items.find(item => {
        return item.id == groupId
      })
      .cards.push(card)
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },

    mutationDeleteGroup(state, id) {
      state.groups.items = state.groups.items.filter(item => {
        return item.id!=id
      })
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },

    mutationDeleteCard(state, id) {
      state.groups.items.map(group => {
        group.cards = group.cards.filter(card => {
          return card.id!=id
        })
      })
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },

    mutationSaveState(state) {
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },
    
    mutationFilterCards(state, filters) {
      state.groups.items.map(group => {
        group.cards.map(card => {
          card.visible = (card.name.toLowerCase().includes(filters.name)) && ((filters.done<0) || (card.checked==filters.done))
        })
      })
    },

    mutationChangeGroup(state, opts) {
      let card
      let deleteIndex = {
        i: '',
        j: '',
      }
      let items = state.groups.items
      //Get moved card
      for(let i=0; i<items.length; ++i) {
        for(let j=0; j<items[i].cards.length; ++j) {
          if(items[i].cards[j].id ==opts.cardId) {
            card = items[i].cards[j]
            deleteIndex.i = i
            deleteIndex.j = j
          }
        }
      }
      //add card to target group
      state.groups.items.map(group => {
        if(group.id == opts.toGroup) group.cards.push(card)
      })
      //delete card from old group
      state.groups.items[deleteIndex.i].cards.splice(deleteIndex.j, 1)
      //save
      localStorage.setItem('groups', JSON.stringify(state.groups))
    }

  },
  getters: {
    allGroups(state) {
      return state.groups.items
    },
  },
  actions: {
    actionInit(ctx) {
      let groups = JSON.parse(localStorage.getItem('groups'))
      if(groups!==null) {
        groups.items.map(group => {
          group.cards.map(card => {
            card.visible = true
          })
        })
        ctx.commit('mutationInitStore', groups.items)
      }
    },
    actionCreateGroup(ctx, group) {
      ctx.commit('mutationCreateGroup', group)
    },
    actionCreateCard(ctx, opts) {
      ctx.commit('mutationCreateCard', opts)
    },
    actionRemoveGroup(ctx, id) {
      ctx.commit('mutatioDeleteGroup', id)
    },
    actionRemoveCard(ctx, id) {
      ctx.commit('mutationDeleteCard', id)
    },
    actionSaveState(ctx) {
      ctx.commit('mutationSaveState')
    },
    actionFilterCards(ctx, filters) {
      ctx.commit('mutationFilterCards', filters)
    },
    actionChangeGroup(ctx, opts) {
      ctx.commit('mutationChangeGroup', opts)
    }
  },
  modules: {
  }
})
