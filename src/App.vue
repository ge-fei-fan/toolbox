<template>
  <RouterView />
</template>

<script setup lang="ts">

import { redderIpcInit } from "./utils/navite";



redderIpcInit()

</script>
<style lang="scss">

</style>
