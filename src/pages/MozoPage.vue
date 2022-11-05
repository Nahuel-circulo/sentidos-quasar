<template>
  <q-page class="row items-center justify-center">
    <div class="row">
      <div class="col-4">
        <h4 class="text-center q-my-sm">Fecha y Horario</h4>
        <q-select  class="q-mx-auto bg-white" square outlined v-model="horario" style="max-width:290px;" :options="horarioOptions" label="Horario" />
        <div class="items-center row justify-center justify-center">
          <div class="q-pa-md">
            <q-date
              color="info"
              lang
              minimal
              v-model="date"
              @click="cambioFecha"
            />
          </div>
        </div>
      </div>

      <div class="col-8">
        <h4 class="text-center q-my-sm">Lista de precios</h4>
        <div class="q-pa-md">
          <q-table
            title="Precios"
            virtual-scroll
            :rows-per-page-options="[0]"
            hide-pagination
            :rows="productos"
            :columns="columns"
            row-key="name"
            :filter="filter"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Buscar producto"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-td colspan="100%">
                    <TableAction
                      :identificador="mesaActiva + '-' + fechaFormateada+'-'+horario[0]"
                      :idProducto="props.row.id"
                    />
                  </q-td>
                </q-td>
                <q-td key="name">
                  {{ props.row.name }}
                </q-td>
                <q-td key="categoria">
                  {{ props.row.categoria.name }}
                </q-td>
                <q-td key="precio"> ${{ props.row.price }} </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <div class="col-4">
        <h4 class="text-center q-my-sm">Mesas Activas</h4>
        <div class="row justify-center items-center q-pa-md">
          <q-markup-table dark class="bg-positive">
            <thead>
              <tr>
                <th class="text-left">Mesa N°</th>
                <th class="text-right">Reservante</th>
                <th class="text-right">Pedidos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reserva in reservas" :key="reserva.id">
                <td class="text-left">{{ reserva.mesa.nro_mesa }}</td>
                <td class="text-right">{{ reserva.user.name }}</td>
                <td class="text-right">
                  <q-btn
                    @click="fetchPedidos(reserva.mesa.nro_mesa, reserva.fecha)"
                    no-caps
                    outline
                    text-color="negative"
                    class="bg-white"
                    >Detalle</q-btn
                  >
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <div class="col-8 q-pa-md">
        <h4 class="text-center q-my-sm">Mesa seleccionada</h4>
        <q-table
          :title="
            mesaActiva != ''
              ? 'Mesa N°' + mesaActiva
              : 'No hay mesa seleccionada'
          "
          :rows="pedidos"
          :columns="columnasPedidos"
          virtual-scroll
          :rows-per-page-options="[0]"
          hide-pagination
          no-data-label="No hay pedidos"
          :virtual-scroll-item-size="50"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.producto.name }}
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="precio" :props="props">
                ${{ props.row.producto.price }}
              </q-td>
              <q-td key="subtotal" :props="props">
                ${{ props.row.producto.price * props.row.cantidad }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import TableAction from "src/components/TableAction.vue";
import { useStore } from "src/store";
import { computed, defineComponent, ref } from "vue";
import moment from 'moment';

export default defineComponent({
  setup() {
    const $store = useStore();
    const date = ref<string>("");
    const filter = ref("");
    const mesaActiva = ref("");
    const columns = [
      {
        name: "name",
        required: true,
        label: "Producto",
        align: "left",
        field: (row: any) => row.name,
        format: (val: any) => `${val}`,
        sortable: true,
      },
      {
        name: "categoria",
        align: "left",
        label: "Categoria",
        field: "calories",
        sortable: true,
      },
      { name: "precio", label: "Precio", align: "left", sortable: true },
    ];
    const columnasPedidos = [
      {
        name: "name",
        required: true,
        label: "Producto",
        align: "left",
      },
      {
        name: "cantidad",
        align: "center",
        label: "Cantidad",
      },
      { name: "precio", label: "Precio unitario" },
      { name: "subtotal", label: "Subtotal" },
    ];
    const fechaFormateada = ref(moment().format('YYYY-MM-DD'));

    const horario = ref('Matutino');
    const horarioOptions = ["Matutino","Nocturno"];

    const cambioFecha = () => {
      fechaFormateada.value = date.value.replaceAll("/", "-");
      mesaActiva.value = "";
      $store.dispatch("mozo/fetchReservas", {
        fecha: fechaFormateada.value,
      });
    };
    const fetchPedidos = (mesa: string, fecha: string) => {
      mesaActiva.value = mesa;
      $store.dispatch("mozo/fetchPedidos", mesa+"-"+fecha+"-"+horario.value[0]);
    };
    const fetchProductos = () => {
      $store.dispatch("mozo/fetchProductos");
    };
    const reservas = computed(() => $store.getters["mozo/getReservas"]);
    const productos = computed(() => $store.getters["mozo/getProductos"]);
    const pedidos = computed(() => $store.getters["mozo/getPedidos"]);
    fetchProductos();
    return {
      cambioFecha,
      date,
      reservas,
      columns,
      productos,
      filter,
      columnasPedidos,
      mesaActiva,
      fetchPedidos,
      pedidos,
      fechaFormateada,
      horario,
      horarioOptions
    };
  },
  components: { TableAction },
});
</script>
