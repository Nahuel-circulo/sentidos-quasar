
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MaitreStateInterface } from './state';
import { api_payload } from '../../../api/api_payload';

const actions: ActionTree<MaitreStateInterface, StateInterface> = {
  fetchReservas: async ({ commit, state }, { fecha }) => {

    try {
      const { data } = await api_payload.get(`/reservations?where[fecha][equals]=${fecha}`)
      console.log(data)
      commit('SET_RESERVAS', data.docs)
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;
