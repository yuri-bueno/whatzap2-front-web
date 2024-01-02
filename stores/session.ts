import { defineStore } from "pinia";

const useStoreSession = defineStore("session", () => {
  const user_id = ref("");
  const name = ref("");
  const email = ref("");
  const token = ref("");
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  function setSession(data: { user: IUser; token: string }) {
    if (!user_id.value) user_id.value = data.user.id;
    if (!name.value) name.value = data.user.name;
    if (!email.value) email.value = data.user.email;
    if (!token.value) token.value = data.token;
  }
  function increment() {
    count.value++;
  }

  return {
    id: user_id,
    email,
    count,
    name,
    token,
    doubleCount,
    setSession,
    increment,
  };
});

export { useStoreSession };

export interface IUser {
  id: string;
  name: string;
  email: string;
}
