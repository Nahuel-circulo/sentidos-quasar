<template>
  <q-layout view="lHh Lpr lFf" class="mybg">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useStore } from "src/store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "LoginLayout",
  setup() {
    
    return {};
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
