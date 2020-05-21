<template lang="pug">
    div.add-form
        div
            input(type="text" v-model="groupName" required placeholder="Group Name...")
        div
            button(type="button" @click="createGroup").btn.btn-primary.float-left Add Group
</template>

<script>
import Vue from 'vue'
export default {
    name: 'AddGroup',
    data() {
        return {
            groupName: ""
        }
    },
    methods: {
        createGroup() {
            this.$emit('createGroup', this.groupName)
            this.groupName = ''
        }
    }
}
</script>