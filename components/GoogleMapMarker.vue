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
    }
  },
  data() {
    return {
      markerInst: null
    }
  },
  mounted() {
    this.markerInst = new this.google.maps.Marker({
      label: this.marker.label,
      position: this.marker.position,
      map: this.map
    })
  }
}
</script>
