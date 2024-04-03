<script setup lang="ts">
import Window from "@/components/Window.vue";
import DesktopShortcutItem from "@/components/desktop/DesktopShortcutItem.vue";
import {ref, Ref} from "vue";
import {Tab} from "@/_interfaces/Tab.ts";

const emit = defineEmits(['openedTabs']);

const tabOpens: Ref<Tab[]> = ref([]);
const modals = ref({
  exp: {
    show: false, tab: { type: "exp", title: 'Explorer', icon: 'explorer.png', active: false },
  },
  msn: {
    show: false, tab: { type: "msn", title: 'MSN', icon: 'msn-default.png', active: false }
  },
});

type ModalName = 'exp' | 'msn';

function toggleModal(modalName: ModalName) {
  const modal = modals.value[modalName];
  modal.show = !modal.show;

  if (modal.show) {
    tabOpens.value.push(modal.tab);
  } else {
    tabOpens.value = tabOpens.value.filter(
        (tab) => tab.type !== modal.tab.type
    );
  }
  emit('openedTabs', tabOpens.value);
}


const handleCloseWindow = (type: ModalName) => {
  const modal = modals.value[type];
  modal.show = false;
  tabOpens.value = tabOpens.value.filter(
      (tab) => tab.type !== modal.tab.type
  );
  emit('openedTabs', tabOpens.value);
}

</script>

<template>
  <div class="desktop">
    <DesktopShortcutItem v-for="(item, index) in modals" :item="item" :key="index" @show-modal="toggleModal"/>
  </div>

  <transition appear mode="out-in" name="scale">
    <Window v-if="modals.msn.show" :tab="modals.msn.tab" @close-window="handleCloseWindow"/>
  </transition>

  <transition appear mode="out-in" name="scale">
    <Window v-if="modals.exp.show" :tab="modals.exp.tab" @close-window="handleCloseWindow"/>
  </transition>

</template>

<style lang="scss" scoped>
.desktop{
  max-width: 98vw;
  margin: auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
