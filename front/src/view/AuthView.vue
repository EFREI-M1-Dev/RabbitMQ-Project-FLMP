<script setup lang="ts">
const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log('submit');
};
</script>

<template>
  <div class="container-page">
    <form class="popin" @submit="handleSubmit">
      <label for="username">Username:</label>
      <input name="username" type="text" />
      <label for="password">Password:</label>
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .popin {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: blue;
    color: white;
    gap: 4px;

    button {
      margin-top: 6px;
      padding: 5px;
    }
  }
}
</style>
