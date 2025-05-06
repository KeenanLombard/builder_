<!-- @format -->

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Project Header -->
    <div class="bg-white p-6 border-b border-gray-200 shadow-sm">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <!-- Heading -->
        <div>
          <h2 class="text-lg font-medium text-gray-900">
            Project Editor: {{ project?.name || "Loading..." }}
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
            @click="saveProject"
            :disabled="isSaving"
            class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed">
            <svg
              v-if="!isSaving"
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
            <svg
              v-else
              class="animate-spin h-5 w-5 mr-2"
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
            {{ isSaving ? "Saving..." : "Save & Publish" }}
          </button>
        </div>
      </div>
    </div>

    <div class="cnt">
      <div class="cnt-body">
        <div class="editor" ref="editorEl"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, onBeforeUnmount } from "vue";
// import { useRouter, useRoute } from "vue-router";
// import { useToast } from "@/composables/useToast"; // Create this if you don't have it
import createStudioEditor from "@grapesjs/studio-sdk";
import "@grapesjs/studio-sdk/dist/style.css";

const { getProject } = useProjects();

// Get the project ID from route params
const route = useRoute();
const router = useRouter();
const projectId = route.params.id;
// const editorEl = ref(null);
// const editor = ref(null);
// const isLoading = ref(true);
// const isSaving = ref(false);
// const project = ref(null);
// const errorMessage = ref(null);
// const toast = useToast?.() || {
//   success: (msg) => console.log("Success:", msg),
//   error: (msg) => console.error("Error:", msg),
// };

// // Import your project composable
// import { useProjects } from "@/composables/useProjects";
// const { getProject, updateProject } = useProjects();

// // Navigate back to projects list
// const goBack = () => {
//   router.push("/projects");
// };

// Initialize editor with project content
// const initEditor = async () => {
//   if (!createStudioEditor || !project.value) {
//     console.error("Studio SDK not available or no project data");
//     errorMessage.value =
//       "Failed to initialize editor: Required dependencies not available";
//     isLoading.value = false;
//     return;
//   }

//   try {
//     // Format project data for Studio SDK
//     const projectData = project.value.project_code || {
//       pages: [
//         {
//           name: "Home",
//           component: `<div class="container mx-auto p-6">
//             <h1 class="text-2xl font-bold text-center">New Project Content</h1>
//             <p class="text-center mt-4">Start editing your project</p>
//           </div>`,
//         },
//       ],
//     };

//     // Initialize Studio SDK Editor
//     editorInstance.value = createStudioEditor({
//       root: editorEl.value,
//       plugins: [
//         customStoragePlugin,
//         // Add your other plugins here
//       ],
//       // Add your license key if you have one
//       // licenseKey: 'YOUR_LICENSE_KEY',

//       // Pass project data
//       projectData: projectData,

//       // Canvas configuration with support for custom frameworks
//       canvas: {
//         styles: [
//           "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
//         ],
//         width: "100%", // Ensure canvas uses full width
//       },

//       // Storage configuration - using SDK's built-in storage capabilities
//       storageManager: {
//         autosave: true,
//         autoload: false, // We loaded the data manually
//         stepsBeforeSave: 3,
//       },
//     });

//     console.log("Editor initialized successfully");
//   } catch (error) {
//     console.error("Error initializing editor:", error);
//     errorMessage.value = `Failed to initialize editor: ${
//       error.message || "Unknown error"
//     }`;
//   } finally {
//     isLoading.value = false;
//   }
// };

// Set up custom storage manager for the editor
// const setupCustomStorage = (editor) => {
//   // Add custom storage manager
//   editor.Storage.add("custom-remote", {
//     async load() {
//       // We've already loaded the data, so just return the current data
//       return editor.getProjectData();
//     },

//     async store(data) {
//       // We'll handle storage manually when the save button is clicked
//       return data;
//     },
//   });
// };

// Set up editor UI panels and commands
// const setupEditorUI = (editor) => {
//   // Add basic panels (can be expanded based on needs)
//   editor.Panels.addPanel({
//     id: "basic-actions",
//     el: ".panel__basic-actions",
//     buttons: [
//       {
//         id: "visibility",
//         active: true,
//         className: "btn-toggle-borders",
//         label: "<u>B</u>",
//         command: "sw-visibility",
//       },
//     ],
//   });

//   // Add commands for undo/redo if needed
//   editor.Commands.add("undo", {
//     run: (editor) => editor.UndoManager.undo(),
//     stop: () => {},
//   });

//   editor.Commands.add("redo", {
//     run: (editor) => editor.UndoManager.redo(),
//     stop: () => {},
//   });
// };

// Save project to backend
// const saveProject = async () => {
//   if (!editor.value || isSaving.value) return;

//   try {
//     isSaving.value = true;

//     // Get project data from editor
//     const projectData = editor.value.getProjectData();

//     // Get HTML and CSS for preview or saving
//     const mainComponent = editor.value.Pages.getSelected().getMainComponent();
//     const html = editor.value.getHtml({ component: mainComponent });
//     const css = editor.value.getCss({ component: mainComponent });

//     // Prepare data to save
//     const dataToSave = {
//       ...project.value,
//       project_code: projectData,
//       html_content: html,
//       css_content: css,
//       updated_at: new Date().toISOString(),
//     };

//     // Save to backend using your composable
//     const result = await updateProject(projectId, dataToSave);

//     if (result.success) {
//       toast.success("Project saved successfully");
//       // Reset dirty count after successful save
//       editor.value.clearDirtyCount();
//     } else {
//       throw new Error(result.error || "Failed to save project");
//     }
//   } catch (error) {
//     console.error("Error saving project:", error);
//     toast.error(`Failed to save: ${error.message || "Unknown error"}`);
//   } finally {
//     isSaving.value = false;
//   }
// };

// Add beforeunload event to warn about unsaved changes
// const setupBeforeUnloadWarning = () => {
//   if (process.client) {
//     window.addEventListener("beforeunload", handleBeforeUnload);
//   }
// };

// const handleBeforeUnload = (e) => {
//   if (editor.value && editor.value.getDirtyCount() > 0) {
//     // Standard way of showing a confirmation dialog before leaving
//     e.preventDefault();
//     e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
//     return e.returnValue;
//   }
// };

const editorEl = ref(null);

onMounted(async () => {
  const response = await getProject(projectId);

  createStudioEditor({
    root: editorEl.value,
    plugins: [(editor) => console.log("editor created!", editor)],
    storageManager: {
      type: "local",
      options: {
        local: { key: `gjsProject-${projectId}` },
      },
    },
    project: response.data.project_code,
  });
});

// Load project data and initialize editor
// onMounted(async () => {
//   if (!process.client) return;

//   try {
//     isLoading.value = true;

//     // Fetch project data
//     const response = await getProject(projectId);

//     if (response.success) {
//       project.value = response.data;
//       console.log("Project data loaded:", project.value);
//       await initEditor();
//       setupBeforeUnloadWarning();
//     } else {
//       errorMessage.value = response.error || "Failed to fetch project";
//     }
//   } catch (error) {
//     console.error("Error loading project:", error);
//     errorMessage.value = `Error loading project: ${
//       error.message || "Unknown error"
//     }`;
//   } finally {
//     isLoading.value = false;
//   }
// });

// Clean up event listeners
// onBeforeUnmount(() => {
//   if (process.client) {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   }

//   // Clean up editor instance
//   if (editor.value) {
//     editor.value.destroy();
//   }
// });
</script>

<style>
/* Custom styles for editor */
.editor {
  height: calc(100vh - 90px); /* Adjust based on your header height */
}

/* Override some GrapesJS styles */
.gjs-cv-canvas {
  width: 100%;
  height: 100%;
}

/* Fix for editor draggable elements */
.gjs-dashed *[data-gjs-type] {
  outline: 1px dashed #3b82f6;
}
</style>
