<template>
  <div class="container mt-5">
    <h1>Connexion</h1>
    <form @submit.prevent="loginUser">
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useRouter } from "vue-router";

const { $axios } = useNuxtApp(); // Utiliser l'instance Axios de Nuxt  
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const router = useRouter();

const loginUser = async () => {
  try {
    await $axios.post('/users/login', {
      email: email.value,
      password: password.value,
    });
    success.value = 'Enregistrement réussi. Vous pouvez maintenant vous connecter.';
    error.value = '';
    setTimeout(() => {
      router.push('/objects');
    }, 2000); // Redirection après un délai
  } catch (err) {
    error.value = 'Une erreur est survenue. Veuillez réessayer.';
    success.value = '';
  }
};
</script>