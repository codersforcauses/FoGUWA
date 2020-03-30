<template>
  <div>
    <canvas id="canvas" width="500" height="500" @onResize="handleResize" @mousemove="setMouse">
    </canvas>
    <p id="text">
      This page does not exist...
    </p>
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
    this.$nextTick(() => {
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
    })
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
      const color = "#70cf94"  
      const colorLighter = "#76d69a"  
      const colorDarker = "#6bc78e"  
      // Ground 1
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: -30, y: 50 },
          { x: 30, y: 50 }
        ],
        translate: { x: -60 },
        closed: false,
        stroke: 5,
        color,
      });
      // Tree 1
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: -10, y: 50 },
          { x:  -10, y: -50 },
          { bezier: [
            { x: -10, y: -50 },
            { x: -50, y: 20 },
            { x: -10, y: 20 }
          ] },
          { move: { x: 0, y: 50 } },
          { x: 0, y: -30 },
          { bezier: [
            { x: 0, y: -30 },
            { x: 30, y: 20 },
            { x: 0, y: 20 }
          ] },
        ],
        translate: { x: -60 },
        closed: false,
        stroke: 5,
        fill: true,
        color,
      });

      // Ground 2
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: -30, y: 50 },
          { x: 30, y: 50 }
        ],
        translate: { x: 0, z: -50 },
        closed: false,
        stroke: 5,
        color,
      });
      // Tree 2
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: 0, y: 50 },
          { x:  0, y: -40 },
        ],
        translate: { x: -10, z: -50 },
        closed: false,
        stroke: 5,
        fill: true,
        color,
      });
      // Forward leaves
      new zdog.Ellipse({
        addTo: this.illo,
        diameter: 15,
        translate: { x: -30, y: 0, z: -40 },
        stroke: 5,
        fill: true,
        color: colorDarker,
      });
      // Branch forward
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: 0, y: 15 },
          { x: -20, y: 0, z: 10 },
        ],
        translate: { x: -10, z: -50 },
        closed: false,
        stroke: 5,
        fill: true,
        color: colorDarker,
      });
      // Backward leaves
      new zdog.Ellipse({
        addTo: this.illo,
        diameter: 15,
        translate: { x: 10, y: 10, z: -60 },
        stroke: 5,
        fill: true,
        color: colorLighter,
      });
      // Branch backward
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: 0, y: 25 },
          { x:  20, y: 10, z: -10 },
        ],
        translate: { x: -10, z: -50 },
        closed: false,
        stroke: 5,
        fill: true,
        color: colorLighter,
      });
      // Main leaves
      new zdog.Ellipse({
        addTo: this.illo,
        diameter: 50,
        translate: { x: -10, y: -20, z: -50 },
        stroke: 5,
        fill: true,
        color,
      });

      // Ground 3
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: -30, y: 50 },
          { x: 30, y: 50 }
        ],
        translate: { x: 60 },
        closed: false,
        stroke: 5,
        color,
      });
      // Tree 3
      new zdog.Shape({
        addTo: this.illo,
        path: [
          { x: -10, y: 50 },
          { x:  -10, y: -50 },
          { bezier: [
            { x: -10, y: -50 },
            { x: -50, y: 20 },
            { x: -10, y: 20 }
          ] },
          { move: { x: 0, y: 50 } },
          { x: 0, y: -30 },
          { bezier: [
            { x: 0, y: -30 },
            { x: 30, y: 20 },
            { x: 0, y: 20 }
          ] },
        ],
        translate: { x: 60 },
        closed: false,
        stroke: 5,
        fill: true,
        color,
      });
    },
    faceMouse(){
      this.illo.rotate.x = (this.mouseFromCenterY > 0 ? -1 : 1) * ((1 / 100) * Math.sqrt(Math.abs(this.mouseFromCenterY)))
      this.illo.rotate.y = (this.mouseFromCenterX > 0 ? -1 : 1) * ((1 / 100) * Math.sqrt(Math.abs(this.mouseFromCenterX)))
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
#text {
  align-self: center;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 30px;
  color: #666;
  position: absolute;
  left: calc(50vw - 175px);
  top: calc(50vh + 120px);
}
  #canvas {
    height: calc(100vh - 96px);
    width: 100vw;
  }
</style>