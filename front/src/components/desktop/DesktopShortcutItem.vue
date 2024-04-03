<script setup lang="ts">
import {Tab} from "@/_interfaces/Tab.ts";
import {PropType} from "vue";
import {vDraggable} from '@neodrag/vue';

const emit = defineEmits(['showModal']);

const props = defineProps({
  item: {
    type: Object as PropType<{ tab: Tab; show: boolean }>,
    required: true,
  },
});

const dragOptions = {
  bounds: 'body',
  grid: [20, 20] as [number, number],
  onDragStart: () => {
  },
  onDragEnd: () => {
  }
}

const handleDoubleClick = () => {
  emit('showModal', props.item.tab.type);
}
</script>

<template>
  <div class="shortcut__item" v-draggable="dragOptions" @dblclick="handleDoubleClick">
    <img :src="'/icons/' + item.tab.icon" :alt="item.tab.title" />
    <span class="shortcut__item__text">{{ item.tab.title }}</span>
  </div>
</template>

<style scoped lang="scss">
.shortcut{

  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    &.neodrag-dragging{
      cursor: grabbing;
    }

    img{
      width: auto;
      height: 48px;
      pointer-events: none;
    }

    &:hover{
      background-color: rgba(255, 255, 255, 0.1);
    }

    &__text{
      font-family: $segoe;
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      line-height: 23px;
      display: flex;
      align-items: center;
      text-align: center;
      user-select: none;
      text-transform: capitalize;

      color: #FFFFFF;

      text-shadow: 1px 1.25px 0px #000000;

    }
  }
}
</style>