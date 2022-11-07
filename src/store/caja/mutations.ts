import { MutationTree } from 'vuex';
import { Factura, CajaStateInterface, MetodoDePago} from './state';


const mutation: MutationTree<CajaStateInterface> = {
  SET_FACTURAS (state: CajaStateInterface,payload:Array<Factura>) {
    state.facturas= payload
  },
  SET_METODOS(state:CajaStateInterface,payload:Array<MetodoDePago>){
    state.metodos = payload
  },
  SET_FACTURA_ACTIVA(state:CajaStateInterface,payload:Factura){
    console.log("payload ",payload)
    state.facturaActiva = payload
  }
};

export default mutation;
