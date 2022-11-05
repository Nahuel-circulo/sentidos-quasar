import { MutationTree } from 'vuex';
import { PropietarioStateInterface} from './state';

const mutation: MutationTree<PropietarioStateInterface> = {
  SET_FACTURAS (state: PropietarioStateInterface,payload:Array<any>) {
    state.facturas = payload
  }
};

export default mutation;
