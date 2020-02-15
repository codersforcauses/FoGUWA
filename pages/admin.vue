<template>
  <v-layout name="panel-and-map">
    <v-flex xs12 md6 lg5 name="panel">
      <v-layout wrap name="searchbar-card">
        <v-flex name="searchbar">
          <v-autocomplete
            :items="plants"
            dense
            filled
            label="Search for plant..."
            class="mt-4 mx-4"
          >
          </v-autocomplete>
        </v-flex>
        <v-flex name="card">
          <plant-card :plant="samplePlant">
          </plant-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex name="map" style="border: 3px solid black; height:600px">
    </v-flex>
  </v-layout>
</template>

<script>
import plantCard from '~/components/other/plantCard.vue'

export default {
  components:{
    'plant-card': plantCard
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
      // confirmDelete: false,
      // displayForm: 1,
      samplePlant:{
        name:'Cactus',
        scientificName: 'Cactaceae',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'mdi-mushroom',
        instance:[
          {
            location:{
              type:'',
              coordinates:[100,100]
            },
            heading: 'The cactus near the pond',
            description:'it is right next to the pond',
          },
          {
            location:{
              type:'',
              coordinates:[100,100]
            },
            heading: 'The very old cactus',
            description:'he was born in 1950s',
          }
        ],
      }

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
