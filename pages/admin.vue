<template>
  <v-layout name="panel-and-map">
    <v-flex xs12 md6 lg5 name="panel">
      <v-layout wrap name="searchbar-card">
        <v-flex name="searchbar">
          <v-autocomplete
            v-model="value"
            :items="plants"
            dense
            filled
            label="Search for plant..."
            class="mt-4 mx-4"
          >
          </v-autocomplete>
        </v-flex>
        <v-flex name="card">
          <plantlist :plants="plantData" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex name="map" style="border: 3px solid black; height:600px">
      This is where the map should be
    </v-flex>
  </v-layout>
</template>

<script>
import PlantList from '~/components/other/PlantList.vue'
import { plants } from '@/assets/plantdb.json'

export default {
  components: {
    plantlist: PlantList
  },
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      plants: ['plant1', 'plant2', 'plant3'], // need DB
      hover: false,
      editView: false,
      plant: {},
    }
  },
  computed: {
    plantData() {
      return plants
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    editView(val) {
      // eslint-disable-next-line no-console
      console.log(val)
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.plants.filter(e => {
          return (e || '').toLowerCase().include((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
