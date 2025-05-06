<!-- @format -->

<template>
  <div>User</div>
</template>

<script setup>
const { getUser } = useAuth();

console.log(getUser());
</script>
