<template>
  <v-navigation-drawer v-model="panel" width="200" temporary floating app>
    <template v-slot:prepend>
      <v-img :src="require('~/assets/images/FoG-logo.png')" class="mx-8 my-4" contain eager />
    </template>
    <v-list>
      <v-list-item
        v-for="{ icon, title, to } in items"
        :key="title"
        :to="to"
        router
        exact
        active-class="primary--text"
        nuxt
      >
        <v-list-item-action>
          <v-icon> {{ icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="title" />
        </v-list-item-content>
      </v-list-item>
      <div v-if="isAdmin">
        <v-list-item
          v-for="{ icon, title, to } in restrictedItems"
          :key="title"
          :to="to"
          router
          exact
          active-class="primary--text"
          nuxt
        >
          <v-list-item-action>
            <v-icon> {{ icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="title" />
          </v-list-item-content>
        </v-list-item>
        <div>
        </div>
      </div>
    </v-list>
    <template v-slot:append>
      <v-divider />
      <v-list-item v-if="$store.state.auth.loggedIn" two-line>
        <v-list-item-avatar color="light-blue" class="mr-4">
          <v-img :src="user.picture" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.nickname }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ isAdmin ? "Admin" : "Friend" }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="logout">
            <v-icon color="grey lighten-1">
              mdi-logout
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-btn
        v-else
        block
        text
        tile
        dark 
        color="primary"
        @click="auth"
      >
        Admin Login
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    value: Boolean
  },
  middleware: 'auth',
  data: () => ({
    items: [
      {
        icon: 'mdi-map-marker-circle',
        title: 'Map',
        to: '/'
      },
      {
        icon: 'mdi-information-outline',
        title: 'About',
        to: '/about'
      }
    ],
    restrictedItems: [
      {
        icon: 'mdi-spa-outline',
        title: 'Plants',
        to: '/admin/plants'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      getAdmin: 'user/getAdmin',
      isAdmin: 'user/isAdmin'
    }),
    user() {
      return (this.$auth || {}).user || null
    },
    panel: {
      get() {
        return this.value
      },
      set(value) {
        if (!value) {
          this.$emit('input', false)
        }
      }
    }
  },
  mounted() {
    this.loadAdmin()
  },
  methods: {
    ...mapMutations({
      setAdmin: 'user/setAdmin',
      removeAdmin: 'user/removeAdmin',
    }),
    ...mapActions({
      loadAdmin: 'user/loadAdmin',
    }),
    async auth() {
      try {
        await this.$auth.loginWith('auth0')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    async logout() {
      try {
        await this.$auth.logout('auth0')
        this.removeAdmin()
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style scoped>
.nav {
  z-index: 999999999 !important;
}
</style>
