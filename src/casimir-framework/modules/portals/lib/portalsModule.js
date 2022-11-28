import { currentPortalStore } from './store';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { store } = options;

  if (store) {
    store.registerModule('currentPortal', currentPortalStore);
    store.dispatch('currentPortal/get');
    store.dispatch('currentPortal/getPortalCustomFields');

    Vue.mixin({
      computed: {
        $currentPortal() { return this.$store.getters['currentPortal/data']; },
        $portalCustomFields() { return this.$store.getters['currentPortal/customFields']; }
      }
    });
  } else {
    throw Error('[PortalsModule]: storeInstance is not provided');
  }
};

export const PortalsModule = {
  name: 'PortalsModule',
  deps: [
    'EnvModule'
  ],
  install
};
