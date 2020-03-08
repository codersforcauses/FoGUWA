<template>
  <div>
    <v-row class="my-10 mx-12">
      <v-col align="center">
        <v-card
          class="mr-12"
          width="300"
          raised 
          to="/admin/users/"
        >
          <v-icon size="200" color="primary">
            mdi-account-multiple
          </v-icon>
          <div class="display-2	font-weight-thin pb-6 primary--text">
            USERS
          </div>
        </v-card>
      </v-col>
      <v-col align="center">
        <v-card
          class="mr-12"
          width="300"
          raised 
          to="/admin/plants/"
        >
          <v-icon size="200" color="primary">
            mdi-pine-tree
          </v-icon>
          <div class="display-2	font-weight-thin pb-6 primary--text">
            PLANTS
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
