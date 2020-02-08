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
          <v-card class="mx-4">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="150px"
            ></v-img>
            <v-row>
              <v-icon large text icon color="pink lighten-3" class="ml-3 pl-6">
                mdi-mushroom
              </v-icon>
              <v-col>
                <v-card-title class="pt-2 pl-6">
                  Plant Namae
                  <!-- <span v-if="!editView"> Plant Name </span> -->
                  <!-- <v-text-field v-else v-model="plant.name" dense label="Plant Name" outlined /> -->
                  <v-chip color="indigo darken-3" small outlined class="ml-4">
                    <i>Scientific Name</i>
                  </v-chip>
                  <!-- <v-text-field v-model="plant.sciname" dense label="Scientific Name" outlined /> -->
                </v-card-title>
                <v-card-subtitle class="pl-6">
                  Lat: 123.456789 &emsp; Lon:123.456789
                </v-card-subtitle>
              </v-col>
              <!-- <v-spacer></v-spacer> -->
              <v-card-actions class="mr-2">
                <v-btn color="indigo" text dark @click="editView = !editView">
                  EDIT
                </v-btn>
                <v-btn color="indigo" text class="mr-3">
                  DELETE
                </v-btn>
              </v-card-actions>
            </v-row>
            <v-row>
              <v-card-text class="ml-3 pt-0 pb-6 px-6">
                This is a very very very very very very very very very very very very very very very very very very long description
              </v-card-text>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex name="map" style="border: 3px solid black; height:600px">
      This is where the map should be
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
