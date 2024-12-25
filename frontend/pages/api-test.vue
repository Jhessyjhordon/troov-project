<template>
  <div>
    <h1>Test API</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api/test');
      this.message = response.data.message;
    } catch (error) {
      this.message = 'Erreur de connexion à l\'API';
    }
  },
};
</script>
