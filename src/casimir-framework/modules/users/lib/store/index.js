import { UserService } from '@/casimir-framework/services/User';
import {
  listGetter,
  oneGetter,
  setListMutation,
  setOneMutation
} from '@/casimir-framework/all';

const userService = UserService.getInstance();

const STATE = {
  data: []
};

const GETTERS = {
  list: listGetter,
  one: oneGetter
};

const ACTIONS = {

  async getOne({ commit }, id) {
    const res = await userService.getOne(id);
    commit('setOne', res.data);
  },

  async getListPaginated({ commit }, query) {
    const res = await userService.getListPaginated(query);
    commit('setList', res.data.items);
    return res.data;
  },

  async create({ dispatch, rootGetters }, payload) {
    const res = await userService.create(payload);
    const { _id } = res.data;
    if (rootGetters['auth/_id'] === _id) {
      dispatch('currentUser/get', _id, { root: true });
    }
    return res.data;
  },

  async update({ dispatch, rootGetters }, payload) {
    const res = await userService.update(payload);
    const { _id } = res.data;
    if (rootGetters['auth/_id'] === _id) {
      dispatch('currentUser/get', _id, { root: true });
    }
    return res.data;
  },

};

const MUTATIONS = {
  setList: setListMutation,
  setOne: setOneMutation
};

export const usersStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
