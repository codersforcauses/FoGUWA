<template>
  <google-map-loader
    :map-config="mapConfig"
    :map-inst.sync="map"
    :google-inst.sync="google"
  />
</template>

<script>
import { mapState } from 'vuex'
import GoogleMapLoader from './GoogleMapLoader'
import { uwaMapSettings } from '@/assets/js/mapSettings'
import { plants } from '@/assets/plantdb.json'
import plantIcons from '@/assets/js/plantIcons.js'

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.9804624, lng: 115.818 }

export default {
  components: {
    'google-map-loader': GoogleMapLoader
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null
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
    markers() {
      // return the array
      return [...plants]
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
        this.markers.forEach((marker, index) => {
          // Plot all instances
          const defaultColour = {
            fillColor: '#f7b538',
            fillOpacity: 1.0,
            strokeColor: '#f7d55b',
            scale: 1
          }
          for (const instance of marker.instances) {
            const markerInst = new this.google.maps.Marker({
              label: marker.name,
              position: instance.location,
              icon: plantIcons.hasOwnProperty(marker.type)
                ? plantIcons[marker.type]
                : plantIcons.leaf,
              ...defaultColour,
              map: this.map
            })
            this.markerInstances.push(markerInst)
          }
        })
      }
    }
  }
}
</script>
