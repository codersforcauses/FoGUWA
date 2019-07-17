<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 class="text-xs-center">
        <h1 v-if="error.statusCode === 404" class="display-2">
          {{ pageNotFound }}
        </h1>
        <h1 v-else class="display-2 font-weight-bold">
          {{ otherError }}
        </h1>
        <v-btn round color="primary" dark nuxt to="/">
          <v-icon dark left>
            arrow_back
          </v-icon>Return to Home page
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<!-- Don't change anything within script-->
<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
</style>
