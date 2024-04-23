<script setup lang="ts">

import {Ref, ref} from "vue";
import axios from "axios";

const usernameInput: Ref<string> = ref('');
const passwordInput: Ref<string> = ref('');
const msgError: Ref<string> = ref('');

const emit = defineEmits(['login']);
async function handleSubmit() {
  if (!usernameInput.value || !passwordInput.value) {
    msgError.value = "Veuillez remplir tous les champs";
    return;
  }
  try{
    const response = await axios.post('http://localhost:3000/login', {
      username: usernameInput.value,
      password: passwordInput.value
    });
    if (response.status === 200) {
      localStorage.setItem('user', usernameInput.value)
      emit('login')
    }
  } catch (error) {
    msgError.value = "- Nom d'utilisateur ou mot de passe incorrect <br>OU <br>-Veuillez vous inscrire !";
  }
}

async function registerUser(){
  if (!usernameInput.value || !passwordInput.value) {
    msgError.value = "Veuillez remplir tous les champs";
    return;
  }

  try{
    const response = await axios.post('http://localhost:3000/register', {
      username: usernameInput.value,
      password: passwordInput.value
    });
    if (response.status === 201) {
      localStorage.setItem('user', usernameInput.value)
      emit('login')
    } else if (response.status === 204){
      msgError.value = "- Nom d'utilisateur déjà utilisé";
    }
  } catch (error) {
    msgError.value = "Erreur de connexion réseau!";
  }

}
</script>

<template>
  <div class="container-page">
    <div class="window">
      <div class="head">
        <span>Log On to Windows</span>
      </div>
      <form class="content-border" method="post">
        <div class="content">
          <div class="header">
            <img src="/icons/windows_xp_pro.svg" />
            <div>
              <span>Copyright © 1985-2001</span>
              <span>Microsoft Corporation</span>
            </div>
            <img src="/icons/microsoft.png" />
          </div>
          <div class="form">
            <label for="username">User name:</label>
            <input name="username" type="text" v-model="usernameInput" placeholder="guest"/>
            <label for="password">Password:</label>
            <input name="password" type="password" v-model="passwordInput" placeholder="guest"/>
            <p v-if="msgError">
              <span class="error-message" v-html="msgError"></span>
            </p>
          </div>
          <div>
            <button type="submit" @click.prevent="handleSubmit">Login</button>
            <button @click.prevent="registerUser">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-message{
  color: red;
}
.container-page {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #004e98;

  .window {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 570px;

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
      user-select: none;

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
        background-color: #edeade;

        .header {
          position: relative;
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(115, 149, 238);
          background: linear-gradient(
            90deg,
            #6185e6 0%,
            rgba(184, 200, 232, 1) 65%,
            #6185e6 100%
          );

          &::before {
            content: '';
            height: 5px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background: rgb(115, 149, 238);
            background: linear-gradient(
              90deg,
              rgba(115, 149, 238, 1) 0%,
              rgba(246, 149, 56, 1) 50%,
              rgba(105, 141, 230, 1) 100%
            );
          }

          > div {
            position: absolute;
            bottom: 8px;
            left: 5px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            color: white;
            font-size: 12px;
            font-family: Arial, Helvetica, sans-serif;
          }

          img:first-of-type {
            width: 50%;
          }

          img:last-of-type {
            width: 13%;
            position: absolute;
            bottom: 6px;
            right: 5px;
          }
        }

        .form {
          display: grid;
          grid-template-columns: 80px 1fr;
          padding: 20px 100px 20px 10px;
          gap: 10px;
          font-family: Arial, Helvetica, sans-serif;
          text-wrap: nowrap;
          font-size: 14px;
          align-items: center;

          label {
            &::first-letter {
              text-decoration: underline;
            }
          }
        }

        > div:last-of-type {
          padding: 0 10px;
          display: flex;
          justify-content: end;
          gap: 5px;
          padding-bottom: 15px;

          button {
            width: 100px;
            cursor: pointer;

            &:last-of-type {
              &::first-letter {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
