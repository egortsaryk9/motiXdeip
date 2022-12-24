import { LayoutService } from '@/casimir-framework/services/Layout';

import {
  listGetterFactory,
  oneGetterFactory,
  setListMutationFactory,
  setOneMutationFactory,
  removeFromListMutationFactory,
  clearMutationFactory,
  collectionOne
} from '@/casimir-framework/all';


const layoutService = LayoutService.getInstance();

const STATE = {
  data: [],
  settings: {}
};

const GETTERS = {
  list: listGetterFactory(),
  one: oneGetterFactory(),

  settings: (state) => state.settings,
  mappedId: (state) => (key) => collectionOne(state.settings.mappedKeys || [], { key })?.value
};

const ACTIONS = {

  async getList({ commit }, query) {
    const res = await layoutService.getList(query);
    commit('setList', res.data.items);
    return res.data;
  },

  async getOne({ commit }, _id) {
    const res = await layoutService.getOne(_id);
    commit('setOne', res.data);
    return res.data;
  },

  async create({ dispatch }, payload) {
    const res = await layoutService.create(payload);
    dispatch('getList');
    return res.data;
  },

  async update({ dispatch }, payload) {
    const { _id } = payload;
    const res = await layoutService.update(payload)
    dispatch('getOne', _id);
    return res.data;
  },

  async remove({ commit }, payload) {
    const { _id } = payload;
    const res = await layoutService.remove(_id);
    commit('removeFromList', _id);
    return res.data;
  },

  async getMappings({ commit }) {
    const res = await layoutService.getMappings(this._vm.$env.TENANT);
    commit('setSettings', res.data);
    return res.data;
  },

  async updateMappings({ dispatch }, payload) {
    const res = await layoutService.updateMappings(payload);
    dispatch('getMappings');
    return res.data;
  }
};

const MUTATIONS = {
  setList: setListMutationFactory(),
  setOne: setOneMutationFactory(),
  removeFromList: removeFromListMutationFactory(),
  clearList: clearMutationFactory(),

  setSettings(state, payload) {
    state.settings = state.settings === null
      ? { ...payload }
      : {
        ...state.settings,
        ...payload
      };
  }
};

export const layoutsStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
