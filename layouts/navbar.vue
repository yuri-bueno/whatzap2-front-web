<script setup>
const navigation = ref([
  { name: "Home", to: "/", current: true },
  { name: "Chat", to: "/chat", current: false },
  { name: "Twitter", to: "/twitter", current: false },
  { name: "Settings", to: "/settings", current: false },
]);
</script>
<template>
  <div>
    <div class="flex items-center bg-slate-700 h-14">
      <div class="flex items-center max-w-7xl">
        <h1 class="arroz">navbar2</h1>
        <div class="flex gap-4">
          <NuxtLink
            :to="item.to"
            v-for="item in navigation"
            class="bg-slate-800 hover:opacity-80 p-1 px-4 rounded-md"
            >{{ item.name }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
