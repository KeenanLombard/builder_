<!-- @format -->

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'toast rounded-md p-4 shadow-lg max-w-md flex items-start',
          toast.show ? 'opacity-100' : 'opacity-0',
          toastTypeClasses[toast.type] || toastTypeClasses.info,
        ]">
        <!-- Icon based on type -->
        <div class="flex-shrink-0 mr-3">
          <svg
            v-if="toast.type === 'success'"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else-if="toast.type === 'error'"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg
            v-else-if="toast.type === 'warning'"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Toast message -->
        <div class="flex-1">
          <p class="text-sm">{{ toast.message }}</p>
        </div>

        <!-- Close button -->
        <button
          @click="removeToast(toast.id)"
          class="ml-3 flex-shrink-0 text-sm opacity-60 hover:opacity-100 focus:outline-none">
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useToast } from "../composables/useToast";

const { toasts, removeToast } = useToast();

// Define style classes for different toast types
const toastTypeClasses = {
  success: "bg-green-50 text-green-800 border border-green-100",
  error: "bg-red-50 text-red-800 border border-red-100",
  warning: "bg-yellow-50 text-yellow-800 border border-yellow-100",
  info: "bg-blue-50 text-blue-800 border border-blue-100",
};
</script>

<style scoped>
.toast {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
