export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $axios } = useNuxtApp();
    const router = useRouter();

    try {
        await $axios.get('/validate/auth', { withCredentials: true }); // Valide l'authentification
    } catch (error) {
        if (!['/login', '/register', '/'].includes(to.path)) {
            //alert('Veuillez vous connecter pour accéder à cette page.');
            router.push('/login'); // Redirige vers la page d'accueil
        }
    }

    if (['/login', '/register'].includes(to.path)) {
        //return navigateTo('/objects'); // Redirection pour les authentifiés
        router.push('/objects'); // Redirige vers la liste des objets
        return;
    }
});
