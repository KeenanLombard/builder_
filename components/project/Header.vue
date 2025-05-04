<!-- @format -->

<template>
  <!-- Project Banner -->
  <div class="p-6 border-gray-200">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <!-- Heading -->
      <div>
        <h2 class="text-lg font-medium text-gray-900">Your Projects</h2>
        <p class="text-sm text-gray-500 mt-1">
          Manage and organize all your active projects
        </p>
      </div>

      <!-- Controls -->
      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <!-- Filter Button -->
        <div class="relative inline-block text-left">
          <button
            @click="toggleFilterMenu"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Filter
          </button>
        </div>

        <!-- View Button -->
        <button
          class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          Board View
        </button>

        <!-- Search Bar -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search projects..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
