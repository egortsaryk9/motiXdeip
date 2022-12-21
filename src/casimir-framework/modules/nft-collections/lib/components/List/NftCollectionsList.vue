<template>
  <nft-collections-data-provider
    v-bind="providerProps"
  >
    <template #default="{nftCollections, loading}">
      <slot 
        v-bind:nftCollections="nftCollections"
        v-bind:loading="loading"
      />
    </template>
  </nft-collections-data-provider>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';
  import NftCollectionsDataProvider from '../DataProvider';

  /**
   * NFT items list component
   */
  export default defineComponent({
    name: 'NftCollectionsList',

    components: {
      NftCollectionsDataProvider
    },

    props: {
      ...NftCollectionsDataProvider.options.props
    },

    computed: {
      /**
       * Get computed provider properties
       */
      providerProps() {
        return getBindableProps.call(this, NftCollectionsDataProvider.options.props);
      }
    }

  });
</script>
