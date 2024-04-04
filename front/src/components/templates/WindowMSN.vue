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

const sendMessage = (e: any) => {
  e.preventDefault();

  if (message.value === '') return;

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

socket.on('user joined', (user) => {
  messageHistory.value.push({
    content: 'has joined the conversation.',
    sender: user,
  });
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
        <li><img src="/icons/msn-default.png" /><span>Invite</span></li>
        <li><img src="/icons/msn-default.png" /><span>Send Files</span></li>
        <li><img src="/icons/msn-default.png" /><span>Video</span></li>
        <li><img src="/icons/msn-default.png" /><span>Voice</span></li>
        <li><img src="/icons/msn-default.png" /><span>Activities</span></li>
        <li><img src="/icons/msn-default.png" /><span>Games</span></li>
      </ul>
    </div>
    <div class="content">
      <div class="discussion-container">
        <div class="discussion">
          <div class="receiver-container">
            To: <span>David</span> &lt;david@windows.net&gt;
          </div>
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
              <img src="/icons/serif.png" />
            </div>
            <div>
              <img src="/icons/regular_smile.png" />
              <span class="triangle"></span>
            </div>
          </div>
          <form class="field" @submit.prevent="sendMessage">
            <textarea
              required
              v-model="message"
              @keydown.enter="sendMessage"
            ></textarea>
            <button type="submit">Send</button>
          </form>
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
    border-radius: 5px;

    .menu {
      padding: 0 30px;
      display: flex;
      align-items: center;
      gap: 10px;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        color: #1b1b1b;
        font-size: 11px;

        img {
          width: 40px;
          aspect-ratio: 1 / 1;
        }
      }

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
    background: linear-gradient(170deg, #d7e3f8 0%, #f1f6ff 50%);

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
        overflow: hidden;

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
            color: gray;

            span {
              font-weight: bold;
              color: black;
            }
          }

          &.edit-text {
            display: flex;
            align-items: center;
            gap: 10px;

            > div {
              display: flex;
              align-items: center;
              gap: 1px;
              padding: 2px 0;

              img {
                height: 20px;
              }

              .triangle {
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;

                border-top: 6px solid #000;
                margin-left: 3px;
              }
            }
          }
        }

        .message-container {
          overflow: auto;
          height: 150px;
          display: flex;
          flex-direction: column;
          background-color: white;

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
          background-color: white;

          textarea {
            border: none;
            display: flex;
            width: 100%;
            height: 100%;
            resize: none;

            &:focus-visible {
              outline: none;
            }
          }

          button {
            height: 60%;
            width: 20%;
            cursor: pointer;
            border: 1px solid #8d9195;
            box-shadow: inset #a0b2d3 -2px 0 3px 0, inset #a0b2d3 0 -2px 3px 0,
              inset #ffffff 0 2px 3px 0;
            border-radius: 4px;
            margin: 5px;
            color: #7b848f;
            background-color: #fbfdfd;
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
