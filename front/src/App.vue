<script setup lang="ts">
import { ref, Ref } from 'vue';

import AuthView from './view/AuthView.vue';
import DesktopView from '@/view/DesktopView.vue';

let userConnected: Ref<boolean> = ref(true);
</script>

<template>
  <AuthView v-if="!userConnected" />
  <DesktopView v-if="userConnected" />
</template>

<style scoped lang="scss"></style>
