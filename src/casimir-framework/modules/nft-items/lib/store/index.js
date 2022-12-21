import { NonFungibleTokenService } from '@/casimir-framework/services/Token';

import {
  listGetter,
  oneGetter,
  setListMutation,
  setOneMutation,
  removeFromListMutation
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
  async getList({ commit }, query) {
    const res = await nonFungibleTokenService.getNftItems(query);
    commit('setList', res.data.items);
    return res.data;
  },

  async getOne({ commit }, id) {
    const res = await nonFungibleTokenService.getNftItem(id);
    commit('setOne', res.data);
  },

  async create(_, payload) {
    const res = await nonFungibleTokenService.createNftItem(payload);
    return res.data;
  },

  async update(_, payload) {
    const res = await nonFungibleTokenService.updateNftItem(payload);
    return res.data;
  },

  async remove({ commit }, payload) {
    const res = await nonFungibleTokenService.deleteNftItem(payload);
    commit('remove', res.data._id);
  },

  async moderate(_, payload) {
    const res = await nonFungibleTokenService.moderateNftItem(payload);
    return res.data;
  }
};

const MUTATIONS = {
  setList: setListMutation,
  setOne: setOneMutation,
  remove: removeFromListMutation
};

export const nftItemsStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
