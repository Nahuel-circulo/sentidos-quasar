import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { MaitreStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const maitreModule: Module<MaitreStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default maitreModule;
