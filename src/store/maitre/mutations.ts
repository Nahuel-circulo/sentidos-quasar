import { MutationTree } from 'vuex';
import { MaitreStateInterface, Reservas } from './state';

const mutation: MutationTree<MaitreStateInterface> = {
  SET_RESERVAS (state: MaitreStateInterface,payload:Array<Reservas>) {
    state.reservas = payload
  }
};

export default mutation;
