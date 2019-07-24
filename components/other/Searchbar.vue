<template>
  <v-toolbar
    floating
    absolute
    style="margin: 10px;"
  >
    <v-autocomplete
      v-model="searchModel"
      :filter="searchFilter"
      :items="searchItems"
      :loading="searchLoading"
      :search-input.sync="searchQuery"
      clearable
      hide-no-data
      hide-selected
      item-text="displayName"
      placeholder="Search..."
      prepend-icon="search"
      return-object
      single-line
    />

    <v-btn icon>
      <v-icon>my_location</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    dataset: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchResults: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: function () {
    return {
      plants: [],
      searchDescLimit: 60,
      searchLoading: false,
      searchModel: null,
      searchQuery: null
    }
  },
  computed: {
    searchItems() {
      if (!this.plants) {
        return []
      }
      return this.plants.map((entry) => {
        const description = entry.name + (entry.scientificName != null && entry.scientificName.length > 0 ? ' (' + entry.scientificName + ')' : '')
        const name = description.length > this.searchDescLimit
          ? description.slice(0, this.searchDescLimit - 3) + '...'
          : description
        return Object.assign({}, entry, { 'displayName': name })
      })
    }
  },
  watch: {
    searchModel(val) {
      const results = []
      if (val != null) {
        results.push(val)
      }
      this.$emit('update:search-results', results)
    },
    searchQuery(val) {
      // Items have already been loaded
      if (this.searchItems.length > 0) return
      // Items have already been requested
      if (this.searchLoading) return
      this.searchLoading = true
      // Load the input items
      this.plants = this.dataset
      this.searchLoading = false
      // TODO: query database for matches, e.g.
      // queryDatabasePromise('val').then((res) => {
      //   return res.json()
      // }).then((res) => {
      //   const { count, plants } = res
      //   this.count = count
      //   this.plants = plants
      // }).catch((err) => {
      //   // TODO: emit log error message
      // })
      // .finally(() => {
      //   this.searchLoading = false
      // })
    }
  },
  methods: {
    searchFilter(plant, queryText, itemText) {
      const caseOne = plant.name.toLowerCase()
      const caseTwo = plant.scientificName.toLowerCase()
      const searchText = queryText.toLowerCase()

      return caseOne.indexOf(searchText) > -1 ||
        caseTwo.indexOf(searchText) > -1
    }
  }
}

</script>
