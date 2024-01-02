<script setup lang="ts">
import type { NuxtSocket } from "nuxt-socket-io";
import { useStoreSession } from "@/stores/session";
import type { IMessage } from "~/@types/chat";

const store = useStoreSession();
const storeRef = storeToRefs(store);

const chatRoom = ref("");
const inputChat = ref("");

let socket: NuxtSocket | undefined;

const token = useCookie("token");

const salas = ["sala1", "sala2", "sala3"];

const latency = ref("0");

const messages = ref<IMessage[]>([]);

function selecteRoom(idRoom: string) {
  if (idRoom == chatRoom.value) return;
  if (!socket) return;

  messages.value = [];
  socket.emit("leaveRoom", {
    room_id: chatRoom.value,
    user_id: storeRef.id.value,
    user_name: storeRef.name.value,
    token: storeRef.token.value,
  });

  chatRoom.value = idRoom;

  socket.emit("joinRoom", {
    room_id: chatRoom.value,
    user_id: storeRef.id.value,
    user_name: storeRef.name.value,
    token: storeRef.token.value,
  });
}

function sendMessage() {
  if (!socket) return;

  if (!inputChat.value) return;

  socket.emit("sendMessage", {
    user_id: storeRef.id.value,
    user_name: storeRef.name.value,
    room_id: chatRoom.value,
    content: inputChat.value,
  });

  inputChat.value = "";
}

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  socket = useNuxtApp().$nuxtSocket({
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("receivedMessage", (dataMessage: IMessage) => {
    messages.value.push(dataMessage);
  });
  selecteRoom(salas[0]);

  socket.on("disconnect", (reason) => {
    latency.value = "conexão perdida";
  });

  let startTime = 0;

  socket.on("pong", function () {
    const ping = Date.now() - startTime;
    latency.value = ping.toString();
  });

  setInterval(() => {
    if (!socket) return;

    startTime = Date.now();

    socket.emit("ping");
  }, 1000);
});
onBeforeMount(() => {
  if (socket) socket.disconnect();

  socket = undefined;
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/pages/chat.scss";
</style>

<template>
  <div class="container-page-chat">
    <div class="container">
      <div class="chat">
        <div class="chat-header">
          sla {{ token }}
          <p>ping: {{ latency }}</p>
          <p>nome da sala:{{ chatRoom }}</p>
          <button
            v-for="sala in salas"
            @click="selecteRoom(sala)"
            type="button"
          >
            {{ sala }}
          </button>
        </div>

        <div class="chat-body">
          <ChatMessage
            v-for="message in messages"
            :content="message.content"
            :user_name="message.user_name"
            :user_id="message.user_id"
            avatar="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          />
        </div>
        <div class="chat-footer">
          <button type="button">plus</button>
          <input type="text" @keydown.enter="sendMessage" v-model="inputChat" />
          <button type="button" @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>
