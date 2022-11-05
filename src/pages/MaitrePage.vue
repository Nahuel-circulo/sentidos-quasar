<template>
  <q-page class="row items-center justify-center">
    <div class="q-pa-md">
      <div class="items-center row justify-center justify-center">
        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-date  color="info" v-model="date" @click="cambioFecha" />
          </div>
        </div>
      </div>
      
      <q-table
        title="Reservas"
        :rows="reservas"
        :columns="columns"
        virtual-scroll
        :rows-per-page-options="[0]"
        hide-pagination
        no-data-label="No hay reservas"
        :virtual-scroll-item-size="50"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="fecha" :props="props">
              {{ props.row.fecha }}
            </q-td>
            <q-td key="horario" :props="props">
              <q-badge color="positive">
                <span v-if="props.row.horario == 'M'">Matutino</span>
                <span v-else>Nocturno</span>
              </q-badge>
            </q-td>
            <q-td key="mesa" :props="props">
              <q-badge color="positive">
                {{ props.row.mesa.nro_mesa }}
              </q-badge>
            </q-td>
            <q-td key="comensales" :props="props">
              <q-badge color="positive">
                {{ props.row.comensales }}
              </q-badge>
            </q-td>
            <q-td key="usuario" :props="props" v-if="props.row.user">
              <q-badge color="info">

                {{props.row.user.name}}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { data } from "autoprefixer";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store/index";

const columns = [
  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "left",
  },
  {
    name: "horario",
    align: "center",
    label: "Horario",
    field: "calories",
  },
  { name: "mesa", label: "Mesa" },
  { name: "comensales", label: "Comensales" },
  { name: "usuario", label: "A cargo" },
];

export default defineComponent({
  setup() {
    const $store = useStore();
    const date = ref<string>('');
    const reservas = computed(() => $store.getters["maitre/getReservas"]);
    console.log(reservas.value);

    const verUsuario = (id: number) => {
      console.log(id);
    };
    const cambioFecha = ()=>{
      const fechaFormateada = date.value.replaceAll('/','-');
      console.log(fechaFormateada)
      $store.dispatch("maitre/fetchReservas", {
        fecha: fechaFormateada,
      })
    }
    return {
      columns,
      reservas,
      verUsuario,
      date,
      cambioFecha
    };
  },
});
</script>
