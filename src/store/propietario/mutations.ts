import { MutationTree } from 'vuex';
import { PropietarioStateInterface} from './state';

const mutation: MutationTree<PropietarioStateInterface> = {
  SET_FACTURAS (state: PropietarioStateInterface,payload:Array<any>) {
    state.facturas = payload
  },
  SET_TOTAL (state: PropietarioStateInterface,payload:String) {
    state.total = payload
  }
};

export default mutation;
