import { PortalService } from '@/casimir-framework/services/Portal';
import { proxydi } from '@/casimir-framework/proxydi';

const portalService = PortalService.getInstance();

const STATE = {
  data: null,
  customFields: null
};

const GETTERS = {
  data: (state) => state.data,
  customFields: (state) => state.customFields || {}
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
  },

  getPortalCustomFields({ commit }) {
    return portalService.getPortalCustomFields()
      .then((res) => {
        commit('setCustomFields', res.data);
      });
  },

  updatePortalCustomFields({ commit }, payload) {
    return portalService.updatePortalCustomFields(payload)
      .then((res) => {
        commit('setCustomFields', res.data);
      });
  },

};

const MUTATIONS = {
  setData(state, payload) {
    state.data = payload;
  },
  
  setCustomFields(state, payload) {
    state.customFields = payload;
  }
};

export const currentPortalStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
