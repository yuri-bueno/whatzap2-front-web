import { useStoreSession } from "@/stores/session";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");

  // const store = useStoreSession();
  // const storeRef = storeToRefs(store);

  // if (!token.value) return navigateTo("/auth/login");

  // if (!storeRef.id.value) {
  //   useApi({
  //     url: "/session",
  //   });
  // }
});
