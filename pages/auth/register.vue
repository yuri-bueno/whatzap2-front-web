<script setup lang="ts">
import { useStoreSession } from "@/stores/session";

const store = useStoreSession();
const storeRef = storeToRefs(store);

const nameRef = ref("");
const emailRef = ref("");
const passwordRef = ref("");
const confirmPasswordRef = ref("");

const ErrorRequest = ref("");

async function postRegister() {
  const name = nameRef.value;
  const email = emailRef.value;
  const password = passwordRef.value;
  const confirmPassword = confirmPasswordRef.value;

  const registerResponse = await useApi<{ token: string }>({
    url: "/register",
    method: "post",
    data: {
      name,
      email,
      password,
      confirmPassword,
    },
  });

  if (!registerResponse.success) {
    console.log(registerResponse.error);

    ErrorRequest.value = registerResponse.error;
    return;
  }

  useRouter().push("/auth/login");
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/pages/auth/login.scss";
</style>
<template>
  <div>
    <form @submit.prevent="postRegister">
      <label for="name">Nome</label>
      <input type="name" v-model="nameRef" id="name" />
      <label for="email">E-mail</label>
      <input type="email" v-model="emailRef" id="email" />
      <label for="senha">Senha</label>
      <input type="password" v-model="passwordRef" id="senha" />
      <label for="confirm-senha">Confirmar senha</label>
      <input type="password" v-model="confirmPasswordRef" id="confirm-senha" />
      <button type="submit">Registrar</button>
    </form>
    {{ `error:${ErrorRequest}` }}
  </div>
</template>
