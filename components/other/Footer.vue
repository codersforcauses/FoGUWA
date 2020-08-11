<template>
  <v-footer v-show="!(isIndex && $vuetify.breakpoint.smAndDown)" class="px-4">
    {{ !isIndex && !$vuetify.breakpoint.mobile }}
    Made with &#10084; by Coders for Causes
  </v-footer>
</template>

<script>
export default {
  props: {
    isIndex: Boolean
  }
}
</script>
