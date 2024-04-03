<script setup lang="ts">
import socket from '@/socket.js';
import { onBeforeMount, ref, Ref, watch } from 'vue';

interface Message {
  content: string;
  sender: string;
}

const message = ref('');
const messageHistory: Ref<Message[]> = ref([]);
const messageContainer = ref<HTMLElement | null>(null);

const sendMessage = () => {
  const messageToSend = message.value;
  socket.emit('new message', messageToSend);
  /*
    messageHistory.value.push({ content: messageToSend, sender: 'user' });
  */
  message.value = '';
};

socket.on('new message', (message, user) => {
  messageHistory.value.push({ content: message, sender: user });
});

onBeforeMount(() => {
  socket.emit('user joined', 'user' + Math.floor(Math.random() * 1000));
});

function scrollToBottom() {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight + 20;
  }
}

watch(messageHistory.value, () => {
  setTimeout(() => {
    scrollToBottom();
  }, 100);
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
          <div class="receiver-container">To: David</div>
          <div class="message-container" ref="messageContainer">
            <div class="caution">
              <p>
                Never give out your password or credit card number in an instant
                message conversation.
              </p>
            </div>
            <span class="separator">--------------</span>
            <div
              class="message"
              v-for="(message, index) in messageHistory"
              :key="index"
            >
              <span class="author"> {{ message.sender }} says: </span>
              <span class="msg-content">{{ message.content }}</span>
            </div>
          </div>
        </div>
        <div class="photo">
          <img src="/img/coincoin.png" alt="" />
        </div>
      </div>
      <div class="write-container">
        <div class="discussion">
          <div class="edit-text">
            <div>
              <img />
              <span>Font</span>
            </div>
            <div>
              <img />
              <span class="triangle"></span>
            </div>
          </div>
          <div class="field">
            <textarea v-model="message"></textarea>
            <button @click="sendMessage">Send</button>
          </div>
        </div>
        <div class="photo">
          <img src="/img/ouafouaf.png" alt="" />
        </div>
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

      span {
        display: inline-block;
      }
      span::first-letter {
        text-decoration: underline;
      }
    }
  }

  > .content {
    box-sizing: border-box;
    padding: 10px;
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

          &.receiver-container {
            padding: 4px 6px;
          }

          &.edit-text {
            display: flex;
            align-items: center;

            > div {
              display: flex;
              align-items: center;
              gap: 4px;

              .triangle {
                width: 0;
                height: 0;
                border-left: 2px solid transparent;
                border-right: 2px solid transparent;

                border-top: 4px solid #000;
              }
            }
          }
        }

        .message-container {
          overflow: auto;
          height: 150px;
          display: flex;
          flex-direction: column;

          .caution {
            padding: 4px;
            color: #585858;
          }

          .separator {
            padding: 2px 0 4px 4px;
          }

          .message {
            padding: 0 4px 4px 4px;

            display: flex;
            flex-direction: column;
            gap: 2px;

            .author {
              color: #585858;
            }

            .msg-content {
              padding-left: 20px;
            }
          }
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

      > .photo {
        img {
          width: 100%;
        }
      }

      > div:last-of-type {
        border: 1px solid gray;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 1/1;
      }
    }
  }
}
</style>
