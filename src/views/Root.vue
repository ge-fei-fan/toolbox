<template>
  <meta name="referrer" content="no-referrer">
  <div class="w-screen h-screen flex items-stretch overflow-hidden" >
    <div class="w-1/5 h-screen  flex-shrink-0">
      <Menu/>
    </div>
    <div class="flex-1 flex flex-col bg-view">
      <div class="h-16">
        <Header/>
      </div>
      <div class="flex-1  overflow-hidden">
          <div class="container  mx-auto">
            <RouterView/>
          </div>
      </div>
      <!-- <div class="h-20">
        <Footer/>
      </div> -->
    </div>


  </div>
</template>

<script setup lang="ts">

import Menu from "@/components/layout/menu/Menu.vue";
import { onMounted } from "vue";
onMounted( () => {
  // window.document.documentElement.setAttribute('class', 'dark');
})
</script>
<style lang="scss">
</style>
