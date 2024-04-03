<script setup lang="ts">
import {Tab} from "@/_interfaces/Tab.ts";

defineProps<{
  tab: Tab
}>()
</script>

<template>
  <div class="tab">
    <img :src="'/icons/' + tab.icon" alt="">
    <span>{{ tab.title }}</span>
  </div>
</template>

<style scoped lang="scss">
.tab{
  box-sizing: border-box;
  background: #3980F4;
  border: 0.5px solid rgba(35, 75, 157, 0.5);
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.07), inset -2px -2px 2px rgba(0, 0, 0, 0.1), inset 0px 4px 8px rgba(255, 255, 255, 0.15), inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  gap: .5rem;
  align-items: center;
  width: 10rem;
  height: 4vh;
  padding: 0 1rem 0 .5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    background: #4A8DFC;
  }

  img{
    width: 1.25rem;
    height: auto;
  }
}
</style>