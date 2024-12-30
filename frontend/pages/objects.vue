<template>
    <div class="container mt-5">
        <h1>Liste des Objets</h1>
        <div class="mb-3">
            <!-- Bouton pour ajouter un objet -->
            <button class="btn btn-success" @click="addObject">
                Ajouter un nouvel objet
            </button>
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <ul class="list-group">
            <li
                v-for="object in objects"
                :key="object._id"
                class="list-group-item d-flex justify-content-between align-items-center"
            >
                <span>
                    {{ object.name }} - {{ object.description }}
                </span>
                <div>
                    <button
                        class="btn btn-sm btn-warning me-2"
                        @click="editObject(object._id)"
                    >
                        Modifier
                    </button>
                    <button
                        class="btn btn-sm btn-danger"
                        @click="deleteObject(object._id)"
                    >
                        Supprimer
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";

const { $axios } = useNuxtApp();
const router = useRouter();
const objects = ref([]);
const error = ref("");

onMounted(async () => {
    try {
        const response = await $axios.get("/object", { withCredentials: true });
        objects.value = response.data;
    } catch (err) {
        error.value = "Erreur lors du chargement des objets.";
    }
});

const addObject = () => {
    router.push("/object/add-edit");
};

const editObject = (id) => {
    router.push(`/object/add-edit?id=${id}`);
};

const deleteObject = async (id) => {
    try {
        await $axios.delete(`/object/${id}`, { withCredentials: true });
        objects.value = objects.value.filter((obj) => obj._id !== id);
    } catch (err) {
        error.value = "Erreur lors de la suppression de l'objet.";
    }
};
</script>
