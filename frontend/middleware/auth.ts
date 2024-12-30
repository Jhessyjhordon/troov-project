export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = document.cookie.includes('authToken');

    if (!isAuthenticated && !['/login', '/register', '/'].includes(to.path)) {
        return navigateTo('/'); // Redirige les non-authentifiés vers l'accueil
    }

    if (isAuthenticated && ['/login', '/register'].includes(to.path)) {
        return navigateTo('/objects'); // Redirige les authentifiés vers leur espace
    }
});
