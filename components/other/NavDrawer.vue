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
  }
}
</script>
