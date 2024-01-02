<script setup>
const navigation = ref([
  { name: "Home", to: "/", current: true },
  { name: "Chat", to: "/chat", current: false },
  { name: "Twiter", to: "/twiter", current: false },
  { name: "Settings", to: "/settings", current: false },
]);
</script>
<template>
  <div>
    <h1 class="arroz">navbar</h1>
    <div>
      <NuxtLink :to="item.to" v-for="item in navigation">{{
        item.name
      }}</NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>
