<template>
  <div>
    <canvas id="canvas" width="500" height="500" @onResize="handleResize" @mousemove="setMouse">
    </canvas>
  </div>
</template>

<script>
/* eslint-disable vue/no-parsing-error */
import zdog from "zdog"

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    illo: null,
    illustrationZoom: 360,
    canvas: null,
    canvasWidth: 0,
    canvasHeight: 0,
    mouseFromCenterX: 0,
    mouseFromCenterY: 0
  }),
  mounted() {
    this.canvas = document.getElementById("canvas")
    const rect = this.canvas.getBoundingClientRect()
    this.canvasWidth = rect.width
    this.canvasHeight = rect.height
    this.illo = new zdog.Illustration({
      element: this.canvas,
      resize: true,
      zoom: 1.5
    })
    this.addShapes()
    this.faceMouse()
  },
  // ready () {
  //   window.addEventListener('resize', this.handleResize)
  // },
  // beforeDestroy () {
  //   window.removeEventListener('resize', this.handleResize)
  // },
  methods: {
    // handleResize(){
    //   const rect = this.canvas.getBoundingClientRect()
    //   this.canvasWidth = rect.width
    //   this.canvasHeight = rect.height
    // },
/* eslint-disable no-new */
    addShapes(){
      new zdog.Ellipse({
        addTo: this.illo,
        diameter: 80,
        stroke: 20,
        color: '#636',
      })
    },
    faceMouse(){
      this.illo.rotate.x = (this.mouseFromCenterY < 0 ? -1 : 1) * ((1 / 50) * Math.sqrt(Math.abs(this.mouseFromCenterY)))
      this.illo.rotate.y = (this.mouseFromCenterX < 0 ? -1 : 1) * ((1 / 50) * Math.sqrt(Math.abs(this.mouseFromCenterX)))
      this.illo.updateRenderGraph()
      requestAnimationFrame( this.faceMouse )
    },
    setMouse(event){
      const rect = this.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      this.mouseFromCenterX = mouseX - Math.round( this.canvasWidth/2 )
      this.mouseFromCenterY = mouseY - Math.round( this.canvasHeight/2 )
    }
  }
}
</script>

<style scoped>
  #canvas {
    width: 100vw;
    height: calc(100vh - 52px)
  }
</style>