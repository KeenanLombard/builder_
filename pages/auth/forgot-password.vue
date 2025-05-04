<!-- @format -->

<!-- pages/auth/forgot-password.vue -->
<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div
          class="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Forgot your password?
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your
        password
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          v-if="!requestSent"
          class="space-y-6"
          @submit.prevent="handleForgotPassword">
          <!-- Alert for errors -->
          <div v-if="forgotPasswordError" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ forgotPasswordError }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? "Sending..." : "Send reset link" }}
            </button>
          </div>

          <div class="text-sm text-center">
            <NuxtLink
              to="/auth/login"
              class="font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </NuxtLink>
          </div>
        </form>

        <!-- Success message -->
        <div v-else class="text-center">
          <div
            class="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">
            Check your email
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            We've sent a password reset link to {{ email }}
          </p>
          <div class="mt-6">
            <button
              @click="resetForm"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Send another email
            </button>
          </div>
          <div class="mt-4 text-sm text-center">
            <NuxtLink
              to="/auth/login"
              class="font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const { requestPasswordReset } = useAuth();

definePageMeta({
  layout: "auth",
});

const email = ref("");
const forgotPasswordError = ref("");
const isLoading = ref(false);
const requestSent = ref(false);

const handleForgotPassword = async () => {
  // Reset error message
  forgotPasswordError.value = "";

  // Validate form
  if (!email.value) {
    forgotPasswordError.value = "Please enter your email address";
    return;
  }

  try {
    isLoading.value = true;

    // Generate reset URL for the frontend
    const resetUrl = `${window.location.origin}/auth/reset-password`;

    const result = await requestPasswordReset(email.value, resetUrl);

    if (result.success) {
      requestSent.value = true;
    } else {
      forgotPasswordError.value =
        result.error || "Failed to send reset link. Please try again.";
    }
  } catch (error) {
    console.error("Password reset request error:", error);
    forgotPasswordError.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  requestSent.value = false;
};
</script>
