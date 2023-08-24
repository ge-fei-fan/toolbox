<template>
    <div class="h-screen w-full">
      <Clock/>
    </div>
</template>
  
<script setup lang="ts">
  import Clock  from '@/components/common/Clock.vue'
  import { useRouter } from 'vue-router'
  const $router = useRouter()
  console.log($router.currentRoute.value)
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