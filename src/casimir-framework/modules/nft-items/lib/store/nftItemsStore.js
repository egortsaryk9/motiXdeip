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
  async getListPaginated({ commit }, query) {
    const res = await nonFungibleTokenService.getNftItemsListPaginated(query);
    commit('setList', res.data.items);
    return res.data;
  },

  async getOne({ commit }, id) {
    const res = await nonFungibleTokenService.getNftItem(id);
    commit('setOne', res.data);
  },

  async create(_, payload) {
    return nonFungibleTokenService.createNftItem(payload);
  },

  async update(_, payload) {
    return nonFungibleTokenService.updateNftItem(payload);
  },

  async remove({ commit }, id) {
    await nonFungibleTokenService.deleteNftItem(id);
    commit('remove', id);
  },

  moderate(_, payload) {
    return nonFungibleTokenService.moderateNftItem(payload);
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
