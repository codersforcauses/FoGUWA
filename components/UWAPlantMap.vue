<template>
  <google-map-loader
    :map-config="mapConfig"
    :map-inst.sync="map"
    :google-inst.sync="google"
  />
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import GoogleMapLoader from './GoogleMapLoader'
import iconData from '@/assets/js/plantIcons'
import { uwaMapSettings } from '@/assets/js/mapSettings'
const { iconStyle } = iconData

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
  },
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null,
  }),
  computed: {
    ...mapState(['position']),
    ...mapGetters({
      getPlantIcon: 'plants/getPlantIcon'
    }),
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
      }
    }
  },
  methods: {
    ...mapMutations({
      setPlant: 'plants/setSelectedPlant'
    }),
    loadMarkers() {
      if (this.map && this.google) {
        this.clearMarkers()        
        // Create new markers and store them
        this.plants.forEach((plant, index) => {
          // Plot all instances
          plant.instances.forEach(instance => {
            const markerInst = this.createMarkerInstance(plant, instance)
            this.addListenerToMarker(markerInst, plant)
            this.markerInstances.push(markerInst)
          })
        })
      }
    },
    clearMarkers() {
      this.markerInstances.forEach(marker => {
        marker.setMap(null)
      })
      this.markerInstances = []
    },
    createMarkerInstance(plant, instance) {
      const icon = this.getPlantIcon(plant.icon)
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
    addListenerToMarker(markerInstance, plant) {
      markerInstance.addListener('click', () => {
        this.$emit('plant-clicked', plant)
        this.setPlant(plant)
      })
    }
  }
}
</script>
