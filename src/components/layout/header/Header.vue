<template>
  <div class="h-6" style="-webkit-app-region: drag;"></div>
  <div class="grid grid-cols-4 gap-4  drag h-10 ">
    <div class="col-start-1 col-end-4 flex gap-4">
      <div class="flex gap-3">
        <img :src="Coordinate" alt="image" class=" w-6 h-6 ml-4">
        <p v-if="province!=''">{{province}}, {{city}}</p>
        <p v-else>未知地址</p>
      </div>
      <div class="flex gap-3">
        <img :src="chooseWeather(weatherlive)" alt="image" class=" w-6 h-6 ml-4">
        <p v-if="weatherlive!=''">{{ weatherlive }} </p>
        <p v-else>-- </p>
      </div>
      <div class="flex gap-3">
        <img :src="Temperature" alt="image" class=" w-6 h-6 ml-4">
        <p  v-if="temperature!=''">{{ temperature }}℃</p>
        <p v-else>--℃</p>
      </div>
      
    </div>
    <div class="flex gap-3 col-start-4 justify-end mr-6">
      <IconPark @click="windowMin" class="cursor-pointer" :icon="Minus" size="22" theme="outline"/>
      <IconPark @click="miniWin" class="cursor-pointer" :icon="InternalReduction" size="20" theme="outline"/>
      <IconPark @click="windowClose" class="cursor-pointer" :icon="CloseSmall" size="22" theme="outline"/>
    </div>
  </div>
</template>


<script setup lang="ts">
  import {Minus,InternalReduction,CloseSmall} from '@icon-park/vue-next'
  import { ipcRenderer } from 'electron';
  import {Coordinate,Sun,CloudyDay,Shower,LightRain,Fog,ModerateRain,HeavyRain2,
    Rainstorm,HeavyRain,TorrentialRain,PartlyCloudy,Thunderstorm,UnkonwWeather,Temperature } from "@/assets/img"
  import weather from '@/utils/weather.json'
  import{useWeather} from '@/components/layout/header/useHeader'
  import { onMounted } from 'vue';
  const {temperature,weatherlive,province,city,useGetWeather} = useWeather()
  onMounted(() => {
    useGetWeather()
  })
  const windowMin=()=>{
    ipcRenderer.send("window-min")
  }
  const miniWin=()=>{
    ipcRenderer.send("miniwindow-open")
  }
  const windowClose=()=>{
    ipcRenderer.send("window-close")
  }
  const chooseWeather =(w:string) =>{
    switch(w){
        case "晴":
            // return weather["晴"];
            return Sun
        case "阴":
            // return weather["阴天"];
            return CloudyDay
        case "阵雨":
            // return weather["阵雨"];
            return Shower
        case "小雨":
            // return weather["小雨"];
            return LightRain
        case "中雨":
            // return weather["中雨"];
            return ModerateRain
        case "大雨":
            // return weather["大雨"];
            return HeavyRain2
        case "暴雨":
            // return weather["暴雨"];
            return  Rainstorm
        case "大暴雨":
            // return weather["大暴雨"];   
            return HeavyRain
        case "特大暴雨":
            // return weather["特大暴雨"];
            return TorrentialRain
        case "雾":
            // return weather["雾"];
            return Fog
        case "多云":
            // return weather["多云"];
            return PartlyCloudy
        case "雷阵雨":
            // return weather["雷阵雨"]; 
            return   Thunderstorm
        default:
            // return weather["无图标的天气"]
            return UnkonwWeather
    }
    
}
</script>

<style lang="scss" scoped>

</style>