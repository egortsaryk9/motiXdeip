import { PortalService } from '@/casimir-framework/services/Portal';
import { proxydi } from '@/casimir-framework/proxydi';

const portalService = PortalService.getInstance();

const STATE = {
  data: null
};

const GETTERS = {
  data: (state) => state.data
};

const ACTIONS = {
  get({ commit }) {
    return portalService.getPortal()
      .then((res) => {
        commit('setData', res.data);
      });
  },

  update({ commit }, payload) {
    return portalService.updatePortal(payload)
      .then((res) => {
        commit('setData', res.data);
      });
  }

};

const MUTATIONS = {
  setData(state, payload) {
    state.data = payload;
  }
};

export const currentPortalStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
