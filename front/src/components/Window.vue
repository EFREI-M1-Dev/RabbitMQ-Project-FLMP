<script setup lang="ts">
import { vDraggable } from '@neodrag/vue';
</script>

<template>
  <div v-draggable="{ bounds: 'parent' }" class="window">
    <div class="head">
      <div><img src="/public/icons/msn-default.png" /><span>Coucou</span></div>
      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
    <div class="content-border">
      <ul class="options-bar">
        <li>Files</li>
        <li>Edit</li>
        <li>View</li>
        <li>Favorites</li>
        <li>Tools</li>
        <li>Help</li>
      </ul>
      <div class="content">testetst</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.window {
  width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .head {
    font-family: 'Source Sans 3', sans-serif;
    height: 34px;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    color: #fff;
    background: #0055e5;
    box-shadow: inset #001590 -2px 0 3px 0, inset #0028c4 1px 0 2px 0,
      inset #013ebf 0 -2px 3px 0, inset #026afe 0 -12px 6px 0,
      inset #3897ff 0 4px 3px 0;
    border-radius: 10px 10px 0 0;
    font-size: 14px;
    cursor: grab;

    > div:first-of-type {
      display: flex;
      gap: 6px;
      align-items: center;

      > img {
        width: 20px;
        aspect-ratio: 1/1;
      }
    }

    > div:last-of-type {
      padding-top: 4px;
      display: flex;
      align-items: center;
      gap: 2px;

      > button {
        height: 20px;
        aspect-ratio: 1/1;
        border: 1px solid white;
        border-radius: 2.5px;
        background: #2266f5;
        box-shadow: inset #0844c3 -2px -3px 5px 0px,
          inset #ffffff99 4px 2px 8px 0px,
          inset rgba(14, 80, 237, 0.5) 1px 1px 0 0, inset #0844c3 -1px -1px 0 0;
        cursor: pointer;

        &:hover {
          background: #487ef3;
        }

        &:last-of-type {
          background: #e55022;
          box-shadow: inset #aa2300 -2px -3px 5px 0px,
            inset #ffffff99 4px 2px 8px 0px,
            inset rgba(229, 80, 34, 0.5) 1px 1px 0 0,
            inset #ae2400 -1px -1px 0 0;

          &:hover {
            background: #e4704d;
          }
        }
      }
    }
  }

  .content-border {
    border-width: 0 3px 3px 3px;
    border-style: solid;
    border-color: #004cff;
    box-shadow: inset #0732d9 2px 2px 2px 0, inset #00138c -2px -2px 2px 0;

    .options-bar {
      display: flex;
      align-items: center;
      background-color: #ece9d8;
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
      height: 28px;
      padding: 0 14px;
      gap: 18px;
    }

    .content {
      background: white;
    }
  }
}
</style>