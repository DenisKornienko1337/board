<template lang="pug">
  div.group-card(@click="$emit('loadPopup', $event, opts.card)")
    div.group-card-inner(v-if="opts.card.visible")
      h5 {{opts.card.name}}
      div
        input(type="checkbox" v-model="opts.card.checked" @change="toggleCard($event, opts.card.id)")
        |  Done
      div
          button(type="button" @click="removeCard(opts.card.id)").btn.btn-danger Delete Card

</template>

<script>
import Vue from 'vue'
import {mapActions } from 'vuex'
export default {
  name: 'Card',
  props: ['opts'],
  methods: {
    ...mapActions([
        'actionRemoveCard',
        'actionSaveState',
        'actionFilterCards',
      ]),
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
      this.actionFilterCards(this.opts.filters)
    },
  },
}
</script>