<script setup lang="ts">
import { useStoreSession, type IUser } from "@/stores/session";

import { object, string } from "yup";

const store = useStoreSession();
const storeRef = storeToRefs(store);

const form = reactive({
  email: "",
  password: "",
});

const formErrors = reactive({
  email: "",
  password: "",
});

const schema = object().shape({
  email: string()
    .email("Email invalido")
    .min(8, "E-mail deve ter mais de 8 digitos")
    .max(25, "E-mail deve ser menor que 25 digitos")
    .required("Campo obrigatório"),
  password: string()
    .min(6, "Senha deve ter mais de 6 digitos")
    .max(25, "Senha deve ser menor que 25 digitos")
    .required("Campo obrigatório"),
});

definePageMeta({ layout: "navbar" });

async function submitLogin(event: Event) {
  const isValidForm = await validForm(schema, form, formErrors);

  if (!isValidForm) return;

  const loginResponse = await useApi<{ user: IUser; token: string }, {}>({
    url: "/login",
    method: "post",
    data: form,
  });

  if (!loginResponse.success) {
    clear(formErrors);

    switch (loginResponse.error) {
      case "password-not-match":
        formErrors.password = "Senha invalida";
        break;
      case "user-not-exist":
        formErrors.email = "E-mail não existe";
        break;

      default:
        clear(formErrors, "Error inesperado");
        break;
    }

    return;
  }

  store.setSession(loginResponse);
  const token = useCookie("token");
  token.value = loginResponse.token;

  useRouter().push("/chat");
}
</script>

<template>
  <div>
    <div class="bg-slate-800 mx-48 py-24 rounded-2xl flex flex-col">
      <h1 class="mx-auto text-4xl mb-16">Login</h1>
      <form
        @submit.prevent="submitLogin"
        @change="
          () => {
            console.log('oi');
          }
        "
      >
        <div>ref:{{ storeRef }}</div>
        <div label="Email" name="email">
          <label for="email">email</label>
          <input v-model="form.email" type="email" id="email" />
          <p v-if="formErrors.email">{{ formErrors.email }}</p>
        </div>

        <div label="senha" name="password">
          <label for="password">password</label>
          <input v-model="form.password" type="password" id="password" />
          <p v-if="formErrors.password">{{ formErrors.password }}</p>
        </div>

        <button type="submit">Logar</button>
      </form>
    </div>
  </div>
</template>
