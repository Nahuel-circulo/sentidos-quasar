<template>
  <q-page>
    <div class="q-pa-xl row items-center justify-center">
      <div class="col-10">
        <q-table
          title="Pedidos"
          :rows="facturas"
          :columns="columns"
          virtual-scroll
          :rows-per-page-options="[0]"
          hide-pagination
          no-data-label="Aún no hay pedidos"
          :virtual-scroll-item-size="50"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="fecha" :props="props">
                {{ props.row.createdAt.slice(0, 10) }}
              </q-td>
              <q-td key="horario" :props="props">
                <ul>
                  <li
                    class="text-right"
                    v-for="pedido in props.row.pedidos"
                    :key="pedido.id"
                  >
                    {{ pedido.cantidad }} - {{ pedido.producto.name }} - ${{
                      pedido.producto.price
                    }}
                    c/u
                  </li>
                </ul>
              </q-td>
              <q-td key="mesa" :props="props">${{ props.row.total }} </q-td>
              <q-td key="comensales" :props="props">
                <q-btn @click="facturar(props.row)">Facturar</q-btn></q-td
              >
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-10 q-mt-lg row">
        <div class="col-4">
          <q-select
            v-if="facturaActivaNum != ''"
            class="col-12 q-mb-md"
            bg-color="white"
            filled
            outlined
            label="Metodo de pago"
            v-model="metodo"
            :options="metodos"
            :option-label="(metodo) => metodo.name"
            :option-value="(metodo) => metodo"
            style="min-width: 250px; max-width: 300px"
          />
        </div>

        <div
          class="col-4"
          v-if="metodo != '' && metodo.id != '63643fe9b8581428df2eca08'"
        >
          <q-input
            filled
            v-model="tarjeta"
            label="Número de tarjeta"
            :rules="[
              (val) =>
                (val.length >= 16 && val.length <= 18) ||
                'Minimo 16 digitos, maximo 18.',
            ]"
          />
          <q-input
            filled
            v-model="codTarjeta"
            label="Código de seguridad"
            :rules="[
              (val) =>
                val.length == 3 ||
                'Ingrese los 3 digitos en el dorso de la tarjeta',
            ]"
          />
          <q-input
            filled
            v-model="nombre"
            label="Nombre y apellido como figura en la tarjeta"
            :rules="[(val) => val.length || 'Debe ingresar un nombre']"
          />
        </div>
        <div class="col-4 row justify-center items-start">
          <!-- TODO: Falta generar la factura en la base de datos -->
          <q-btn
            v-if="
              (tarjeta.length >= 16 &&
                codTarjeta.length == 3 &&
                nombre.length > 1) ||
              metodo.id == '63643fe9b8581428df2eca08'
            "
            class="q-mx-auto"
            >Generar Factura</q-btn
          >
        </div>
      </div>
      <div class="factura bg-white q-pa-md" id="factura" ref="factura">
        <div>
          <p class="q-ma-xs">Sentidos Tea House & Restaurant</p>
          <p class="q-ma-xs">C.U.I.T. Nro 30692138747</p>
          <p class="q-ma-xs">Ing. Brutos: 30692138747</p>
          <p class="q-ma-xs">Inicio de Actividades: 17/12/1996</p>
          <p class="q-ma-xs">IVA Responsable inscripto</p>
          <p class="q-ma-xs">A CONSUMIDOR FINAL</p>
          <p class="q-mt-md">Cod. Factura : {{ facturaActivaNum }}</p>

          <p>Fecha: {{ now }} Hora:{{ hora }}</p>

          <div v-if="facturaActivaNum != '' && facturaActiva">
            <div
              class="q-ma-xs"
              v-for="pedido in facturaActiva.pedidos"
              :key="pedido.id"
            >
              <div class="row">
                <div class="col-8">{{ pedido.producto.name }}</div>
                <div class="col-2">x({{ pedido.cantidad }})</div>
                <div class="col-2">
                  ${{ pedido.cantidad * pedido.producto.price }}
                </div>
              </div>
            </div>
            <h6 class="q-ma-sm">total ${{facturaActiva.total}}</h6>
          </div>
          <!-- //TODO: Falta el total -->
          <q-img style="margin: 0 auto;" src="../assets/qr.jpg" width="200px" :ratio="1" />
        </div>
      </div>
      <q-btn @click="generarPDF">generar</q-btn>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "../store/index";
import { computed, ref } from "vue";
import moment from "moment";
import { jsPDF } from "jspdf";
export default {
  setup() {
    const now = moment().format("DD-MM-YYYY");
    const hora = moment().format("LTS");
    const $store = useStore();
    const facturas = computed(() => $store.getters["caja/getFacturas"]);
    const metodos = computed(() => $store.getters["caja/getMetodos"]);
    const facturaActiva = computed(
      () => $store.getters["caja/getFacturaActiva"]
    );

    const metodosDePago = computed(
      () => $store.getters["propietario/getMetodos"]
    );
    const metodo = ref("");

    const fetchFacturasYMetodos = () => {
      $store.dispatch("caja/fetchFacturasImpagas");
      $store.dispatch("caja/fetchMetodos");
    };

    fetchFacturasYMetodos();
    const factura = ref();
    const facturaActivaNum = ref("");
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
      { name: "mesa", label: "Total" },
      { name: "comensales", label: "Facturar" },
    ];

    const facturar = (factura) => {
      facturaActivaNum.value = factura.id;
      console.log(facturaActivaNum.value);
      $store.dispatch("caja/fetchFacturaActiva", factura.id);
    };
    const generarPDF = () => {
      console.log(factura.value);
      const doc = new jsPDF();
      doc.html(factura.value, {
        callback: function (doc) {
          doc.save("factura-sentidos.pdf");
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 200,
        windowWidth: 600,
      });
    };
    const tarjeta = ref("");
    const nombre = ref("");
    const codTarjeta = ref("");
    return {
      facturas,
      metodos,
      columns,
      facturar,
      metodo,
      metodosDePago,
      tarjeta,
      nombre,
      codTarjeta,
      facturaActiva,
      facturaActivaNum,
      now,
      hora,
      factura,
      generarPDF,
    };
  },
};
</script>
