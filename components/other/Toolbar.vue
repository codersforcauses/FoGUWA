<template>
  <v-toolbar
    fixed
    app
  >
    <v-toolbar-side-icon @click="$emit('input', $event)" />

    <v-toolbar-title>
      FoGUWA
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>

<style>

</style>
