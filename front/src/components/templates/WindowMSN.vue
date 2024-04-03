<script setup lang="ts">
import socket from '@/socket.js';
import { ref, Ref } from 'vue';

interface Message {
  content: string;
  sender: string;
}

const message = ref('');
const messageHistory: Ref<Message[]> = ref([]);

const sendMessage = () => {
  const messageToSend = message.value;
  socket.emit('user joined', messageToSend);
  messageHistory.value.push({ content: messageToSend, sender: 'user' });
  message.value = '';
};

socket.on('new message', (message, user) => {
  messageHistory.value.push({ content: message, sender: user });
});
</script>

<template>
  <div class="window">
    <div class="header">
      <ul class="menu">
        <li><img src="" /><span>Invite</span></li>
        <li><img src="" /><span>Send Files</span></li>
        <li><img src="" /><span>Video</span></li>
        <li><img src="" /><span>Voice</span></li>
        <li><img src="" /><span>Activities</span></li>
        <li><img src="" /><span>Games</span></li>
      </ul>
    </div>
    <div class="content">
      <div class="discussion-container">
        <div class="discussion">
          <div>To: David</div>
          <div
            v-for="(message, index) in messageHistory"
            :key="index"
            :class="{
              'user-message': message.sender === 'user',
              'other-message': message.sender !== 'user',
            }"
          >
            <span>{{ message.sender }} {{ message.content }}</span>
          </div>
        </div>
        <div>Photo</div>
      </div>
      <div class="write-container">
        <div class="discussion">
          <div>test</div>
          <div class="field">
            <textarea v-model="message"></textarea>
            <button @click="sendMessage">Send</button>
          </div>
        </div>
        <div>Photo</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.window {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;

  .header {
    height: 70px;
    display: flex;
    background: rgb(245, 248, 253);
    background: linear-gradient(
      180deg,
      rgba(245, 248, 253, 1) 0%,
      rgba(184, 200, 232, 1) 50%,
      rgba(245, 248, 253, 1) 100%
    );
    box-sizing: border-box;
    box-shadow: inset #9d9d9d -2px 0 3px 0, inset #878787 0 -2px 3px 0,
      inset #c5c5c5 0 2px 3px 0;
    border-radius: 10px;

    .menu {
      padding: 0 30px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  > .content {
    box-sizing: border-box;
    padding: 20px 30px;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    > .discussion-container,
    .write-container {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 100px;

      > .discussion {
        border: 1px solid gray;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        position: relative;

        > div:first-of-type {
          background: linear-gradient(
            180deg,
            #dae3f3 0%,
            #edf3fb 50%,
            #dae3f3 100%
          );
          border-bottom: 1px solid gray;
          border-radius: 8px 8px 0 0;
          padding: 0 6px;
        }

        .field {
          display: flex;
          align-items: center;
          height: 100%;
          overflow: hidden;

          textarea {
            border: none;
            display: flex;
            width: 100%;
            height: 100%;
          }

          button {
            height: 60%;
            width: 25%;
            cursor: pointer;
          }
        }
      }

      > div:last-of-type {
        border: 1px solid gray;
        aspect-ratio: 1/1;
      }
    }
  }
}
</style>
