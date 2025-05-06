/** @format */

import { ref } from "vue";

// Create a simple toast notification system
export const useToast = () => {
  const toasts = ref([]);

  // Generate unique ID for each toast
  const generateId = () =>
    `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Add a toast notification
  const addToast = (message, type, duration = 5000) => {
    const id = generateId();
    const toast = {
      id,
      message,
      type,
      show: true,
    };

    toasts.value.push(toast);

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  // Remove a toast by ID
  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      // Mark as hiding first to trigger transition
      toasts.value[index].show = false;

      // Then remove after animation completes
      setTimeout(() => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
      }, 300);
    }
  };

  // Helper methods for different toast types
  const success = (message, duration) => addToast(message, "success", duration);
  const error = (message, duration) => addToast(message, "error", duration);
  const info = (message, duration) => addToast(message, "info", duration);
  const warning = (message, duration) => addToast(message, "warning", duration);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};

// Create a global instance for app-wide toast notifications
let globalToast;

// Ensure we only create one instance in client-side
if (process.client) {
  globalToast = useToast();
}

export default () => globalToast || useToast();
