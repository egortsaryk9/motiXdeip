import { AttributesService } from '@/casimir-framework/services/Attributes';

import {
  listGetter,
  oneGetter,
  setListMutation,
  setOneMutation,
  removeFromListMutation,
  collectionOne,
} from '@/casimir-framework/all';


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
  async getList({ commit }, query) {
    const res = await attributesService.getList(query);
    commit('setList', res.data.items);
    return res.data;
  },
  
  async getOne({ commit }, attributeId) {
    const res = await attributesService.getOne(attributeId);
    commit('setOne', res.data);
    return res.data;
  },

  async create({ dispatch }, attribute) {
    await attributesService.create(attribute);
    dispatch('getList');
    return res.data;
  },

  async update({ dispatch }, attribute) {
    await attributesService.update(attribute);
    dispatch('getList');
    return res.data;
  },

  async remove({ commit }, attributeId) {
    await attributesService.delete(attributeId);
    commit('remove', attributeId);
    return res.data;
  },

  async getMappings({ commit }) {
    const res = await attributesService.getMappings(window.env.TENANT);
    commit('setMappings', res.data);
    return res.data;
  },

  async updateMappings({ dispatch }, payload) {
    await attributesService.updateMappings(payload);
    dispatch('getMappings');
    return res.data;
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
