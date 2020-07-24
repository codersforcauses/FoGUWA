<template>
  <v-layout>
    <v-flex xs12 sm6 md3 lg2 align-self-center>
      <v-img :src="src" contain />
      {{ src }}
    </v-flex>
    <v-flex xs12 sm6 md9 lg10>
      <v-card tile flat>
        <v-card-title class="display-1">
          {{ heading }}
        </v-card-title>
        <v-card-text>
          <slot />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    src: {
      type: String, 
      default: ''
    },
    heading: {
      type: String,
      required: true
    },
  }
}
</script>

<style>

</style>