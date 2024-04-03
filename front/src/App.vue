<script setup lang="ts">
import WindowsTaskBar from './components/WindowsTaskBar.vue'
import {Tab} from "@/_interfaces/Tab.ts";
import Modal from "@/components/Modal.vue";
import { Ref, ref} from 'vue'

const tabOpens: Ref<Tab[]> = ref([])
const modals = ref({
  app: { show: false, tab: { title: 'Explorateur de fichiers', icon: '📁', active: false } },
  msn: { show: false, tab: { title: 'MSN', icon: '📧', active: false } }
})

function toggleModal(modalName: 'app' | 'msn') {
  const modal = modals.value[modalName]
  modal.show = !modal.show

  if(modal.show){
    tabOpens.value.push(modal.tab)
  }else{
    tabOpens.value = tabOpens.value.filter(tab => tab.title !== modal.tab.title)
  }
}
</script>

<template>
  <button class="toggle__modal" @dblclick="toggleModal('app')">
    Application
  </button>

  <button class="toggle__modal" @dblclick="toggleModal('msn')">
    MSN
  </button>

  <div class="modal">
    <Modal v-if="modals.app.show" :title="modals.app.tab.title"/>

    <Modal v-if="modals.msn.show" :title="modals.msn.tab.title"/>
  </div>

  <WindowsTaskBar :tabs="tabOpens" />
</template>