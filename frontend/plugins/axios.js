import axios from 'axios';

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api', // URL de base du backend
    withCredentials: true, // Permet d'envoyer les cookies avec les requêtes
  });

  // Retourne l'instance Axios pour qu'elle soit accessible globalement
  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
