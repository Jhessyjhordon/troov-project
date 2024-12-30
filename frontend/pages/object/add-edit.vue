<template>
    <div class="container mt-5">
        <h2>{{ isEditMode ? "Modifier un objet" : "Ajouter un nouvel objet" }}</h2>
        <form @submit.prevent="submitObject">
            <div class="mb-3">
                <label for="name" class="form-label">Nom de l'objet</label>
                <input type="text" id="name" class="form-control" v-model="object.name" required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" class="form-control" v-model="object.description" required></textarea>
            </div>
            <div class="d-flex justify-content-between">

                <button class="btn btn-secondary " @click="goBack">Retour</button>
                <button type="submit" class="btn btn-primary">
                    {{ isEditMode ? "Modifier" : "Ajouter" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth', // Le nom du middleware pour la gestion d'accès
});

import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNuxtApp } from "#app";

const router = useRouter();
const route = useRoute();
const { $axios } = useNuxtApp();

const object = ref({
    name: "",
    description: "",
});

const isEditMode = ref(false);

onMounted(async () => {
    // Vérifiez si un ID est présent dans les paramètres de la route
    const id = route.query.id;
    if (id) {
        isEditMode.value = true;
        try {
            // Récupérez les données de l'objet à modifier
            const { data } = await $axios.get(`/object/${id}`, { withCredentials: true });
            object.value = data; // Assignez les données à `object`
        } catch (error) {
            console.error("Erreur lors de la récupération de l'objet :", error.response?.data || error.message);
        }
    }
});

const submitObject = async () => {
    try {
        // Exclure l'attribut _id des données envoyées
        const { _id, userId, createdAt, updatedAt, __v, ...payload } = object.value;
        console.log(object.value);

        if (isEditMode.value) {
            // Modification de l'objet
            await $axios.put(`/object/${route.query.id}`, payload, { withCredentials: true });
        } else {
            // Ajout d'un nouvel objet
            await $axios.post("/object", object.value, { withCredentials: true });
        }
        router.push("/objects"); // Redirection après succès
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'objet :", error.response?.data || error.message);
    }
};

const goBack = () => {
    router.back(); // Retourne à la page précédente
};
</script>
