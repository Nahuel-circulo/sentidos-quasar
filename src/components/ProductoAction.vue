<template>
  <div>
    <q-btn
      @click="habilitar()"
      v-if="!disponible"
      size="sm"
      color="positive"
      outline
      >Habilitar</q-btn
    >
    <q-btn @click="deshabilitar()" v-else size="sm" color="positive" outline
      >Deshabilitar</q-btn
    >
  </div>
</template>

<script lang="ts">
import { useStore } from "src/store";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    disponible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    
    const $store = useStore();
    const habilitar = () => {
        $store.dispatch("mozo/habilitarProducto", props.id);
      console.log(props.id);
    };
    const deshabilitar = () => {
        $store.dispatch("mozo/deshabilitarProducto", props.id);
      console.log(props.id);
    };
    return {
      habilitar,
      deshabilitar,
    };
  },
});
</script>
