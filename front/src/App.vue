<script setup lang="ts">
import WindowsTaskBar from './components/WindowsTaskBar.vue';
import DesktopView from "@/view/DesktopView.vue";
import {Tab} from "@/_interfaces/Tab.ts";
import {Ref, ref} from "vue";

let openedTabs: Ref<Tab[]> = ref([])

function handleOpenedTabs(tabs: Tab[]) {
  openedTabs.value = tabs
}
</script>

<template>
  <DesktopView @openedTabs="handleOpenedTabs"/>

  <WindowsTaskBar :tabs="openedTabs"/>
</template>
