<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <div class="text-center">
        <h1 v-if="error.statusCode === 404" class="display-2">
          {{ pageNotFound }}
        </h1>
        <h1 v-else class="display-2 font-weight-bold">
          {{ otherError }}
        </h1>
        <v-btn
          color="primary"
          to="/"
          rounded
          dark
          nuxt
          class="mt-4"
        >
          <v-icon dark class="mr-2">
            mdi-arrow-left
          </v-icon>
          Return to Home page
        </v-btn>
      </div>
    </v-row>
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
  data: () => ({
    pageNotFound: '404: Page Not Found',
    otherError: 'An error occurred'
  })
}
</script>

<style scoped></style>
