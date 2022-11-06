
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PropietarioStateInterface, Factura } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<PropietarioStateInterface, StateInterface> = {
  fetchFacturas: async ({ commit, state }, { desde, hasta, metodoP }) => {
    // let link = `?where[createdAt][greater_than]=${desde}&[and][createdAt][less_than]=${hasta}&[metodo_de_pago][equals]=${metodoP}&where[metodo_de_pago][exists]=true`
    let link = `?where[metodo_de_pago][equals]=${metodoP}&where[metodo_de_pago][exists]=true`
    const { data } = await api_payload.get(`/factura${link}`)
    /* commit('SET_FACTURAS', data.docs) */

    if (data.docs.length) {
      let datosFiltrados = [];
      datosFiltrados = data.docs.filter((factura: Factura) => {
        if (factura.createdAt >= desde && factura.createdAt <= hasta) {
          return factura
        }
      })
      commit('SET_FACTURAS', datosFiltrados)
      let total = 0;
      datosFiltrados.forEach((factura: Factura) => {
        total += Number(factura.total)
      });
      commit('SET_TOTAL', total)

    } else {
      commit('SET_TOTAL', 0)
    }
  },
};

export default actions;
