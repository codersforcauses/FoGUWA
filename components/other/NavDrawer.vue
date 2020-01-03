<template>
  <v-navigation-drawer v-model="panel" temporary floating app>
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
          <v-icon> {{ item.icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item active-class="primary--text" router exact @click="auth">
        <v-list-item-action>
          <v-icon> {{ login.icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="login.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      {
        icon: 'map',
        title: 'Map',
        to: '/'
      },
      {
        icon: 'info',
        title: 'About',
        to: '/about'
      }
    ],
    login: {
      icon: 'person',
      title: 'Login',
      to: '/login'
    }
  }),
  computed: {
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
