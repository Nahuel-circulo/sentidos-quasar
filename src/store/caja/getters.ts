import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CajaStateInterface } from './state';


const getters: GetterTree<CajaStateInterface, StateInterface> = {
  getFacturas: (state) => {
    return state.facturas
  },
  getMetodos:(state)=>{
    return state.metodos
  },
  getFacturaActiva:(state)=>{
    return state.facturaActiva
  }
};

export default getters;
