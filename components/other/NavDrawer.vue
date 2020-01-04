<template>
  <v-navigation-drawer v-model="panel" temporary floating app>
    <v-list>
      <v-list-item
        v-for="{ icon, title, to } in items"
        :key="title"
        :to="to"
        router
        exact
        active-class="primary--text"
      >
        <v-list-item-action>
          <v-icon> {{ icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider />
      <v-list-item v-if="$store.state.auth.loggedIn" two-line>
        <v-list-item-avatar color="red" class="mr-4">
          <span class="white--text headline">{{ initials }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ `${name.first} ${name.last}` }}
          </v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">
              mdi-logout
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-btn v-else block text tile dark color="primary">
        Admin Login
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data: () => ({
    name: {
      first: 'Janeyawfgasuefygawueyfgawueyfg',
      last: 'Doe'
    },
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
    ]
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
    },
    initials() {
      return `${this.name.first.charAt(0)}${this.name.last.charAt(0)}`
    }
  }
}
</script>
