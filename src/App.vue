<template>
  <div id="app">
    <div class="bg">
      <div class="gradient"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
/* ... */
</style>
