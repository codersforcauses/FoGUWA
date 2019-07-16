<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 lg2 style="padding: 20px 0 20px 0">
        <v-img :src="require('~/static/cfc-icon.png')" />
      </v-flex>
      <v-flex xs12 sm6 md9 lg10>
        <v-card-title class="display-1">
          About Coders for Causes
        </v-card-title>
        <v-card-text style="text-align: justify">
          <p>Coders for Causes (CFC) are student developers for charities and Not-For-Profits. Visit our website below for more information.</p>
          <a target="_blank" href="https://codersforcauses.org/landing">Coders for Causes website<br></a>
          <a target="blank" href="https://www.facebook.com/codersforcauses">Coders for Causes Facebook</a>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2 style="padding: 20px 0 20px 0">
        <v-img :src="require('~/static/FoGUWA.jpg')" />
      </v-flex>
      <v-flex xs12 sm6 md9 lg10>
        <v-card-title class="display-1">
          About Friends of the Grounds of UWA
        </v-card-title>
        <v-card-text style="text-align: justify">
          <p>Friends of the Grounds UWA (FoGUWA) was established in the 2000 with four core objectives: </p>
          <ol style="margin-bottom: 16px;">
            <li>To encourage the University and wider Western Australian community to take an active interest in UWA’s grounds as an important part of the heritage of this State</li>
            <li>To enhance the profile of the university’s grounds by developing an annual program of activities</li>
            <li>To provide information about the grounds through publications, lectures and events</li>
            <li>To raise funds to assist with special projects relating to the grounds</li>
          </ol>
          <a target="_blank" href="https://www.facebook.com/friendsofthegrounds/">FoGUWA Facebook page</a>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>
