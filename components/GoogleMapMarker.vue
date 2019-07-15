<template>
  <svg
    ref="leafIconSVG"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"
      :fill="fillColour"
      fillOpacity="1.0"
      :stroke="strokeColour"
    />
  </svg>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    iconName: {
      type: String,
      default: 'leaf'
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    },
    fillColour: {
      type: String,
      default: '#008000'
    },
    strokeColour: {
      type: String,
      default: '#004d00'
    }
  },
  data() {
    return {
      markerInst: null
    }
  },
  mounted() {
    const leafIcon = {
      url: 'data:image/svg+xml;utf8,' + encodeURIComponent(this.$refs.leafIconSVG.outerHTML),
      size: null, // new this.google.maps.Size(24, 24),
      origin: null, // new this.google.maps.Point(0, 0),
      anchor: null, // new this.google.maps.Point(12, 12),
      scaledSize: new this.google.maps.Size(this.width, this.height)
    }
    this.markerInst = new this.google.maps.Marker({
      label: this.marker.label,
      position: this.marker.position,
      icon: leafIcon,
      map: this.map
    })
  }
}
</script>
