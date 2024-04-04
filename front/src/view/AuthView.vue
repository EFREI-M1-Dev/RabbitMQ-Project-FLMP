<script setup lang="ts">
const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log('submit');
};
</script>

<template>
  <div class="container-page">
    <div class="window">
      <div class="head">
        <span>Log On to Windows</span>
      </div>
      <div class="content-border">
        <div class="content">
          <div class="header">
            <img src="/icons/windows_xp_pro.svg" />
          </div>
          <form @submit="handleSubmit">
            <label for="username">Username:</label>
            <input name="username" type="text" />
            <label for="password">Password:</label>
            <input name="password" type="password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #004e98;

  .window {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: fit-content;

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

      > span {
        display: flex;
        align-items: center;
      }
    }

    .content-border {
      border-width: 0 3px 3px 3px;
      border-style: solid;
      border-color: #004cff;
      background-color: #fff;

      .content {
        form {
          display: flex;
          flex-direction: column;
          padding: 20px;
          background-color: #edeade;

          gap: 4px;

          button {
            margin-top: 6px;
            padding: 5px;
          }
        }
      }
    }
  }
}
</style>
