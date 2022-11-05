<template>
  <q-page class="row items-center justify-center">
    <div class="col-12 col-md-4 row q-pa-md justify-center items-center">
      <q-date
        color="positive"
        v-model="rangeTime"
        range
        :locale="myLocale"
        title="Rango de fechas"
        @update:model-value="fetchFacturas"
      />
    </div>
    <div class="col-12 col-md-8 row justify-center items-center">
      <q-table
        title="Listado de facturas emitidas"
        :rows="facturas"
        :columns="columns"
        virtual-scroll
        :rows-per-page-options="[0]"
        hide-pagination
        no-data-label="No hay facturas - seleccione otro rango de fechas"
        :virtual-scroll-item-size="50"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nro_factura" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="metodo" :props="props">
              {{ props.row.metodo_de_pago.name }}
            </q-td>
            <q-td key="total" :props="props"> ${{ props.row.total }} </q-td>
            <q-td key="fecha" :props="props">
              {{ props.row.createdAt.slice(0,10) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import moment from "moment";
import { useStore } from "src/store";

export default defineComponent({
  setup() {
    const $store = useStore();
    const rangeTime = ref();
    const columns = [
      {
        name: "nro_factura",
        required: true,
        label: "Código de factura",
        align: "left",
        sortable: true,
      },
      { name: "metodo", align: "center", label: "Metodo de pago" },
      { name: "total", label: "Total facturado", sortable: true },
      {
        name: "fecha",
        label: "Fecha",
        sortable: true,
      },
    ];
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
    const fetchFacturas = () => {
      console.log(moment(rangeTime.value["from"]).toISOString());
      console.log(moment(rangeTime.value["to"]).toISOString());
      $store.dispatch("propietario/fetchFacturas", {
        desde: moment(rangeTime.value["from"]).toISOString(),
        hasta: moment(rangeTime.value["to"]).toISOString(),
        metodoP: "63643fe9b8581428df2eca08",
      });
    };

    const facturas = computed(() => $store.getters["propietario/getFacturas"]);

    return {
      rangeTime,
      fetchFacturas,
      myLocale,
      facturas,
      columns,
    };
  },
});
</script>
