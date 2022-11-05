
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PropietarioStateInterface } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<PropietarioStateInterface, StateInterface> = {
  fetchFacturas: async ({ commit, state }, { desde, hasta, metodoP }) => {
    let link = `?where[createdAt][greater_than_equal]=${desde}&[less_than_equal]=${hasta}&[metodo_de_pago][equals]=${metodoP}`
    const { data } = await api_payload.get(`/factura${link}`)
    console.log(data)
    commit('SET_FACTURAS', data.docs)
  },
};

export default actions;
