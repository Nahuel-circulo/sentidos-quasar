import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MozoStateInterface } from './state';


const getters: GetterTree<MozoStateInterface, StateInterface> = {
  getReservas: (state) => {
    return state.reservas
  },
  getProductos: (state) => {
    return state.productos
  },
  getPedidos: (state) => {
    return state.pedidos
  }
};

export default getters;
