<template>
  <q-page class="row items-center justify-center">
    <div class="q-pa-md">
      <div class="q-pb-sm">Model: {{ rangeTime }}</div>

      <q-date
        color="positive"
        v-model="rangeTime"
        range
        @update:model-value="fetchFacturas"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import { useStore } from "src/store";

export default defineComponent({
  setup() {
    const $store = useStore();
    const rangeTime = ref();

    const fetchFacturas = () => {
      console.log(moment(rangeTime.value["from"]).toISOString());
      console.log(moment(rangeTime.value["to"]).toISOString());
      $store.dispatch("propietario/fetchFacturas", {
        desde: moment(rangeTime.value["from"]).toISOString(),
        hasta: moment(rangeTime.value["to"]).toISOString(),
        metodoP: "63643fe9b8581428df2eca08",
      });
    };

    return {
      rangeTime,
      fetchFacturas,
    };
  },
});
</script>
