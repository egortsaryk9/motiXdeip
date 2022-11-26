import { AttributesService } from '@/casimir-framework/services/Attributes';

import {
  listGetter,
  oneGetter,
  setListMutation,
  setOneMutation,
  removeFromListMutation,
  collectionOne,
} from '@/casimir-framework/all';

const TENANT = "6561845613164402145092105428472817005070";
const attributesService = AttributesService.getInstance();

const STATE = {
  data: [],
  settings: {}
};

const GETTERS = {
  list: listGetter,
  one: oneGetter,
  listByScopes: (state) => {
    const initialListByScopes = {
      project: [],
      team: [],
      user: []
    };

    return state.data.reduce((acc, current) => {
      acc[current.scope].push(current);
      return acc;
    }, initialListByScopes);
  },

  settings: (state) => state.settings,
  mappedId: (state) => (key) => collectionOne(state.settings.mappedKeys || [], { key })?.value
};

const ACTIONS = {
  async getList({ commit }) {
    const res = await attributesService.getList();
    commit('setList', res.data.items);
  },
  
  async getOne({ commit }, attributeId) {
    const res = await attributesService.getOne(attributeId);
    commit('setOne', res.data);
  },

  async create({ dispatch }, attribute) {
    await attributesService.create(attribute);
    dispatch('getList');
  },

  async update({ dispatch }, attribute) {
    await attributesService.update(attribute);
    dispatch('getList');
  },

  async remove({ commit }, attributeId) {
    await attributesService.delete(attributeId);
    commit('remove', attributeId);
  },

  async getMappings({ commit }) {
    // const res = await attributesService.getMappings(window.env.TENANT);
    const res = await attributesService.getMappings(TENANT);
    commit('setMappings', res.data);
  },

  async updateMappings({ dispatch }, payload) {
    await attributesService.updateMappings(payload);
    dispatch('getMappings');
  }
};

const MUTATIONS = {
  setList: setListMutation,
  setOne: setOneMutation,
  remove: removeFromListMutation,

  setMappings(state, payload) {
    state.settings = state.settings === null
      ? payload
      : {
        ...state.settings,
        ...payload
      };
  }
};

export const attributesStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
