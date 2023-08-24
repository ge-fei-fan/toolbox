<template>
  <div
      @mousedown="winDown()"
      @mousemove="winMove"
      @mouseup="winUp" 
  >
        <RouterView></RouterView>
    </div>
</template>
  

<script setup lang="ts">
  import { ipcRenderer } from 'electron';
import { RouterView } from 'vue-router';
  let canMoving = false;
  
  let  XY:any=null
  // 移动窗口----start
  const winDown=()=> {
          console.log("winDown")
          canMoving = true;
          const xy = ipcRenderer.sendSync("win-start");
          XY = JSON.parse(xy);
      }
  const winMove=(e: any) =>{
      console.log("winMove")
      //窗口最大化时禁止移动
      if (!canMoving) return;
      const params = {
        x: e.screenX - XY.x,
        y: e.screenY - XY.y,
      };
      console.log(params)
      ipcRenderer.send("win-move", JSON.stringify(params));
      }
  const  winUp=() =>{
      
      canMoving = false;
      console.log(canMoving)
    }
    // 移动窗口----end
  
  </script>
  <style lang="scss">
  </style>
  