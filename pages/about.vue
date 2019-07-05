<template>
  <div id="about">
    <div class="cfc-image">
      <img src="~/static/cfc-icon.png">
    </div>
    <div class="about-info">
      <h1>About Us</h1>
      <p>Student Developers for Charities and Not-For-Profits. Visit our website below for more information.</p>
      <a href="https://codersforcauses.org/landing">Coders for Causes website</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
#about{
  display: flex;
  flex-wrap: wrap;
}
.cfc-image{
  width: 20%;
  height: auto;
  padding: 20px;
}
img{
  width: 100%;
  height: auto;
}
.about-info{
  padding: 20px;
  width: 60%;
}
</style>
