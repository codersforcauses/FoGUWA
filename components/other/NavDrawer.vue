<template>
  <v-navigation-drawer v-model="panel" width="200" temporary floating app>
    <template v-slot:prepend>
      <v-img :src="require('~/assets/images/FoG-logo.png')" class="mx-8 my-4" contain eager />
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
        active-class="primary--text"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="!user"
        @click="auth"
        :to="login.to"
        active-class="primary--text"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ login.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="login.title" />
        </v-list-item-content>
      </v-list-item>
      <p v-else>
        {{ user.name }}
      </p>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  middleware: 'auth',
  data: () => ({
    items: [
      {
        icon: 'mdi-map',
        title: 'Map',
        to: '/'
      },
      {
        icon: 'mdi-information',
        title: 'About',
        to: '/about'
      }
    ],
    login: {
      icon: 'mdi-account',
      title: 'Login',
      to: '/'
    }
  }),
  computed: {
    user() {
      return this.$auth && this.$auth.user
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
  methods: {
    async auth() {
      try {
        await this.$auth.loginWith('auth0')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
