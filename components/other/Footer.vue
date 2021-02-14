<template>
  <v-footer v-show="!(isIndex && $vuetify.breakpoint.smAndDown)" class="px-4">
    Made with &#x2764; by&nbsp;<a class="link" href="https://codersforcauses.org" target="_blank">Coders for Causes</a>
  </v-footer>
</template>

<script>
export default {
  props: {
    isIndex: Boolean
  }
}
</script>

<style>
  .link {
    color: #000;
    font-weight: bold;
    text-decoration: none;
  }
</style>
