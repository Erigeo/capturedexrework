<template>
  <main>
    <BannerNav/>
    <RouterView/>
  </main>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import BannerNav from './components/BannerNav.vue';



export default defineComponent({
    components: { BannerNav }
})


</script>


<style>

</style>
