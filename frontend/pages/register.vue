<template>
  <div class="container mt-5">
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
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

const registerUser = async () => {
  try {
    const response = await axios.post('/api/users/register', {
      email: email.value,
      password: password.value
    });
    success.value = 'Registration successful!';
    error.value = '';
    email.value = '';
    password.value = '';
  } catch (err) {
    error.value = 'An error occurred during registration.';
    success.value = '';
  }
};
</script>
