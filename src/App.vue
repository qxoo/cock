<template>
  <h1>СЫН ШЛЮХИ К ВАШИМ УСЛУГАМ</h1>
  <div class="wrapper">
    <div class="wrapper_nav"></div>
    <div class="wrapper_content"></div>
  </div>
</template>
<script setup lang="ts">
  import { defineComponent } from "vue";

  defineComponent({
    name: "App"
  })
</script>
<style lang="scss">
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper{
  display: flex;
  &_nav{
    max-width: 20%;
  }
  &_content{
    max-width: 80%;
  }
}
</style>
