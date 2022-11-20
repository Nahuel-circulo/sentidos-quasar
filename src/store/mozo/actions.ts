import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MozoStateInterface } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<MozoStateInterface, StateInterface> = {
  fetchReservas: async ({ commit, state }, { fecha }) => {
    try {
      const { data } = await api_payload.get(`/reservations?where[fecha][equals]=${fecha}&where[confirmado][equals]=true`)
      console.log(data)
      commit('SET_RESERVAS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  fetchProductos: async ({ commit, state }) => {
    try {
      const { data } = await api_payload.get(`/producto?limit=30`)
      console.log(data)
      commit('SET_PRODUCTOS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  fetchPedidos: async ({ commit, state }, identificador: string) => {
    try {
      const { data } = await api_payload.get(`/pedido?where[identificador][equals]=${identificador}`)
      console.log(data)
      commit('SET_PEDIDOS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
  postPedido: async ({ commit, state, dispatch }, pedido: { identificador: string, cantidad: number, producto: string }) => {
    try {
      const { data } = await api_payload.post(`/pedido`, {
        identificador: pedido.identificador,
        cantidad: pedido.cantidad,
        producto: pedido.producto

      })
      console.log(data)
      dispatch("fetchPedidos", pedido.identificador)
    } catch (error) {
      console.log(error);
    }
  },
  actualizarPedido: async ({ commit, state, dispatch }, pedido: { identificador: string, id: string }) => {
    try {
      const { data } = await api_payload.put(`/pedido/${pedido.id}`, {
        identificador: pedido.identificador + 'F',
      })
      console.log(data)
      dispatch("fetchPedidos", pedido.identificador)
    } catch (error) {
      console.log(error);
    }
  },
  postFactura: async ({ commit, state, dispatch }, factura: { total: string, usuario: string, pedidos: Array<string> }) => {
    try {
      const { data } = await api_payload.post(`/factura`, {
        total: factura.total,
        pedidos: factura.pedidos,
        user: factura.usuario

      })
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  },
  deletePedido: async ({ commit, state, dispatch }, pedido: string) => {
    try {
      const { data } = await api_payload.delete(`/pedido/${pedido}`)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  },
  habilitarProducto: async ({ commit, state,dispatch }, id: String) => {
    try {
      const { data } = await api_payload.put(`/producto/${id}`, {
        disponible: true
      })
      console.log(data)
      dispatch('fetchProductos')
    } catch (error) {
      console.log(error);
    }
  },
  deshabilitarProducto: async ({ commit, state,dispatch }, id: String) => {
    try {
      const { data } = await api_payload.put(`/producto/${id}`, {
        disponible: false
      })
      console.log(data)
      dispatch('fetchProductos')
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;
