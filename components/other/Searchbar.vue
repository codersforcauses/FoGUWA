<template>
  <v-toolbar
    floating
    absolute
    style="margin: 10px;"
  >
    <v-text-field
      hide-details
      prepend-icon="search"
      single-line
    />

    <v-btn icon>
      <v-icon>my_location</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>

export default {
  props: {
    fixed: Boolean
  }
}
</script>

<style>

</style>
