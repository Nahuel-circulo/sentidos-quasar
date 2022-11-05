import { MutationTree } from 'vuex';
import { MozoStateInterface, Pedido, Producto, Reservas } from './state';

const mutation: MutationTree<MozoStateInterface> = {
  SET_RESERVAS (state: MozoStateInterface,payload:Array<Reservas>) {
    state.reservas = payload
  },
  SET_PRODUCTOS (state: MozoStateInterface,payload:Array<Producto>) {
    state.productos = payload
  }
  ,
  SET_PEDIDOS (state: MozoStateInterface,payload:Array<Pedido>) {
    state.pedidos = payload
  }
};

export default mutation;
