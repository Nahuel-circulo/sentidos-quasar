import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MaitreStateInterface } from './state';


const getters: GetterTree<MaitreStateInterface, StateInterface> = {
  getReservas: (state) => {
    return state.reservas
  }
};

export default getters;
