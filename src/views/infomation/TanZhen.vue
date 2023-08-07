<template>
    <div class="h-screen w-full">
        <iframe  id="my-webview" src="https://nz.geff.top/">
        </iframe >
    </div>
</template>
  
  <script setup lang="ts">
 import { defineComponent } from 'vue'

    // export default defineComponent({
    // name: 'MyWebview',
    // })
  </script>
    
  
  <style lang="scss">
  #my-webview {
    height: 700px; /* 设置为 500 像素 */
    width: 820px;
    }
  </style>