<script setup lang="ts">
</script>

<template>
  <div class="taskbar">
    <img src="/img/start_btn.png" alt="">
  </div>
</template>

<style scoped lang="scss">
.taskbar{
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 4.7vh;
  left: 0;
  bottom: 0;
  background: #245DDB;
  box-shadow: inset 0 4px 4px rgba(109, 178, 255, 0.7), inset 0px -5px 7px rgba(0, 0, 0, 0.22), inset 0px 10px 8px #3888E9;

  img{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4.7vh;

    &:hover{
      cursor: pointer;
      opacity: .9;
    }
  }
}
</style>
