import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PropietarioStateInterface } from './state';


const getters: GetterTree<PropietarioStateInterface, StateInterface> = {
  getFacturas: (state) => {
    return state.facturas
  },
  getTotal: (state) => {
    return state.total
  }
};

export default getters;
