<script setup>
const store = useStoreSession();
const storeRef = storeToRefs(store);
const props = defineProps({
  chat_id: {
    type: String,
    default: "",
  },

  message_id: {
    type: String,
    default: "",
  },
  user_id: {
    type: String,
    default: "",
  },
  user_name: {
    type: String,
    default: "User not found",
  },
  avatar: {
    type: String,
  },
  message_type: {
    type: String,
    default: "message",
  },

  content: {
    type: String,
    default: "",
  },
  attachments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: String,
    default: "0",
  },
  assessed: {
    type: Boolean,
  },
});

const dataAttachments = ref([]);

async function getAttachments() {
  if (!props.attachments.length) return;

  const awaitPromise = [];

  for (const attachment of props.attachments) {
    awaitPromise.push(
      useApi("/account/tickets/attachment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storeRef.token.value}`,
        },
        params: {
          id: attachment.id,
          ticket: props.chat_id,
        },
      }).then((res) => res._data)
    );
  }

  const files = await Promise.all(awaitPromise);

  dataAttachments.value = files.map((file) => URL.createObjectURL(file));
}

onBeforeMount(async () => {
  getAttachments();
});
</script>

<style lang="scss" scoped>
@use "~/assets/scss/components/chat/message.scss";
</style>

<template>
  <div
    :class="'message ' + `${user_id == storeRef.id.value ? 'user' : 'guest'}`"
  >
    <div>
      <div class="message-author">
        <span>{{ user_name }}</span>

        <NuxtImg
          class="message-author-img-mobile"
          format="webp"
          :src="avatar"
        />
      </div>
      <div class="message-body" v-if="message_type == 'message'">
        <p class="message-content">{{ content }}</p>
        <div class="message-imgs" v-if="attachments.length > 0">
          <NuxtLink :to="img" target="_blank" v-for="img in dataAttachments">
            <NuxtImg :src="img" format="webp" />
          </NuxtLink>
        </div>
      </div>

      <p class="message-createdat">{{ formatDate(createdAt).hoursAndDate }}</p>
    </div>
    <NuxtImg class="message-author-img" format="webp" :src="avatar" />
  </div>
</template>
