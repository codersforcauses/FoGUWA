<template>
  <v-card height="100%">
    <plant-info
      :plant-info="plantInfo"
      :plant-info-visible="plantInfoVisible"
      @closeDrawer="plantInfoVisible = false"
    />
    <google-map-loader
      :map-config="mapConfig"
      :map-inst.sync="map"
      :google-inst.sync="google"
    />
  </v-card>
</template>

<script>
// import Vue from 'vue'
import { mapState } from 'vuex'
import PlantInfo from './PlantInfo.vue'
import GoogleMapLoader from './GoogleMapLoader'
import { uwaMapSettings } from '@/assets/js/mapSettings'
import { plants } from '@/assets/plantdb.json'

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.9804624, lng: 115.818 }

const defaultInfo = {
  plantName: 'Plants and Trees',
  sciName: 'Planticus Namium',
  images: [
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
  ],
  description:
    'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
}

export default {
  components: {
    'google-map-loader': GoogleMapLoader,
    /* eslint-disable */
    'plant-info': PlantInfo
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null,
    plantInfoVisible: false,
    plantInfo: defaultInfo
  }),
  computed: {
    ...mapState(['position']),
    mapConfig() {
      return {
        center: UWA_COORDS,
        restriction: {
          latLngBounds: UWA_BOUNDS,
          strictBounds: false
        },
        zoom: 19,
        minZoom: 18,
        maxZoom: 21,
        ...uwaMapSettings
      }
    },
    defaultInfo() {
      return {
        plantName: 'Plant Name',
        sciName: 'Scientific Plant Name',
        images: [
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
        ],
        description:
          'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
      }
    }
  },
  watch: {
    // TODO these two watchers will be called quickly enough, such that both map and google are both defined
    map(val) {
      this.loadMarkers()
    },
    google(val) {
      this.loadMarkers()
    },
    markers(val) {
      this.loadMarkers()
    },
    position() {
      if (this.userMarker === null) {
        if (this.position !== null) {
          this.userMarker = new this.google.maps.Marker({
            position: this.position,
            icon: {
              url: require('~/assets/images/loc.svg'),
              scaledSize: new this.google.maps.Size(32, 32)
            },
            map: this.map,
            zIndex: 10
          })
        }
      } else if (this.position.lat === 0 && this.position.lng === 0) {
        this.userMarker.setMap(null)
        this.userMarker = null
      } else {
        this.userMarker.setPosition(this.position)
      }
    }
  },
  methods: {
    loadMarkers() {
      if (this.map && this.google) {
        // Clear old markers
        for (const marker of this.markerInstances) {
          marker.setMap(null)
        }
        this.markerInstances = []
        // Create new markers and store them
        plants.forEach((plant, index) => {
          const leafIcon = {
            path:
              'M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z',
            fillColor: '#008000',
            fillOpacity: 1.0,
            strokeColor: '#004d00',
            scale: 1
          }
          const statueIcon = {
            path:
              'M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z',
            fillColor: '#cd7f32',
            fillOpacity: 1.0,
            strokeColor: '#905923',
            scale: 1
            }
          // Plot all instances
          for (const instance of plant.instances) {
            const markerInst = new this.google.maps.Marker({
              label: plant.name,
              position: instance.location,
              icon: plant.type === 'tree' ? leafIcon : statueIcon,
              map: this.map
            })
            markerInst.addListener('click', () => {
              this.plantInfo = {
                plantName: plant.name || this.defaultInfo.plantName,
                sciName: plant.scientificName || this.defaultInfo.scientificName,
                description: plant.description || this.defaultInfo.description,
                images: plant.images || this.defaultInfo.images,
                type: plant.type || 'tree'
              }
              this.plantInfoVisible = true
            })
            this.markerInstances.push(markerInst)
          }
        })
      }
    },
  }
}
</script>
