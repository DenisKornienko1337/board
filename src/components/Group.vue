<template lang="pug">
    .group
        .group-inner
            .group-header
                h4 {{opts.group.name}}
                button(type="button" @click="removeGroup(opts.group.id)").btn.btn-danger Delete
            .group-body( :data-id="opts.group.id")
                draggable(group="cards" @end="changeGroup(opts.group.id, $event)")
                    Card(v-for="card in opts.group.cards" :data-id="card.id" v-bind:opts="{card, filters:opts.filters, popupCard:opts.popupCard}" v-on:loadPopup="loadPopup")
            .text-center.group-footer
                div
                input(type='text' v-model="cardName" placeholder="Card name...")
                div
                button(type="button" @click="createCard(opts.group.id)").btn.btn-primary Add Card
</template>


<script>
import Vue from 'vue'
import Card from '@/components/Card'
import draggable from 'vuedraggable'
import {mapActions } from 'vuex'


export default {
   props: ['opts'],
   components: {
       Card,
       draggable
   },
    data() {
        return {
            cardName: ""
        }
    },
    methods: {
        ...mapActions([
            'actionCreateCard',
            'actionChangeGroup',
            'actionRemoveGroup'
        ]),
        loadPopup(e, id) {
            this.$emit('loadPopup', e, id)
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
        removeGroup(id) {
        let self = this
        this.$dialog
            .confirm('Please confirm group removing')
            .then(function(dialog) {
                self.actionRemoveGroup(id)
            })
        },
        changeGroup(fromGroup, e) {
        let cardId = e.to.querySelector('.group-card').getAttribute('data-id')
        let toGroup = e.to.parentNode.getAttribute('data-id')
            this.actionChangeGroup({
                cardId,
                fromGroup,
                toGroup
            })
        },
    }
}
</script>