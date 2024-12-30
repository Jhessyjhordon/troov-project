<template>
    <div class="container mt-5">
        <h1>Liste des Objets</h1>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <ul class="list-group">
            <li v-for="object in objects" :key="object._id" class="list-group-item">
                {{ object.name }} - {{ object.description }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const { $axios } = useNuxtApp();
const objects = ref([]);
const error = ref('');

onMounted(async () => {
    try {
        const response = await $axios.get('/object');
        objects.value = response.data;
    } catch (err) {
        error.value = 'Erreur lors du chargement des objets';
    }
});
</script>