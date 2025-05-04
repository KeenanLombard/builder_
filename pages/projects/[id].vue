<!-- @format -->

<template>
  <div class="cnt">
    <!-- Project Header -->
    <div class="cnt-nav bg-white p-6 border-gray-200">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <!-- Heading -->
        <div>
          <h2 class="text-lg font-medium text-gray-900">
            Project Editor: {{ projectName }}
          </h2>
          <p class="text-sm text-gray-500 mt-1">
            Edit and customize your project design
          </p>
        </div>

        <!-- Controls -->
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            @click="goBack"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </button>

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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save & Publish
          </button>
        </div>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="cnt-body">
      <div
        v-if="isLoading"
        class="h-full flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <svg
            class="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Loading editor...</p>
        </div>
      </div>
      <div class="editor" ref="editorEl" :class="{ hidden: isLoading }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import createStudioEditor from "@grapesjs/studio-sdk";
import "@grapesjs/studio-sdk/dist/style.css";

// Get the project ID from route params
const route = useRoute();
const router = useRouter();
const projectId = route.params.id as string;
const projectName = ref("Loading...");
const editorEl = ref(null);
const editor = ref(null);
const isLoading = ref(true);

// Function to fetch project data
const fetchProject = async () => {
  try {
    console.log(`Fetching project with ID: ${projectId}`);
    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // You would normally fetch from API
    // Mock data for demonstration
    projectName.value = `Project ${projectId}`;
    return {
      name: projectName.value,
      content: `<h1 style="padding: 2rem; text-align: center">
          Project ${projectId} Content
        </h1>`,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

// Navigate back to projects list
const goBack = () => {
  router.push("/projects");
};

// Initialize editor with project content
const initEditor = async () => {
  isLoading.value = true;

  try {
    const project = await fetchProject();

    if (!project) {
      console.error("Could not load project");
      return;
    }

    editor.value = createStudioEditor({
      root: editorEl.value,
      plugins: [
        (editorInstance) => {
          console.log("Editor created!", editorInstance);
          // Store editor instance for later use
          editor.value = editorInstance;

          // The editor has its own built-in save and publish methods
          // You can access them via editorInstance if needed
          console.log(
            "Editor has built-in save method:",
            !!editorInstance.Commands.get("save")
          );
        },
      ],
      project: {
        default: {
          pages: [
            {
              name: project.name,
              component: project.content,
            },
          ],
        },
      },
      // Add any additional configurations here
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        ],
        width: "100%", // Ensure canvas uses full width
      },
      // Enable built-in save functionality if available
      storageManager: {
        autosave: true,
        autoload: true,
      },
      // Set editor to use full width
      width: "100%",
    });
  } catch (error) {
    console.error("Error initializing editor:", error);
  } finally {
    // Hide loading spinner after editor initializes
    isLoading.value = false;
  }
};

onMounted(async () => {
  await initEditor();
});

onBeforeUnmount(() => {
  // Clean up editor if needed
  if (editor.value) {
    console.log("Destroying editor instance");
    // editor.value.destroy(); // Uncomment if needed for cleanup
  }
});
</script>

<style>
body {
  margin: 0;
}
.cnt {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
}
.cnt-body {
  flex-grow: 1;
  position: relative;
  width: 100%;
}
.editor {
  height: 100%;
  width: 100%;
}
/* Loading container should take full width */
.h-full {
  width: 100%;
}
/* Fix for editor's toolbar positioning */
.gjs-toolbar {
  z-index: 11 !important;
}
/* Ensure GrapesJS components use full width */
.gjs-cv-canvas {
  width: 100% !important;
}
.gjs-frame-wrapper {
  width: 100% !important;
}
.gjs-frame {
  width: 100% !important;
}
</style>
