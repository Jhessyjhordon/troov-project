<template>
  <div>
    <!-- Barre de Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Mon Application</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Accueil</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link" href="/login">Connexion</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link" href="/register">Inscription</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button class="btn btn-danger btn-sm ms-2" @click="logout">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <div class="container">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';

const { $axios } = useNuxtApp();
const router = useRouter();

const isLoggedIn = ref(false);

const validateAuth = async () => {
  try {
    // Appel à l'API pour valider l'authentification
    await $axios.get('/validate/auth', { withCredentials: true });
    isLoggedIn.value = true; // Si l'authentification est validée
  } catch (error) {
    isLoggedIn.value = false; // Si non authentifié
  }
};

onMounted(async () => {
  await validateAuth();
});

const logout = async () => {
  try {
    await $axios.post('/users/logout', {}, { withCredentials: true });
    isLoggedIn.value = false; // Met à jour l'état
    router.push('/'); // Redirige vers la page d'accueil
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
  font-family: "Arial", sans-serif;
}
.navbar-brand {
  font-weight: bold;
}
</style>
