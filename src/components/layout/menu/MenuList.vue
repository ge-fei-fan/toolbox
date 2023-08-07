<template>
  <div class="flex w-20 h-16 items-center pointer-events-none">
    <img :src="Notify" alt="image" class=" px-3 w-full h-full">
    <p class="text-2xl font-mono" > ToolBox</p>
  </div>
  <ElScrollbar>
    <div class=" px-3 space-y-1.5" v-for="menuItem in menus">
      <div class="menu-title text-main">{{ menuItem.name }}</div>
      <div
          class="menu-item hover-bg-main text-main"
          v-for="menu in menuItem.menus"
          :key="menu.key"
          :class="{ 'active': currentKey === menu.key }"
          @click="click(menu)"
      >
        <IconPark :icon="menu.icon" size="18" :theme="menu.theme"/>
        <span class="ml-2">{{ menu.name }}</span>
      </div>
    </div>
  </ElScrollbar>
  <div class="mt-10 px-3 space-y-1.5 mb-8" v-for="menuItem in settingmenu">
    <div class="menu-title text-main ">{{ menuItem.name }}</div>
    <div
        class="menu-item hover-bg-main text-main "
        v-for="menu in menuItem.menus"
        :key="menu.key"
        :class="{ 'active': currentKey === menu.key }"
        @click="click(menu)"
    >
      <IconPark :icon="menu.icon" size="18" :theme="menu.theme"/>
      <span class="ml-2">{{ menu.name }}</span>
    </div>
  </div>
  
</template>

<script setup lang="ts">

import {Notify} from "@/assets/img"
import {useMenu} from "@/components/layout/menu/useMenu";
import IconPark from "@/components/common/IconPark.vue";

const {settingmenu,menus, currentKey, click} = useMenu()

</script>


<style lang="scss" scoped>
.menu-title {
  @apply text-xs pl-4 pr-4 pb-2;
}

.menu-item {
  @apply text-sm pl-3.5 pr-3 pt-3 pb-3 rounded cursor-pointer transition-colors flex items-center;
}

.active {
  @apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default;
}
</style>
