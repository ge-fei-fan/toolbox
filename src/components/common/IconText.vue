<template>
    <div class="bg-gray-200 mx-4 pb-3">
        <div class="flex rounded-lg w-full bg-white pl-2 text-base font-semibold outline-0 h-8 items-center">
        <!-- <div class="flex w-3/12	 items-center justify-center border-gray-200 rounded-lg bg-gray-300 m-1 py-1 text-sm">
            <div>{{title}}</div>
        </div> -->
        <div class="text-sm">{{title}}:</div>
        <div class="flex  items-center justify-center ml-2 h-8" >{{ text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title:string,
    text: string,
}>()
    
</script>


<style lang="scss" scoped>
</style>