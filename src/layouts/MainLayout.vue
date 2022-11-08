<template>
  <q-layout view="hHh Lpr lFf" class="mybg">
    <q-header>
      <q-toolbar class="bg-positive">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sentidos - Restaurante y casa de té </q-toolbar-title>
        <p class="q-ma-none">{{ usuario.name }}</p>
        <q-btn flat @click="salir()">Salir</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay bordered>
      <q-list>
        <q-item-label header> Roles </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="q-px-xl">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useStore } from "src/store";
import { useRouter } from "vue-router";
import router from "src/router";

const linksList = [
  {
    title: "Mozo",
    caption: "quasar.dev",
    icon: "restaurant",
    link: "/mozo",
  },
  {
    title: "Maitre",
    caption: "github.com/quasarframework",
    icon: "menu_book",
    link: "/maitre",
  },
  {
    title: "Caja",
    caption: "chat.quasar.dev",
    icon: "credit_card",
    link: "/caja",
  },
  {
    title: "Propietario",
    caption: "forum.quasar.dev",
    icon: "store",
    link: "/propietario",
  },
  {
    title: "Chef",
    caption: "@quasarframework",
    icon: "soup_kitchen",
    link: "/chef",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const $store = useStore();
    const $router = useRouter();
    const usuario = computed(
      () => $store.getters["propietario/getUsuarioLogeado"]
    );
    const leftDrawerOpen = ref(false);
    const salir = () => {
      $router.push("/");
    };

    onBeforeUnmount(() => {
      $store.commit("propietario/SET_USUARIO_LOGEADO", {});
    });
    return {
      essentialLinks: linksList,
      usuario,
      salir,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.mybg {
  background-color: hsla(31, 0%, 100%, 1);
  background-image: radial-gradient(
      at 0% 93%,
      hsla(289, 87%, 62%, 0.37) 0px,
      transparent 50%
    ),
    radial-gradient(at 10% 3%, hsla(229, 83%, 79%, 0.37) 0px, transparent 50%),
    radial-gradient(at 72% 100%, hsla(1, 99%, 76%, 0.31) 0px, transparent 50%),
    radial-gradient(at 96% 45%, hsla(66, 71%, 76%, 0.35) 0px, transparent 50%);
}
</style>
