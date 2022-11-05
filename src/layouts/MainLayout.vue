<template>
  <q-layout view="hHh Lpr lFf">
    <q-header >
      <q-toolbar class="bg-positive ">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sentidos - Restaurante y casa de té </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"  overlay bordered>
      <q-list>
        <q-item-label header> Roles </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-warning q-px-xl">
      
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Mozo',
    caption: 'quasar.dev',
    icon: 'restaurant',
    link: '/mozo'
  },
  {
    title: 'Maitre',
    caption: 'github.com/quasarframework',
    icon: 'menu_book',
    link: '/maitre'
  },
  {
    title: 'Caja',
    caption: 'chat.quasar.dev',
    icon: 'credit_card',
    link: '/caja'
  },
  {
    title: 'Propietario',
    caption: 'forum.quasar.dev',
    icon: 'store',
    link: '/propietario'
  },
  {
    title: 'Chef',
    caption: '@quasarframework',
    icon: 'soup_kitchen',
    link: '/chef'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
