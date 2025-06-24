<template>
  <div class="container mt-5">
    <h1>Inscription</h1>
    <form @submit.prevent="registerUser">
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';

const { $axios } = useNuxtApp(); // Utiliser l'instance Axios de Nuxt
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

const registerUser = async () => {
  try {
    await $axios.post('/users/register', {
      email: email.value,
      password: password.value,
    });
    success.value = 'Inscription réussie ! Vous allez être redirigé vers la page de login.';
    error.value = '';
    email.value = '';
    password.value = '';
    // Rediriger vers la page Login
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  } catch (err) {
    error.value = 'Erreur lors de l\'inscription';
    success.value = '';
  }
};
</script>
