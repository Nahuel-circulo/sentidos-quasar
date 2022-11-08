<template>
  <q-page>
    <div class="q-pa-xl row items-center justify-center">
      <div class="col-10">
        <q-table
          class=""
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
                <q-btn
                  class="bg-positive text-white"
                  @click="facturar(props.row)"
                  >Facturar</q-btn
                ></q-td
              >
            </q-tr>
          </template>
        </q-table>
      </div>
      <q-stepper
        v-if="facturaActivaNum != ''"
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        class="q-mt-md"
      >
        <q-step
          :name="1"
          title="Seleccione tipo de pago"
          :done="step > 1"
          icon="assignment"
          color="positive"
        >
          <q-select
            bg-color="positive"
            filled
            outlined
            label="Metodo de pago"
            v-model="metodo"
            :options="metodos"
            :option-label="(metodo) => metodo.name"
            :option-value="(metodo) => metodo"
            style="
              min-width: 250px;
              max-width: 300px;
              margin: 0 auto;
              color: white;
            "
          />
        </q-step>

        <q-step
          color="positive"
          :name="2"
          :disable="metodo.id == '63643fe9b8581428df2eca08'"
          title="Ingrese datos de la tarjeta"
          :done="step > 2"
          icon="assignment"
        >
          <div
            class="q-pa-sm"
            style="
              min-width: 250px;
              max-width: 300px;
              margin: 0 auto;
              color: white;
            "
          >
            <q-input
              class="q-mb-md"
              bg-color="positive"
              filled
              v-model="nombre"
              label="Nombre y apellido como figura en la tarjeta"
              :rules="[(val) => val.length > 3 || 'Debe ingresar un nombre']"
            />
            <q-input
              class="q-mb-md"
              filled
              bg-color="positive"
              v-model="tarjeta"
              label="Númeto de tarjeta"
              mask="#### - #### - #### - ####"
              fill-mask="#"
              unmasked-value
              :rules="[(val) => val.length == 16 || 'Ingrese los 16 digitos.']"
            />

            <q-input
              class="q-mb-md"
              filled
              bg-color="positive"
              v-model="codTarjeta"
              label="Código de seguridad"
              mask="###"
              :rules="[
                (val) =>
                  val.length == 3 ||
                  'Ingrese los 3 digitos en el dorso de la tarjeta',
              ]"
              unmasked-value
            />
          </div>
        </q-step>

        <q-step
          :name="3"
          :disable="!isValid && metodo.id != '63643fe9b8581428df2eca08'"
          title="Generar Factura"
          icon="assignment"
          color="positive"
        >
          Al generar la factura, se creara una nueva y ya no se podrá modificar
          <q-btn
            outline
            color="info"
            @click="mostrarFactura(facturaActivaNum, metodo.id)"
            >Generar Factura</q-btn
          >
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              :disable="(step == 1 && metodo == '') || step == 3"
              @click="$refs.stepper.next()"
              color="positive"
              label="Continuar"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="positive"
              @click="$refs.stepper.previous()"
              label="Atrás"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>

      <h6 v-if="mostrar" class="col-10 q-my-md text-center">
        Factura Generada
      </h6>
      <div v-if="mostrar" class="column factura bg-white q-pa-md">
        <div id="factura" ref="factura">
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
            <h6 class="q-ma-sm">total ${{ facturaActiva.total }}</h6>
          </div>
          <q-img
            style="margin: 0 auto"
            src="../assets/qr.jpg"
            width="200px"
            :ratio="1"
          />
        </div>
        <q-btn class="bg-orange text-white q-mt-md" @click="generarPDF"
          >Descargar</q-btn
        >
      </div>
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
    const mostrar = ref(false);
    const mostrarFactura = (factura_id, metodo_id) => {
      // pagar
      mostrar.value = true;
      $store.dispatch("caja/pagarFactura", {
        id_factura: factura_id,
        metodo: metodo_id,
      });
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
    const step = ref(1);

    const isValid = computed(() => {
      return (
        tarjeta.value.length == 16 &&
        codTarjeta.value.length == 3 &&
        nombre.value.length > 3
      );
    });
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
      mostrarFactura,
      mostrar,
      isValid,
      step,
    };
  },
};
</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
