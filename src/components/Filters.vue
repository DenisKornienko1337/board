<template lang="pug">
    div.filters
        div.filter-name
            input(type="text" v-bind:filters.name="filters.name" placeholder="Filter by name..." @input="$emit('filterCards', $event.target.value, 'input')")
        div.filter-done
            select(v-bind:filters.done="filters.done" @change="$emit('filterCards', $event.target.value, 'select')")
                option(value="-1" selected="selected") All
                option(value="1") Done
                option(value="0") Not done
</template>

<script lang="ts">
import Vue from 'vue'
export default {
    name: 'Filters',
    props: ['filters'],
}
</script>