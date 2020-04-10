<template>
  <v-card height="100%">
    <plant-info
      v-if="plantInfo"
      v-model="infoDrawer"
      :plant-info="plantInfo"
    />
    <v-skeleton-loader v-else />
    <google-map-loader
      :map-config="mapConfig"
      :map-inst.sync="map"
      :google-inst.sync="google"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line import/order
import PlantInfo from './PlantInfo.vue'
import iconData from '@/assets/js/plantIcons.js'
import { uwaMapSettings } from '@/assets/js/mapSettings'
// eslint-disable-next-line import/order
import GoogleMapLoader from './GoogleMapLoader'
const { iconStyle, ...iconPaths } = iconData

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.976764, lng: 115.818220 }

export default {
  components: {
    'google-map-loader': GoogleMapLoader,
    'plant-info': PlantInfo
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null,
    plants: null,
    infoDrawer: false,
    plantInfo: null
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
        zoom: 18,
        minZoom: 18,
        maxZoom: 21,
        ...uwaMapSettings
      }
    }
  },
  watch: {
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
        this.map.panTo(this.position)
      }
    }
  },
  methods: {
    async loadMarkers() {
      if (this.map && this.google) {
        this.clearMarkers()        
        await this.loadPlants()
        // Create new markers and store them
        this.plants.forEach((plant, index) => {
          // Plot all instances
          plant.instances.forEach(instance => {
            const markerInst = this.createMarkerInstance(plant, instance)
            this.addListenerToMarker(markerInst, plant, instance)
            this.markerInstances.push(markerInst)
          })
        })
      }
    },
    async loadPlants() {
      const data = await this.$axios.$get('/api/flora')
      this.plants = data
    },
    clearMarkers() {
      this.markerInstances.forEach(marker => {
        marker.setMap(null)
      })
      this.markerInstances = []
    },
    createMarkerInstance(plant, instance) {
      const icon = iconPaths.hasOwnProperty(plant.icon)
                  ? iconPaths[plant.icon]
                  : iconPaths.info
      Object.keys(iconStyle).forEach(style => {
        icon[style] = iconStyle[style]
      })
      return new this.google.maps.Marker({
        label:{
            text: plant.name,
            fontFamily: 'Roboto',
            fontWeight: 'Bold',
            color: '#444444'
          },
        position: {
          lat: instance.location.coordinates[0],
          lng: instance.location.coordinates[1]
        },
        icon: {
          labelOrigin: new this.google.maps.Point(12, -5),
          ...icon
        },
        map: this.map
      })
    },
    addListenerToMarker(markerInstance, plant, instance) {
      markerInstance.addListener('click', () => {
        this.plantInfo = plant
        this.plantInfo.instance = instance
        this.plantInfo.images = plant.images
        this.infoDrawer = true
      })
    }
  }
}
</script>
