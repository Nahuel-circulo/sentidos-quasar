<template>
  <q-page class="row items-center justify-center">
    <div class="row">
      <div class="col-12 col-md-4">
        <h4 class="text-center q-my-sm">Fecha y Horario</h4>
        <q-select
          class="q-mx-auto bg-white q-mt-lg"
          square
          outlined
          v-model="horario"
          style="max-width: 290px"
          :options="horarioOptions"
          label="Horario"
        />
        <div class="items-center row justify-center justify-center">
          <div class="q-pa-md">
            <q-date
              color="info"
              lang
              :locale="myLocale"
              minimal
              v-model="date"
              @click="cambioFecha"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-8">
        <h4 class="text-center q-my-sm">Lista de precios</h4>
        <div class="q-pa-md">
          <q-table
            title="Precios"
            virtual-scroll
            :rows-per-page-options="[0]"
            :rows="productos"
            :columns="columns"
            v-model:pagination="pagination"
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
                      :identificador="
                        mesaActiva + '-' + fechaFormateada + '-' + horario[0]
                      "
                      :idProducto="props.row.id"
                      :MesaActiva="mesaActiva.toString()"
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
          <p class="q-mt-sm" v-if="mesaActiva == ''">Para agregar pedidos, primero debe seleccionar una mesa</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
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
                    @click="
                      fetchPedidos(
                        reserva.mesa.nro_mesa,
                        reserva.fecha,
                        reserva.user.id
                      )
                    "
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
      <div class="col-12 col-md-8 q-pa-md">
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
          <template v-slot:top-right>
            <q-btn color="orange" :disable="mesaActiva == ''" @click="cerrarMesa(mesaActiva)" outline
              >Cerrar mesa</q-btn
            >
          </template>
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
              <q-td key="quitar" :props="props">
                <q-btn @click="eliminarPedido(props.row.id)" flat color="red"
                  >Quitar</q-btn
                >
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import TableAction from "src/components/TableAction.vue";
import { useStore } from "src/store";
import { computed, ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const date = ref("");
    const filter = ref("");
    const mesaActiva = ref("");
    const usuarioReserva = ref("");
    const columns = [
      {
        name: "name",
        required: true,
        label: "Producto",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
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
      { name: "quitar", label: "Quitar" },
    ];
    const fechaFormateada = ref(moment().format("YYYY-MM-DD"));
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });
    const horario = ref("Matutino");
    const horarioOptions = ["Matutino", "Nocturno"];

    const cambioFecha = () => {
      fechaFormateada.value = date.value.replaceAll("/", "-");
      mesaActiva.value = "";
      usuarioReserva.value = "";
      $store.commit("mozo/SET_PEDIDOS",[])
      $store.dispatch("mozo/fetchReservas", {
        fecha: fechaFormateada.value,
      });
    };
    const fetchPedidos = (mesa, fecha, usuario) => {
      mesaActiva.value = mesa;
      usuarioReserva.value = usuario;
      $store.dispatch(
        "mozo/fetchPedidos",
        mesa + "-" + fecha + "-" + horario.value[0]
      );
    };
    const eliminarPedido = (pedido) => {
      $q.dialog({
        title: "Eliminar",
        message: "Desea eliminar el producto?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        console.log("ejecuta");
        $store.dispatch("mozo/deletePedido", pedido);
      });
    };
    const fetchProductos = () => {
      $store.dispatch("mozo/fetchProductos");
    };
    const reservas = computed(() => $store.getters["mozo/getReservas"]);
    const productos = computed(() => $store.getters["mozo/getProductos"]);
    const pedidos = computed(() => $store.getters["mozo/getPedidos"]);
    fetchProductos();
    const myLocale = {
      /* starting with Sunday */
      days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
      daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
      months:
        "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
          "_"
        ),
      monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
      firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
      format24h: true,
      pluralDay: "dias",
    };

    const cerrarMesa = (id) => {
      let pedidosArray = [];
      let total = 0;
      pedidos.value.forEach((pedido) => {
        pedidosArray.push(pedido.id);
        total += parseInt(pedido.producto.price) * parseInt(pedido.cantidad);
      });
      console.log(pedidosArray, "totla", total);
      $q.dialog({
        title: "Cerrar pedidos",
        message: "Desea cerrar los pedidos y proceder a facturar?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        console.log("ejecuta", id);
        $store.dispatch("mozo/postFactura", {
          total: total,
          pedidos: pedidosArray,
          user: usuarioReserva.value,
        });

        pedidos.value.forEach((pedido) => {
          $store.dispatch("mozo/actualizarPedido", {
            identificador: pedido.identificador,
            id: pedido.id,
          });
        });
      });
    };

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
      horarioOptions,
      myLocale,
      pagination,
      eliminarPedido,
      cerrarMesa,
      usuarioReserva,
    };
  },
  components: { TableAction },
};
</script>
