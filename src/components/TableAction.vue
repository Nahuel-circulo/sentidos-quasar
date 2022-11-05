<template>
  <div>
    <q-btn @click="remove" size="xs" round color="positive" icon="remove" />
    <span class="q-mx-sm">
      {{ cantidad }}
    </span>
    <q-btn @click="add" round color="positive" size="xs" icon="add" />
    <q-btn flat no-caps color="info" @click="agregar()">Agregar</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store/index";

export default defineComponent({
  props: {
    identificador: {
      type: String,
      required: true,
    },
    idProducto: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const $store = useStore();
    const cantidad = ref(1);
    const add = () => {
      cantidad.value = cantidad.value + 1;
    };
    const remove = () => {
      if (cantidad.value > 1) {
        cantidad.value = cantidad.value - 1;
      }
    };

    const agregar = () => {
      console.log(" ", props.identificador);
      if (props.identificador.includes("M")||props.identificador.includes("N")) {
        $store.dispatch("mozo/postPedido", {
          identificador: props.identificador,
          cantidad: cantidad.value,
          producto: props.idProducto,
        });
      }
    };
    return {
      agregar,
      cantidad,
      add,
      remove,
    };
  },
});
</script>
