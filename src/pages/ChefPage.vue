<template>
  <q-page class="row items-center justify-center">
    <q-table
      title="Productos"
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
              <producto-action :id="props.row.id" :disponible="props.row.disponible"/>
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
  </q-page>
</template>

<script lang="ts">
import ProductoAction from "src/components/ProductoAction.vue";
import { useStore } from "src/store";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { ProductoAction },
  setup() {

    const $store = useStore()
    $store.dispatch('mozo/fetchProductos')
    const productos = computed(()=> $store.getters['mozo/getProductos'])
    const filter = ref("");
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
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    return {
      columns,
      filter,
      pagination,
      productos
    };
  },
});
</script>
