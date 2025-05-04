<!-- @format -->

<template>
  <div>
    <ProjectHeader />
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto px-6 pb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Add New Project Card -->
          <div
            @click="openNewProjectModal"
            class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 hover:border-indigo-500 hover:bg-gray-100 transition duration-300 cursor-pointer h-full">
            <div class="rounded-full bg-indigo-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                class="size-8">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p class="mt-2 text-sm font-medium text-gray-900">
              Create New Project
            </p>
            <p class="text-xs text-gray-500 text-center mt-1">
              Click to add a new project to your portfolio
            </p>
          </div>

          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            @view="viewProject"
            @edit="editProject"
            @delete="confirmDeleteProject" />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md relative">
        <h2 class="text-xl font-semibold mb-4">Create new project</h2>
        <ProjectNewProjectForm />
        <button
          @click="showModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="fixed top-0 right-0 p-6 z-50">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="mb-3 p-4 rounded-md shadow-lg max-w-md transform transition-all duration-300 ease-in-out"
          :class="{
            'bg-green-50 border-l-4 border-green-500': toast.type === 'success',
            'bg-red-50 border-l-4 border-red-500': toast.type === 'error',
            'bg-blue-50 border-l-4 border-blue-500': toast.type === 'info',
          }">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i
                class="fas mr-2"
                :class="{
                  'fa-check-circle text-green-500': toast.type === 'success',
                  'fa-exclamation-circle text-red-500': toast.type === 'error',
                  'fa-info-circle text-blue-500': toast.type === 'info',
                }"></i>
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium"
                :class="{
                  'text-green-800': toast.type === 'success',
                  'text-red-800': toast.type === 'error',
                  'text-blue-800': toast.type === 'info',
                }">
                {{ toast.message }}
              </p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  @click="removeToast(toast.id)"
                  class="inline-flex rounded-md p-1.5"
                  :class="{
                    'text-green-500 hover:bg-green-100':
                      toast.type === 'success',
                    'text-red-500 hover:bg-red-100': toast.type === 'error',
                    'text-blue-500 hover:bg-blue-100': toast.type === 'info',
                  }">
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
                      d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
// Projects data
const { getProjects } = useProjects();

console.log(await getProjects());

const showModal = ref(false);
const toasts = ref([]);
let nextToastId = 1;

const projects = ref([]);

const openNewProjectModal = () => {
  showModal.value = true;
};

function viewProject(project) {
  console.log("View:", project);
  const router = useRouter();
  navigateTo(`/projects/1`);
}

function editProject(project) {
  showToast("Something went wrong editing project", "error");
  console.log("Edit:", project);
}

function confirmDeleteProject(project) {
  showToast("Project Deleted Succesfully", "success");
  console.log("Delete:", project);
}

// Toast notification functions
function showToast(message, type = "info", duration = 5000) {
  const id = nextToastId++;
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    removeToast(id);
  }, duration);
}

function removeToast(id) {
  const index = toasts.value.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
}
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
