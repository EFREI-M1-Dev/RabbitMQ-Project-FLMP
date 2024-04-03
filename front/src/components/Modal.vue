<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
<h1>
  {{ title }}
</h1>
</template>

<style scoped lang="scss">

</style>