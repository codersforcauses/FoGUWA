<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 lg2 class="py-3">
        <v-img contain :src="require('~/assets/images/FoGUWA.jpg')" />
      </v-flex>
      <v-flex xs12 sm6 md9 lg10>
        <v-card-title class="display-1">
          About Friends of the Grounds of UWA
        </v-card-title>
        <v-card-text style="text-align: justify">
          <p>
            Friends of the Grounds UWA (FoGUWA) was
            established in 2000 with four core objectives:
          </p>
          <ol class="mb-3">
            <li>
              To encourage the University and wider Western Australian
              community to take an active interest in UWA’s grounds as
              an important part of the heritage of this State
            </li>
            <li>
              To enhance the profile of the university’s grounds by
              developing an annual program of activities
            </li>
            <li>
              To provide information about the grounds through publications,
              lectures and events
            </li>
            <li>
              To raise funds to assist with special projects relating to the grounds
            </li>
          </ol>
          <a target="_blank" href="https://www.facebook.com/friendsofthegrounds/" class="primary--text text--darken-2">
            FoGUWA Facebook page
          </a>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2 class="py-3">
        <v-card tile flat class="white">
          <v-img
            contain
            class="mx-3"
            :src="require('~/assets/images/cfc-logo.svg')"
            :aspect-ratio="1/1"
          />
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md9 lg10>
        <v-card-title class="display-1">
          About Coders for Causes
        </v-card-title>
        <v-card-text style="text-align: justify">
          <p>
            Coders for Causes (CFC) are student developers for
            charities and Not-For-Profits. Visit our website
            below for more information.
          </p>
          <a target="_blank" href="https://codersforcauses.org/landing" class="primary--text text--darken-2">
            Coders for Causes website <br>
          </a>
          <a target="blank" href="https://www.facebook.com/codersforcauses" class="primary--text text--darken-2">
            Coders for Causes Facebook
          </a>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  head: {
    title: 'About Us'
  }
}
</script>
