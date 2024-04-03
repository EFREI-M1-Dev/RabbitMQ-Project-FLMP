<script setup lang="ts">
import Window from '@/components/Window.vue';
import DesktopShortcutItem from '@/components/desktop/DesktopShortcutItem.vue';
import { ref, Ref } from 'vue';
import { Tab } from '@/_interfaces/Tab.ts';
import WindowMSN from '@/components/templates/WindowMSN.vue';
import WindowsTaskBar from '@/components/WindowsTaskBar.vue';

let openedTabs: Ref<Tab[]> = ref([]);

function handleOpenedTabs(tabs: Tab[]) {
  openedTabs.value = tabs;
}

const tabOpens: Ref<Tab[]> = ref([]);
const modals = ref({
  exp: {
    show: false,
    tab: {
      type: 'exp',
      title: 'My documents',
      icon: 'explorer.png',
      active: false,
      content: '',
    },
  },
  msn: {
    show: false,
    tab: {
      type: 'msn',
      title: 'MSN',
      icon: 'msn-default.png',
      active: false,
      content: WindowMSN,
    },
  },
  cmp: {
    show: false,
    tab: {
      type: 'cmp',
      title: 'My Computer',
      icon: 'computer.png',
      active: false,
      content: '',
    },
  },
  trash: {
    show: false,
    tab: {
      type: 'trash',
      title: 'Recycle bin',
      icon: 'trash.png',
      active: false,
      content: '',
    },
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
  handleOpenedTabs(tabOpens.value);
}

const handleCloseWindow = (type: ModalName) => {
  const modal = modals.value[type];
  modal.show = false;
  tabOpens.value = tabOpens.value.filter((tab) => tab.type !== modal.tab.type);
  handleOpenedTabs(tabOpens.value);
};
</script>

<template>
  <div class="desktop">
    <DesktopShortcutItem
      v-for="(item, index) in modals"
      :item="item"
      :key="index"
      @show-modal="toggleModal"
    />
  </div>

  <transition appear mode="out-in" name="scale">
    <Window
      v-if="modals.msn.show"
      :tab="modals.msn.tab"
      @close-window="handleCloseWindow"
    />
  </transition>

  <transition appear mode="out-in" name="scale">
    <Window
      v-if="modals.exp.show"
      :tab="modals.exp.tab"
      @close-window="handleCloseWindow"
    />
  </transition>

  <WindowsTaskBar :tabs="openedTabs" />
</template>

<style lang="scss" scoped>
.desktop {
  max-width: 98vw;
  margin: auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-clip: border-box;
    background: url('/img/windows_xp.jpg') center / cover no-repeat;
    // background: url('/img/windows_shrek.jpg') center / cover no-repeat;
  }
}
</style>
