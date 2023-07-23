<script setup lang="ts">
import { ref, computed } from "vue"
import { useUsers } from "../stores/users";
import SignUp from "../components/SignUp.vue"
import SignIn from "../components/SignIn.vue";

const useStore = useUsers();
const signUpActive = ref<boolean>(true);


const signInStyle = computed(() => {
  if (!signUpActive.value) {
    return {
      backgroundColor: "var(--light-blue)",
      color: "#fff"
    }
  }
})

const signUpStyle = computed(() => {
  if (signUpActive.value) {
    return {
      backgroundColor: "var(--light-blue)",
      color: "#fff"
    }
  }
})

</script>
<template>
  <div class="home center">
    <div class="home-info center">
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium officiis ipsa quia !</h3>
    </div>
    <div class="home-info center" v-if="!useStore.currentUserId">
      <div class="sign-form">
        <div class="sign-form__control">
          <button @click="signUpActive = true" :style="signUpStyle">Sign Up</button>
          <button @click="signUpActive = false" :style="signInStyle">Sign In</button>
        </div>
        <div class="sign-form_content">
          <Transition>
            <SignUp v-if="signUpActive" class="sign-up" />
          </Transition>
          <Transition>
            <SignIn v-if="!signUpActive" class="sign-in" />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.home {
  min-height: 100vh;
  min-width: 100vw;
}

.dark .home {
  background-color: #2b2c37;
}

.home-info {
  padding: 0px 20px;
  flex: 1;
  flex-direction: column;
  text-align: left;
}

.home-info:first-child {
  min-height: inherit;
  background-color: var(--light-blue);
  color: #ffff;
}

.dark .home-info:first-child {
  background-color: #20212c;
}

.sign-form {
  position: relative;
  min-width: 250px;
  min-height: 250px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  overflow: hidden;
}

.sign-form__control {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid var(--very-light-blue);
}

.sign-form__control button {
  width: 50%;
  border-radius: 0;
}

.sign-form__control button:hover {
  transform: none;
}

.sign-form_content {
  padding: 20px;
}

.sign-up,
.sign-in {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}</style>