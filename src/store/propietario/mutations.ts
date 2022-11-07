import { MutationTree } from 'vuex';
import { PropietarioStateInterface, MetodoDePago } from './state';

const mutation: MutationTree<PropietarioStateInterface> = {
  SET_FACTURAS (state: PropietarioStateInterface,payload:Array<any>) {
    state.facturas = payload
  },
  SET_TOTAL (state: PropietarioStateInterface,payload:String) {
    state.total = payload
  },
  SET_METODOS (state: PropietarioStateInterface,payload:Array<MetodoDePago>) {
    state.metodosDePago = payload
  }
};

export default mutation;
