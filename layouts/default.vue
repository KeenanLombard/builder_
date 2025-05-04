<!-- @format -->

<!-- Dashboard Layout -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 bg-gray-800 w-64 z-10 hidden md:block">
      <!-- Logo -->
      <div class="flex items-center justify-center h-16">
        <span class="ml-2 text-white font-bold text-xl">Project1</span>
      </div>

      <!-- Nav Links -->
      <nav class="mt-6">
        <div class="px-4 py-2">
          <p
            class="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
            Dashboard
          </p>
          <ul class="mt-3 space-y-1">
            <li>
              <NuxtLink
                to="/"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Overview
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Projects
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="px-4 py-2 mt-6">
          <p
            class="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
            Settings
          </p>
          <ul class="mt-3 space-y-1">
            <li>
              <NuxtLink
                to="/profile"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </NuxtLink>
            </li>

            <li>
              <button
                @click="handleLogout"
                class="w-full flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Mobile Menu Button -->
    <div class="md:hidden bg-gray-800 w-full flex items-center h-16 px-4">
      <button @click="toggleMobileMenu" class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div class="ml-4 flex items-center">
        <span class="ml-2 text-white font-bold text-xl">Project1</span>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenu"
      class="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
      @click="toggleMobileMenu"></div>
    <div
      v-if="mobileMenu"
      class="md:hidden fixed inset-y-0 left-0 bg-gray-800 w-64 z-30 transform transition-transform duration-300"
      :class="{
        'translate-x-0': mobileMenu,
        '-translate-x-full': !mobileMenu,
      }">
      <div
        class="flex items-center justify-between h-16 px-4 border-indigo-800">
        <div class="flex items-center">
          <span class="ml-2 text-white font-bold text-xl">Project1</span>
        </div>
        <button @click="toggleMobileMenu" class="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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
      <nav class="mt-6">
        <div class="px-4 py-2">
          <p
            class="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
            Dashboard
          </p>
          <ul class="mt-3 space-y-1">
            <li>
              <NuxtLink
                to="/"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Overview
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Projects
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/profile"
                class="flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg"
                active-class="bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </NuxtLink>
            </li>

            <li>
              <button
                @click="handleLogout"
                class="w-full flex items-center px-4 py-2 text-white hover:bg-indigo-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="md:ml-64 min-h-screen flex flex-col">
      <!-- Page Content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const { logout, getUser } = useAuth();
const route = useRoute();
const user = getUser();
const mobileMenu = ref(false);
const userMenu = ref(false);

console.log(user);

const closeUserMenuOutside = (event) => {
  if (this.userMenuRef && !this.userMenuRef.contains(event.target)) {
    this.userMenu = false;
  }
};
const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value;
};
const toggleUserMenu = () => {
  userMenu.value = !userMenu.value;
};

const currentPage = computed(() => {
  const path = route.path;
  if (path === "/") return "dashboard";
  if (path.startsWith("/projects")) return "projects";
  if (path.startsWith("/settings")) return "settings";
  return "";
});

const handleLogout = async () => {
  await logout();
  console.log("Logged out successfully");
  await navigateTo("/auth/login");
};
</script>

<style lang="scss" scoped></style>
