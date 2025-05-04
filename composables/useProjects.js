/** @format */
// composables/useProjects.js
import { useCookie, useRuntimeConfig } from "#app";
import { ref } from "vue";

export function useProjects() {
  // Get authentication data from cookies
  const accessToken = useCookie("directus_access_token");

  // Get API configuration
  const config = useRuntimeConfig();
  const baseUrl = config.public.BASE_URL;

  // Create refs for projects data
  const projects = ref([]);
  const currentProject = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Collection name for projects
  const COLLECTION = "projects";

  /**
   * Get all projects with optional filtering and sorting
   * @param {Object} params - Optional query parameters
   * @param {Object} params.filter - Filter conditions
   * @param {Array} params.sort - Sorting fields
   * @param {Number} params.limit - Number of items to return
   * @param {Number} params.offset - Number of items to skip
   * @param {Array} params.fields - Fields to return
   * @param {String} params.search - Search query
   * @param {String} params.meta - What metadata to return
   * @returns {Promise} Result object with success status and data or error
   */
  const getProjects = async (params = {}) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      if (params.fields && params.fields.length > 0) {
        queryParams.append("fields", params.fields.join(","));
      }

      if (params.filter) {
        queryParams.append("filter", JSON.stringify(params.filter));
      }

      if (params.sort && params.sort.length > 0) {
        queryParams.append("sort", params.sort.join(","));
      }

      if (params.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      if (params.offset) {
        queryParams.append("offset", params.offset.toString());
      }

      if (params.search) {
        queryParams.append("search", params.search);
      }

      if (params.meta) {
        queryParams.append("meta", params.meta);
      }

      const query = queryParams.toString() ? `?${queryParams.toString()}` : "";

      const response = await $fetch(`${baseUrl}/items/project_data${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.data) {
        projects.value = response.data;
        return {
          success: true,
          data: response,
        };
      }

      return {
        success: false,
        error: "Failed to fetch projects",
      };
    } catch (err) {
      console.error("Error fetching projects:", err);
      error.value = err.message || "Failed to fetch projects";
      return {
        success: false,
        error: err.message || "Failed to fetch projects",
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get a single project by ID
   * @param {String|Number} id - Project ID
   * @param {Array} fields - Optional fields to return
   * @returns {Promise} Result object with success status and data or error
   */
  const getProject = async (id, fields = []) => {
    isLoading.value = true;
    error.value = null;
    currentProject.value = null;

    try {
      let query = "";
      if (fields && fields.length > 0) {
        query = `?fields=${fields.join(",")}`;
      }

      const response = await $fetch(
        `${baseUrl}/items/${COLLECTION}/${id}${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.data) {
        currentProject.value = response.data;
        return {
          success: true,
          data: response,
        };
      }

      return {
        success: false,
        error: "Project not found",
      };
    } catch (err) {
      console.error(`Error fetching project ${id}:`, err);
      error.value = err.message || "Failed to fetch project";
      return {
        success: false,
        error: err.message || "Failed to fetch project",
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Create a new project
   * @param {Object} projectData - Project data to create
   * @returns {Promise} Result object with success status and data or error
   */
  const createProject = async (projectData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`${baseUrl}/items/${COLLECTION}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: projectData,
      });

      if (response && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: "Failed to create project",
      };
    } catch (err) {
      console.error("Error creating project:", err);
      error.value = err.message || "Failed to create project";
      return {
        success: false,
        error: err.message || "Failed to create project",
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update an existing project
   * @param {String|Number} id - Project ID
   * @param {Object} projectData - Updated project data
   * @returns {Promise} Result object with success status and data or error
   */
  const updateProject = async (id, projectData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`${baseUrl}/items/${COLLECTION}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: projectData,
      });

      if (response && response.data) {
        // If the current project is being updated, refresh it
        if (currentProject.value && currentProject.value.id === id) {
          currentProject.value = response.data;
        }

        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        error: "Failed to update project",
      };
    } catch (err) {
      console.error(`Error updating project ${id}:`, err);
      error.value = err.message || "Failed to update project";
      return {
        success: false,
        error: err.message || "Failed to update project",
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete a project by ID
   * @param {String|Number} id - Project ID
   * @returns {Promise} Result object with success status and data or error
   */
  const deleteProject = async (id) => {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch(`${baseUrl}/items/${COLLECTION}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
      });

      // If the current project is being deleted, clear it
      if (currentProject.value && currentProject.value.id === id) {
        currentProject.value = null;
      }

      // Remove from projects array if it exists
      const index = projects.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        projects.value.splice(index, 1);
      }

      return {
        success: true,
      };
    } catch (err) {
      console.error(`Error deleting project ${id}:`, err);
      error.value = err.message || "Failed to delete project";
      return {
        success: false,
        error: err.message || "Failed to delete project",
      };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete multiple projects
   * @param {Array} ids - Array of project IDs to delete
   * @returns {Promise} Result object with success status and data or error
   */
  const deleteMultipleProjects = async (ids) => {
    isLoading.value = true;
    error.value = null;

    try {
      await $fetch(`${baseUrl}/items/${COLLECTION}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
          "Content-Type": "application/json",
        },
        body: ids,
      });

      // Filter out deleted projects from the projects array
      projects.value = projects.value.filter((p) => !ids.includes(p.id));

      // Clear current project if it was deleted
      if (currentProject.value && ids.includes(currentProject.value.id)) {
        currentProject.value = null;
      }

      return {
        success: true,
      };
    } catch (err) {
      console.error("Error deleting multiple projects:", err);
      error.value = err.message || "Failed to delete projects";
      return {
        success: false,
        error: err.message || "Failed to delete projects",
      };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    projects,
    currentProject,
    isLoading,
    error,

    // Methods
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    deleteMultipleProjects,
  };
}
