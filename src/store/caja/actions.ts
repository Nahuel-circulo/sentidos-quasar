
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CajaStateInterface } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<CajaStateInterface, StateInterface> = {
  fetchMetodos: async ({ commit, state }) => {
    try {

      const { data } = await api_payload.get(`/metodop`)
      console.log(data)
      commit('SET_METODOS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  fetchFacturasImpagas: async ({ commit, state }) => {
    try {

      const { data } = await api_payload.get(`/factura?where[metodo_de_pago][exists]=false`)
      console.log(data)
      commit('SET_FACTURAS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  pagarFactura: async ({ commit, state,dispatch }, datoFacturacion: { id_factura: string, metodo: string }) => {
    try {
      const { data } = await api_payload.put(`/factura/${datoFacturacion.id_factura}`, {
        metodo_de_pago: datoFacturacion.metodo
      })
      console.log(data)
      dispatch('fetchFacturasImpagas')
    } catch (error) {
      console.log(error);
    }
  },
  fetchFacturaActiva: async ({ commit, state }, id) => {
    try {
      const { data } = await api_payload.get(`/factura/${id}`)
      console.log(data)
      commit('SET_FACTURA_ACTIVA', data)
    } catch (error) {
      console.log(error);
    }
  }
};

export default actions;
