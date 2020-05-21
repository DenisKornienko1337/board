<template lang="pug">
    section.popup(v-if="opts.isPopupVisible" @click="$emit('closePopup', $event)")
        .popup-card.text-center
            h3 {{opts.popupCard.name}}
            div
                input(type="checkbox" v-model="opts.popupCard.checked")
                |  Done
            .popup-card-footer.text-center.container
                .row
                    .col-md-6.col-sm-12.text-center
                        button(type="button" @click="$emit('removeCard', opts.popupCard.id)").btn.btn-danger Delete Card
                    .col-md-6.col-sm-12.text-center
                        button(type="button" @click="$emit('closePopup', $event, 'button')").btn.btn-primary Close
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions } from 'vuex'
export default {
  name: 'Popup',
  props: ['opts'],
}
</script>
