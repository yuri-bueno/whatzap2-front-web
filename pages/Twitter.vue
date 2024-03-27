<script setup lang="ts">
definePageMeta({ layout: "navbar" });

const text = ref("");

const inputDiv = ref<HTMLElement>();
const user = ref({
  name: "yuri",
  imageUrl:
    "https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500-300x300.jpg",
});

function handlePost() {
  posts.value.push({
    name: "yuri",
    imageUrl:
      "https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500-300x300.jpg",
    content: text.value,
  });

  if (inputDiv.value) inputDiv.value.innerHTML = "";
}

const posts = ref([
  {
    name: "yuri",
    imageUrl:
      "https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500-300x300.jpg",
    content: " bom dia mundo",
  },
]);

function inputHandle(event: Event) {
  text.value = (event.target as HTMLElement).innerText;
}
</script>

<style scoped lang="scss"></style>
<template>
  <div class="max-w-2xl bg-slate-900 mx-auto border border-gray-700">
    <div class="flex flex-col gap-2 pt-8 p-4 border-b border-gray-700">
      <div class="flex gap-4">
        <NuxtImg class="size-16 rounded-full" :src="user.imageUrl" />
        <div
          class="rounded-md border-2 border-gray-700 w-full text-wrap text-lg p-2 py-4"
          ref="inputDiv"
          @input="inputHandle"
          contenteditable="true"
        >
          arrozdoce
        </div>
      </div>
      <div class="flex w-full justify-end">
        <button
          class="bg-cyan-500 hover:opacity-85 active:opacity-75 transition-all px-6 p-2 rounded-md"
          type="button"
          @click="handlePost"
        >
          Postar
        </button>
      </div>
    </div>

    <div v-for="post in posts" class="flex p-4">
      <div class="flex">
        <NuxtImg class="size-10 rounded-full mt-1" :src="post.imageUrl" />
        <div class="flex flex-col px-2">
          <span class="text-sm font-bold">{{ post.name }}</span>
          <span class="text-sm">{{ post.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
