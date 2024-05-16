<script setup lang="ts">
import WindowsTab from '@/components/WindowsTab.vue';
import { Tab } from '@/_interfaces/Tab.ts';

defineProps<{
  tabs: Tab[];
}>();

function formatTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}
</script>
<!--  -->

<template>
  <div class="taskbar">
    <img src="/img/start_btn.png" alt="" title="Déconnexion" @click="logout" />

    <div class="taskbar__tabs">
      <WindowsTab v-for="tab in tabs" :key="tab.title" :tab="tab" />
    </div>

    <div class="taskbar__tray">
      {{ formatTime() }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.taskbar {
  font-family: 'Source Sans 3', sans-serif;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: -1;
  width: 100vw;
  height: 4.7vh;
  left: 0;
  bottom: 0;
  background: #245ddb;
  box-shadow: inset 0 4px 4px rgba(109, 178, 255, 0.7),
    inset 0px -5px 7px rgba(0, 0, 0, 0.22), inset 0px 10px 8px #3888e9;

  img {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4.7vh;

    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }

  &__tabs {
    margin-left: 170px;
    display: flex;
    gap: 0.125rem;
    height: 100%;
    align-items: center;
  }

  &__tray {
    color: white;
    background: linear-gradient(
      180deg,
      rgb(32 176 251) 0%,
      rgb(14 137 234) 50%,
      rgb(21 147 233) 100%
    );
    box-sizing: border-box;
    box-shadow: inset #5a89a0 -2px 0 3px 0, inset #3a546e 0 -2px 3px 0,
      inset #e2e7ff 0 2px 3px 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
