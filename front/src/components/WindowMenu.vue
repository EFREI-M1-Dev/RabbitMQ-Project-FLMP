<script setup lang="ts"></script>

<template>
  <div class="menu">
    <div class="top">
      <div><img alt="" src="" /></div>
      <span>Username</span>
    </div>
    <div class="body">
      <ul>
        <li>
          <img />
          <div>
            <span>Internet</span>
            <span>Internet Explorer</span>
          </div>
        </li>
        <li>
          <img />
          <div>
            <span>E-mail</span>
            <span>Outlook Express</span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <img />
          <span>My Documents</span>
        </li>
        <li>
          <img />
          <span>My Recent Documents</span>
        </li>
        <li>
          <img />
          <span>My Pictures</span>
        </li>
        <li>
          <img />
          <span>My Music</span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div>Log Off</div>
      <div>Turn Off Computer</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 38px;
  border-radius: 8px 8px 0 0;
  border: 2px solid rgb(59, 114, 186);
  overflow: hidden;

  .top {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    background: rgb(67, 143, 234);
    background: linear-gradient(
      0deg,
      rgba(67, 143, 234, 1) 0%,
      rgba(11, 95, 206, 1) 100%
    );
    padding: 12px 8px;
    border-bottom: 1px solid #4c73a1;
    box-shadow: inset #3897ff 0 2px 2px 0;

    img {
      width: 30px;
      aspect-ratio: 1/1;
      border: 3px solid #f0f;
    }
  }

  .body {
    display: flex;

    > ul {
      width: 100%;
    }

    > ul:first-of-type {
      border-right: 1px solid #bbcad5;

      > li {
        padding: 10px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;

        img {
          width: 20px;
          aspect-ratio: 1/1;
        }

        > div {
          display: flex;
          flex-direction: column;

          > span:first-of-type {
            font-size: 14px;
          }

          > span:last-of-type {
            font-size: 13px;
          }
        }
      }
    }

    > ul:last-of-type {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      li {
        display: flex;
        align-items: center;
        gap: 4px;

        img {
          width: 20px;
          aspect-ratio: 1/1;
        }

        span {
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
