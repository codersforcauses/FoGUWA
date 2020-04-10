<template>
  <canvas id="canvas" width="500" height="500" @onResize="handleResize" @mousemove="setMouse" />
</template>

<script>
import zdog from "zdog"
import { fourTree, roundTree } from '~/assets/js/zdogShapes'
export default {
  props: {
    errorCode: {
      type: Number,
      default: 400
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
    addShapes(){
      const color = "#70cf94"  
      const colorDarker = "#6bc78e"  
      const colorLighter = "#76d69a"
      fourTree({ x: -60 }, color, this.illo)
      roundTree({ z: -50 }, [color, colorDarker, colorLighter], this.illo)
      if(this.errorCode === 404) fourTree({ x: 60 }, color, this.illo)
      else roundTree({ x: 60 }, [color, colorDarker, colorLighter], this.illo)

    },
    faceMouse(){
      this.illo.rotate.x = this.calcRotation(this.mouseFromCenterY) // X rotation requires Y input
      this.illo.rotate.y = this.calcRotation(this.mouseFromCenterX) // Go figure
      this.illo.updateRenderGraph()
      requestAnimationFrame( this.faceMouse )
    },
    calcRotation(position){
      return (position > 0 ? -1 : 1) * ((1 / 100) * Math.sqrt(Math.abs(position)))
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