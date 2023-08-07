<template>
  <div class="grid grid-cols-2 gap-4 p-4 py-8">
    <div class="rounded-lg shadow bg-gray-200 ">
        <img :src="Computer" alt="Computer" class="rounded-full bg-gray-200 relative -top-8 mx-auto w-16 h-16 object-cover">
        <div class="relative -top-8 ">
            <IconText
              title="服务器类型"
              text="本地服务"
            ></IconText>
            <IconText
              title="服务器状态"
             :text="serverStatus"
            ></IconText>
        </div>
    </div>
    <div class="rounded-lg shadow bg-gray-200 ">
        <img :src="Computer" alt="Computer" class="rounded-full bg-gray-200 relative -top-8 mx-auto w-16 h-16 object-cover">
        <div class="relative -top-8 ">
            <IconText
              title="测试"
              :text=a
            ></IconText>
            
        </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
 import {Computer} from "@/assets/img";
 import IconText  from '@/components/common/IconText.vue'
import { onMounted } from "vue";
import { useInformation } from "./Information";
const {checkServer,serverStatus} = useInformation()
 const a:string="测试"
 onMounted(async () => {
  checkServer()
 })
</script>
  

<style lang="scss">

</style>