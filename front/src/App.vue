<script setup lang="ts">
import {ref, Ref} from 'vue';

import AuthView from './view/AuthView.vue';
import DesktopView from '@/view/DesktopView.vue';

let userConnected: Ref<string | null> = ref(localStorage.getItem('user'));

function login() {
  userConnected.value = localStorage.getItem('user');
}
</script>

<template>
  <AuthView v-if="!userConnected" @login="login" />
  <DesktopView v-if="userConnected" />
</template>
