import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MozoStateInterface } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<MozoStateInterface, StateInterface> = {
  fetchReservas: async ({ commit, state }, { fecha }) => {
    const { data } = await api_payload.get(`/reservations?where[fecha][equals]=${fecha}&where[confirmado][equals]=true`)
    console.log(data)
    commit('SET_RESERVAS', data.docs)
  },
  fetchProductos: async ({ commit, state }) => {
    const { data } = await api_payload.get(`/producto?limit=30`)
    console.log(data)
    commit('SET_PRODUCTOS', data.docs)
  },
  fetchPedidos: async ({ commit, state },identificador:string) => {
    const { data } = await api_payload.get(`/pedido?where[identificador][equals]=${identificador}`)
    console.log(data)
    commit('SET_PEDIDOS', data.docs)
  },
  postPedido: async ({ commit, state,dispatch },pedido:{identificador:string,cantidad:number,producto:string}) => {
    const { data } = await api_payload.post(`/pedido`,{
      identificador:pedido.identificador,
      cantidad:pedido.cantidad,
      producto:pedido.producto

    })
    console.log(data)
    dispatch("fetchPedidos",pedido.identificador)
  },
  deletePedido: async ({commit,state,dispatch},pedido:string) =>{
    const {data} = await api_payload.delete(`/pedido/${pedido}`)
    console.log(data)
  }
};

export default actions;
