<!-- @format -->

<template>
  <a
    href="#"
    class="group flex items-center py-2 rounded-md"
    :class="[
      active
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
      expanded ? 'px-3' : 'justify-center px-2',
    ]">
    <i
      :class="[
        `fas fa-${icon}`,
        'text-lg group-hover:text-white',
        active ? 'text-white' : 'text-gray-400',
        expanded ? 'mr-3 w-5' : 'mx-auto',
      ]"></i>
    <span v-if="expanded" class="text-base font-medium">{{ label }}</span>
  </a>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
