/** @format */

// composables/useAuth.ts
import { useCookie, useRuntimeConfig } from "#app";

export function useAuth() {
  // Use cookies to store authentication data
  const accessToken = useCookie("directus_access_token");
  const refreshToken = useCookie("directus_refresh_token");
  const expiresAt = useCookie("directus_expires_at");
  const userData = useCookie("directus_user");

  const config = useRuntimeConfig();
  const baseUrl = config.public.BASE_URL;

  /**
   * Login with email and password
   * @param email User's email
   * @param password User's password
   * @returns Result object with success status and data or error
   */
  const login = async (email, password) => {
    try {
      const response = await $fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: {
          email,
          password,
          // Use JSON mode for token handling
          mode: "json",
        },
      });

      if (response && response.data) {
        // Store token in cookies
        accessToken.value = response.data.access_token;
        refreshToken.value = response.data.refresh_token;

        // Calculate and store expiration time
        const expiresInMs = response.data.expires * 1000;
        expiresAt.value = String(Date.now() + expiresInMs);

        // Fetch user data (if not included in login response)
        await fetchUserData();

        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: "Authentication failed",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Authentication failed",
      };
    }
  };

  /**
   * Fetch the current user's data
   */
  const fetchUserData = async () => {
    if (!accessToken.value) return null;

    try {
      // Fetch user data from /users/me endpoint
      const user = await $fetch(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      if (user && user.data) {
        userData.value = user.data;
        return user.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    try {
      if (refreshToken.value) {
        // Call the logout endpoint to invalidate the refresh token
        await $fetch(`${baseUrl}/auth/logout`, {
          method: "POST",
          body: {
            refresh_token: refreshToken.value,
            mode: "json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear all auth cookies regardless of API response
      accessToken.value = null;
      refreshToken.value = null;
      expiresAt.value = null;
      userData.value = null;
    }
  };

  /**
   * Refresh the access token using the refresh token
   */
  const refreshAccessToken = async () => {
    if (!refreshToken.value) return false;

    try {
      const response = await $fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        body: {
          refresh_token: refreshToken.value,
          mode: "json",
        },
      });

      if (response && response.data) {
        // Update tokens
        accessToken.value = response.data.access_token;
        refreshToken.value = response.data.refresh_token;

        // Update expiration
        const expiresInMs = response.data.expires * 1000;
        expiresAt.value = String(Date.now() + expiresInMs);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  };

  /**
   * Check if the current token is expired and needs refresh
   */
  const isTokenExpired = () => {
    if (!expiresAt.value) return true;

    // Buffer of 10 seconds to prevent edge cases
    return Date.now() > parseInt(expiresAt.value) - 10000;
  };

  /**
   * Check if the user is authenticated with a valid token
   */
  const isAuthenticated = computed(() => {
    return !!accessToken.value && !isTokenExpired();
  });

  /**
   * Get the current user data
   */
  const getUser = () => userData.value;

  /**
   * Request a password reset email
   */
  const requestPasswordReset = async (email, resetUrl) => {
    try {
      const body = { email };
      if (resetUrl) {
        body.reset_url = resetUrl;
      }

      await $fetch(`${baseUrl}/auth/password/request`, {
        method: "POST",
        body,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Password reset request error:", error);
      return {
        success: false,
        error: error.message || "Failed to request password reset",
      };
    }
  };

  /**
   * Reset password using token from email
   */
  const resetPassword = async (token, password) => {
    try {
      await $fetch(`${baseUrl}/auth/password/reset`, {
        method: "POST",
        body: {
          token,
          password,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return {
        success: false,
        error: error.message || "Failed to reset password",
      };
    }
  };

  return {
    login,
    logout,
    refreshAccessToken,
    isTokenExpired,
    isAuthenticated,
    getUser,
    requestPasswordReset,
    resetPassword,
  };
}
