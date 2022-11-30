import { proxydi } from '@/casimir-framework/proxydi';

const GETTERS = {
  isModerationRequired: (state) => {
    const isRequired = state.currentPortal.data?.settings.nftModeration.isRequired;
    return isRequired;
  },

  isModerator: (state) => {
    const moderators = state.currentPortal.data?.settings.nftModeration.moderators;
    return state.getters.isModerationRequired && moderators ? !!moderators.length : false;
  },

  activeNftCollection: (state) => {
    const activeNftCollectionId = state.currentPortal.customFields?.activeNftCollectionId;
    if (!activeNftCollectionId) return null;
    return state.nftCollections.data
      .find((nftCollection) => nftCollection._id === activeNftCollectionId);
  }
};

const ACTIONS = {
  async getActiveNftCollection({ rootGetters, dispatch }) {
    const customFields = rootGetters['currentPortal/customFields'];
    if (customFields.activeNftCollectionId) {
      dispatch('nftCollections/getOne', customFields.activeNftCollectionId);
    }
  }
};

export const store = {
  getters: GETTERS,
  actions: ACTIONS
};
