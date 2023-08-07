<template>
  <RouterView />
</template>

<script setup lang="ts">
import { userClipboardInit } from "./utils/clipboard";
import { redderIpcInit } from "./utils/navite";


userClipboardInit()
redderIpcInit()

</script>
<style lang="scss">

</style>
