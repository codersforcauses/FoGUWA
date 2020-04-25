<template>
  <v-layout>
    <v-flex xs12 md6 lg5>
      <v-sheet height="calc(100vh - 92px)" style="overflow-y: auto;">
        <nuxt-child :plants="plants" />
      </v-sheet>
    </v-flex>
    <v-flex height="100vh">
      <uwa-plant-map :plants="plants" @plant-clicked="handlePlantClick" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import iconData from '@/assets/js/plantIcons.js'
import UWAPlantMap from '~/components/UWAPlantMap'
const { iconPaths } = iconData


export default {
  components: {
    'uwa-plant-map': UWAPlantMap
  },
  computed: {
    ...mapGetters({
      plants: 'plants/plants',
      getPlantIcon: 'plants/getPlantIcon'
    }),
  },
  mounted() {
    this.loadPlants()
    this.setPlantIcons(iconPaths)
  },
  methods: {
    ...mapMutations({
      setPlantIcons: 'plants/setPlantIcons',
      setSelectedPlant: 'plants/setSelectedPlant',
      setSelectedInstance: 'plants/setSelectedInstance'
    }),
    ...mapActions({
      loadPlants: 'plants/loadPlants'
    }),
    handlePlantClick(payload) {
      this.setSelectedPlant(payload.plant)
      this.setSelectedInstance(payload.instance)
      this.$router.replace({ path: '/admin/plants/' + payload.plant._id })
    }
  },
}
</script>