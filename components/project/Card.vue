<!-- @format -->

<template>
  <div class="bg-white rounded-lg shadow-md project-card relative">
    <!-- Dropdown menu button -->
    <div class="absolute top-2 right-2 z-50" ref="menuRef">
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="cursor-pointer text-gray-600 hover:text-indigo-800 p-2 rounded-full"
        title="More Actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-8">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
      </button>

      <!-- Dropdown content -->
      <div
        v-if="isMenuOpen"
        class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
        <h1 class="font-semibold px-5 border-b border-neutral-100 py-3">
          Actions
        </h1>
        <ul class="py-1 text-sm text-gray-700">
          <li>
            <button
              @click="viewProject"
              class="cursor-pointer flex w-full text-left px-4 py-2 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <p class="my-auto px-2">View</p>
            </button>
          </li>
          <li>
            <button
              @click="editProject"
              class="cursor-pointer flex w-full text-left px-4 py-2 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              <p class="my-auto px-2">Edit</p>
            </button>
          </li>
          <li>
            <button
              @click="deleteProject"
              class="cursor-pointer flex w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <p class="my-auto px-2">Delete</p>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Project thumbnail -->
    <div
      class="h-40 bg-cover bg-center"
      :style="{ backgroundImage: `url(${project.thumbnail})` }">
      <div
        class="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
        <span
          class="px-3 py-1 bg-indigo-600 text-white text-xs uppercase rounded-full tracking-wider">
          {{ project.status }}
        </span>
      </div>
    </div>

    <!-- Project content -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ project.name }}
      </h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-2">
        {{ project.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex -space-x-2">
            <img
              v-for="member in project.team.slice(0, 3)"
              :key="member.id"
              class="h-6 w-6 rounded-full border border-white"
              :src="member.avatar"
              :alt="member.name" />
          </div>
          <span
            v-if="project.team.length > 3"
            class="ml-1 text-xs text-gray-500">
            +{{ project.team.length - 3 }}
          </span>
        </div>
        <div class="text-xs text-gray-500">Due {{ project.dueDate }}</div>
      </div>

      <div class="mt-4 pt-3 border-t border-gray-100">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="text-xs text-gray-500">Progress</div>
            <div class="text-xs font-semibold">{{ project.progress }}%</div>
          </div>
          <div class="text-xs text-gray-500">
            {{ project.tasksCompleted }}/{{ project.totalTasks }} tasks
          </div>
        </div>
        <div class="mt-2 w-full bg-gray-200 rounded-full h-1.5">
          <div
            class="bg-indigo-600 h-1.5 rounded-full"
            :style="{ width: project.progress + '%' }"></div>
        </div>
      </div>

      <div class="mt-4 flex justify-between card-actions">
        <button
          class="text-indigo-600 hover:text-indigo-800"
          title="View Project">
          <i class="fas fa-eye"></i>
        </button>
        <button class="text-gray-600 hover:text-gray-800" title="Edit Project">
          <i class="fas fa-edit"></i>
        </button>
        <button
          class="text-gray-600 hover:text-gray-800"
          title="Project Settings">
          <i class="fas fa-cog"></i>
        </button>
        <button class="text-red-600 hover:text-red-800" title="Delete Project">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const isMenuOpen = ref(false);
const menuRef = ref(null);

function handleClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const emit = defineEmits(["view", "edit", "delete"]);

function viewProject() {
  emit("view", props.project);
  isMenuOpen.value = false;
}

function editProject() {
  emit("edit", props.project);
  isMenuOpen.value = false;
}

function deleteProject() {
  emit("delete", props.project);
  isMenuOpen.value = false;
}
</script>
