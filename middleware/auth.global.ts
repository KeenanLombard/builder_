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
    console.log("Token expired, attempting to refresh...");
    const refreshed = await refreshAccessToken();
    console.log("Token refresh result:", refreshed);
    
    // If refresh failed, redirect to login
    if (!refreshed) {
      console.log("Token refresh failed, redirecting to login");
      return navigateTo("/auth/login");
    }
  }

  // If not authenticated and trying to access a protected route
  // This needs to check isAuthenticated.value AFTER potential refresh
  if (!isAuthenticated.value && !isPublicRoute) {
    console.log("Not authenticated, redirecting to login");
    return navigateTo("/auth/login");
  }

  // If authenticated and trying to access login page
  if (isAuthenticated.value && to.path === "/auth/login") {
    console.log("Already authenticated, redirecting to home");
    return navigateTo("/");
  }
});