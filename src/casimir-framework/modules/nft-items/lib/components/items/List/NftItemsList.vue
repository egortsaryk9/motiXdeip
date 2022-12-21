<template>
  <nft-items-data-provider
    v-bind="providerProps"
  >
    <template #default="{nftItems, loading}">
      <slot 
        v-bind:nftItems="nftItems"
        v-bind:loading="loading"
      />
    </template>
  </nft-items-data-provider>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';

  import NftItemsDataProvider from '../DataProvider';

  /**
   * Component for NFT item list
   */
  export default defineComponent({
    name: 'NftItemsList',

    components: {
      NftItemsDataProvider
    },

    props: {
      ...NftItemsDataProvider.options.props,
    },

    computed: {
      /**
       * Get computed provider properties
       */
      providerProps() {
        return getBindableProps.call(this, NftItemsDataProvider.options.props);
      }
    }
  });
</script>
