import { NonFungibleTokenService } from '@/casimir-framework/services/Token';
import {
  listGetter,
  oneGetter,
  setListMutation,
  setOneMutation
} from '@/casimir-framework/all';

const nonFungibleTokenService = NonFungibleTokenService.getInstance();

const STATE = {
  data: []
};

const GETTERS = {
  list: listGetter,
  one: oneGetter
};

const ACTIONS = {
  getList({ dispatch }, payload = {}) {
    const {
      filter
    } = payload;

    return dispatch('getList', filter);
  },

  async getList({ commit }, filter = {}) {
    const res = await nonFungibleTokenService.getNftCollections(filter);
    commit('setList', res.data.items);
  },

  async getOne({ commit }, nftCollectionId) {
    const res = await nonFungibleTokenService.getNftCollection(nftCollectionId);
    commit('setOne', res.data);
  },

  async create({ dispatch }, payload) {
    const res = await nonFungibleTokenService.createNftCollection(payload);
    dispatch('getOne', res.data._id);
    return res.data;
  },

  async update({ dispatch }, payload) {
    const res = await nonFungibleTokenService.updateNftCollection(payload);
    dispatch('getOne', res.data._id);
    return res.data;
  }
};

const MUTATIONS = {
  setList: setListMutation,
  setOne: setOneMutation
};

export const nftCollectionsStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
