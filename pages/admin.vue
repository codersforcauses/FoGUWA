<template>
  <v-layout name="panel-and-map">
    <v-flex xs12 md6 lg5 name="panel">
      <v-toolbar fixed color="transparent">
        <v-autocomplete
          :items="plants"
          item-text="name"
          item-value="id"
          label="Search for plants..."
          hide-details
        />
      </v-toolbar>
      <v-sheet height="calc(100vh - 158px)" style="overflow-y: auto;">
        <plant-card :plant="plants[0]" />
        <plant-list :plants="plants" />
      </v-sheet>
    </v-flex>
    <v-flex height="100vh" tile>
      <uwa-plant-map ref="plantMap" />
    </v-flex>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'
import PlantList from '~/components/other/PlantList.vue'
import plantCard from '~/components/other/PlantCard.vue'

export default {
  components: {
    'plant-list': PlantList,
    'uwa-plant-map': UWAPlantMap,
    'plant-card': plantCard
  },
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      hover: false,
      editView: false,
      plants: [],
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    editView(val) {
      // eslint-disable-next-line no-console
      console.log(val)
    },
    colourIcon(val){
      // console.log(this.samplePlant.icon)
      this.options.forEach(()=>{if(this.options.iconName===this.selected){
        this.options.isSelected=true
      }})
    }
  },
  async mounted() {
    await this.loadPlants()
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
    },
    async loadPlants() {
      const data = await this.$axios.$get('/api/flora')
      this.plants = data
    }
  }
}
</script>
