import { MutationTree } from 'vuex';
import { PropietarioStateInterface, MetodoDePago, Personal } from './state';

const mutation: MutationTree<PropietarioStateInterface> = {
  SET_FACTURAS (state: PropietarioStateInterface,payload:Array<any>) {
    state.facturas = payload
  },
  SET_TOTAL (state: PropietarioStateInterface,payload:String) {
    state.total = payload
  },
  SET_METODOS (state: PropietarioStateInterface,payload:Array<MetodoDePago>) {
    state.metodosDePago = payload
  },
  SET_USUARIO_LOGEADO (state: PropietarioStateInterface,payload:Personal) {
    state.usuarioLogeado = payload
  },
  SET_ERROR_MESSAGE(state:PropietarioStateInterface,payload:string){
    state.errorMessage = payload
  }
};

export default mutation;
