<template lang="pug">
  div.board
    Popup(v-bind:opts="{isPopupVisible, popupCard}" v-on:closePopup="closePopup" v-on:removeCard="removeCard")
    .container-fluid.board-header
      .row
        .col-md-12.text-center
          h1.text-center  Todo Board
          Filters(v-bind:filters="filters" v-on:filterCards="filterCards")
          AddGroup(v-on:createGroup="createGroup")
    section.board-body
      .container-fluid
        .row
          Group(v-for="group in allGroups" v-bind:opts="{group, popupCard, filters}" v-on:createCard="createCard" v-on:loadPopup="loadPopup")
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Card from '@/components/Card'
import Popup from '@/components/Popup'
import Filters from '@/components/Filters'
import AddGroup from '@/components/AddGroup'
import Group from '@/components/Group'

export default {
  name: 'Board',
  components: {
    draggable,
    Card,
    Popup,
    Filters,
    AddGroup,
    Group
  },
  data() {
    return {
      filters: {
        done: '-1',
        name: ''
      },
      popupCard: {
        name: '',
        checked: false,
      },
      isPopupVisible: false,
      cardName: '',
    }
  },
  computed: mapGetters(['allGroups']),
  methods: {
    ...mapActions([
        'actionCreateGroup',
        'actionInit',
        'actionRemoveGroup',
        'actionCreateCard',
        'actionRemoveCard',
        'actionSaveState',
        'actionFilterCards',
        'actionChangeGroup'
      ]),
    createGroup(groupName) {
      if(groupName.length) {
        this.actionCreateGroup({
          id: Vue.getUUID(),
          name: groupName,
          cards: [],
        })
      }
    },
    loadPopup(e, card) {
      let tagName = e.target.tagName.toLowerCase()
      if(tagName == 'button' || tagName == 'input') return
      this.isPopupVisible = true
      this.popupCard = card
    },
    changeGroup(fromGroup, e) {
      let cardId = e.to.querySelector('.group-card').getAttribute('data-id')
      let toGroup = e.to.parentNode.getAttribute('data-id')
      this.actionChangeGroup({
        cardId,
        fromGroup,
        toGroup
      })
      this.$forceUpdate();
    },
    createCard(id) {
      if(this.cardName.length) {
          this.actionCreateCard({
              groupId: id,
              card: {
                id: Vue.getUUID(),
                name: this.cardName,
                checked: false,
              }
          })
          this.cardName = ''
      }
    },
    removeCard(id) {
      let self = this
      this.$dialog
      .confirm('Please confirm card removing')
      .then(function(dialog) {
        self.isPopupVisible = false
        self.actionRemoveCard(id)
      })
    },
    toggleCard(e, id) {
      this.actionSaveState()
      this.actionFilterCards(this.filters)
    },
    filterCards(val, type){
      type=='input' ? this.filters.name=val : this.filters.done = val
      this.filters.name = this.filters.name.toLowerCase()
      this.actionFilterCards(this.filters)
    },
    closePopup(e, type) {
      if(e.target.tagName.toLowerCase()=='section' || type=='button') this.isPopupVisible = false
    }
  },
  mounted() {
    this.actionInit()
  }
}
</script>

<style lang="scss">
  body {
    overflow-x: hidden;
    background-color: lightblue !important;
    min-height: 100vh;
  }
  .filter-done {
    select {
      width: 80%;
      margin-bottom: 20px;
    }
  }
  .group {
    overflow-y: hidden;
    min-width: 300px;
    margin: 20px 30px;
    background: lightgray;
    position: relative;
    &-card {
      cursor: pointer;
      &-inner {
        padding: 10px;
      }
        text-align: center;
        margin-bottom: 20px;
        background: #fff;
        button.btn-danger {
          margin-top: 10px;
          position: static !important;
        }
    }
    &-header, &-body, &-footer {
      padding: 10px;
    }
    &-footer {
        button {
            margin-top: 20px;
        }
    }
    button {
      &.btn-danger {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      font-size: 12px;
    }
  }
  .popup {
    &-card {
      background: #fff;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: 50%;
      left: 0;
      right: 0;
      max-width: 60%;
      padding: 15px;
      transform: translateY(-50%);
      &-footer {
        margin-top: 30px;
      }
      button {
        font-size: 14px;
      }
    }
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1000;
  }
  .board {
    position: relative;
    &-header {
      padding: 30px 0;
      background-color: #fff;
    }
    &-body {
      .row {
        flex-wrap: nowrap;
        align-items: flex-start;
      }
      overflow-x: auto;
    }
    button {
      text-transform: uppercase;
    }
    .add-form, .filters {
      max-width: 300px;
      margin: 20px auto;
      input {
        width: 300px;
        height: 30px;
        margin-bottom: 20px;
      }
      button {
        font-size: 12px;
      }
    }
  }
</style>
