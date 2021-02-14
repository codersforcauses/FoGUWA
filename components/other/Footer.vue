<template>
  <v-footer v-show="!(isIndex && $vuetify.breakpoint.smAndDown)" class="px-4">
    Made with &#10084; by <a href="https://codersforcauses.org" target="_blank">Coders for Causes</a>
  </v-footer>
</template>

<script>
export default {
  props: {
    isIndex: Boolean
  }
}
</script>
