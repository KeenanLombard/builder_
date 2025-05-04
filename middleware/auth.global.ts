/** @format */

// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Use the auth composable
  const { isAuthenticated, isTokenExpired, refreshAccessToken } = useAuth();

  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  // Check if the route is public
  const isPublicRoute =
    publicRoutes.includes(to.path) || to.path.startsWith("/auth/");

  // Try to refresh the token if it's expired
  if (isTokenExpired() && !isPublicRoute) {
    const refreshed = await refreshAccessToken();
    // If refresh failed, redirect to login
    if (!refreshed) {
      return navigateTo("/auth/login");
    }
  }

  // If not authenticated and trying to access a protected route
  if (!isAuthenticated.value && !isPublicRoute) {
    return navigateTo("/auth/login");
  }

  // If authenticated and trying to access login page
  if (isAuthenticated.value && to.path === "/auth/login") {
    return navigateTo("/");
  }
});
