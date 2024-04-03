<script setup lang="ts">
import Window from '@/components/Window.vue';
import { ref, Ref } from 'vue';
import { Tab } from '@/_interfaces/Tab.ts';
import WindowMSN from '@/components/templates/WindowMSN.vue';

const emit = defineEmits(['openedTabs']);

const tabOpens: Ref<Tab[]> = ref([]);
const modals = ref({
  app: {
    show: false,
    tab: {
      title: 'Explorateur',
      icon: 'explorer.png',
      active: false,
      content: WindowMSN,
    },
  },
  msn: {
    show: false,
    tab: {
      title: 'MSN',
      icon: 'msn-default.png',
      active: false,
      content: WindowMSN,
    },
  },
});

function toggleModal(modalName: 'app' | 'msn') {
  const modal = modals.value[modalName];
  modal.show = !modal.show;

  if (modal.show) {
    tabOpens.value.push(modal.tab);
  } else {
    tabOpens.value = tabOpens.value.filter(
      (tab) => tab.title !== modal.tab.title
    );
  }
  emit('openedTabs', tabOpens.value);
}
</script>

<template>
  <button class="toggle__modal" @dblclick="toggleModal('app')">
    Application
  </button>

  <button class="toggle__modal" @dblclick="toggleModal('msn')">MSN</button>

  <div class="modal">
    <Window v-if="modals.app.show" :tab="modals.app.tab" />

    <Window v-if="modals.msn.show" :tab="modals.msn.tab" />
  </div>
</template>
