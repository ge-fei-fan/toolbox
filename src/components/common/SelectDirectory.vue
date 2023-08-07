<template>
    <div class="flex justify-between items-center p-0.5 bg-white border  rounded w-96">
        <div class="ml-2 text-sm truncate ">{{ logPath }} </div>
        <div class="flex gap-1">
            <button @click="searchDirectory" type="button" class="btn bg-gray-200 hover:bg-gray-300 px-3 p-1 text-sm rounded">
                <IconPark :icon="FolderSearch" size="16" theme="multi-color"/>
            </button>
            <button @click="OpenDirectory" type="button" class="btn bg-gray-200 hover:bg-gray-300 px-3 p-1 text-sm rounded">
                <IconPark :icon="FolderOpen" size="16" theme="multi-color"/>
            </button>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
import {FolderOpen,FolderSearch} from '@icon-park/vue-next'
defineProps<{
    logPath: string,
    searchDirectory :any,
    OpenDirectory :any
}>()
    
</script>


<style lang="scss" scoped>
</style>