<template>
  <component :is="tag">
    <slot v-bind="slotProps" />
  </component>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';

  /**
   * NFT items data provider
   */
  export default defineComponent({
    name: 'NftItemDataProvider',
    props: {
      /**
       * Tag name
       * @example 'div'
       */
      tag: {
        type: String,
        default: 'div'
      },
      /**
       * NFT collection id
       */
      nftCollectionId: {
        type: String,
        required: true
      },
      /**
       * Filter for items
       */
      filterItems: {
        type: Object,
        default: () => ({})
      }
    },

    data() {
      return {
        loading: false,
        ready: false,
        disabled: false
      };
    },

    computed: {
      /**
       * Get computed filter for items
       */
      getterFilter() {
        const filter = { ...this.filterItems };

        if (this.nftCollectionId) {
          filter.nftCollectionId = this.nftCollectionId;
        }

        return filter;
      },
      /**
       * Get computed NFT items list
       */
      nftItems() {
        return this.$store.getters['nftItems/list'](this.getterFilter);
      },
      /**
       * Get computed slot properties
       */
      slotProps() {
        return {
          nftItems: this.nftItems,
          loading: this.loading,
          ready: this.ready,
          disabled: this.disabled
        };
      }
    },

    created() {
      this.getNftItems();
    },

    methods: {
      handleReady() {
        this.ready = true;
        /**
         * Triggers when the nftItems list is ready
         *
         * @property {Array.<Object>} nftItems
         */
        this.$emit('ready', this.nftItems);
      },
      /**
       * Get NFT items by NFT collection id
       */
      async getNftItems() {
        this.loading = true;

        const query = {
          page: 0,
          pageSize: 1000, // todo: add pagination
          filter: { nftCollectionId: this.nftCollectionId }
        };

        try {
          await this.$store.dispatch('nftItems/getListPaginated', query);
          this.handleReady();
        } catch (error) {
          console.error(error);
        }

        this.loading = false;
      }
    }
  });
</script>
