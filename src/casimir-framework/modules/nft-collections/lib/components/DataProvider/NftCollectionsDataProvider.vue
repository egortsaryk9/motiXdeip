<template>
  <component :is="tag">
    <!--
      @slot
      @binding {Object} slotProps
    -->
    <slot v-bind="slotProps" />
  </component>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';

  export default defineComponent({
    name: 'NftCollectionsDataProvider',
    props: {
      /**
       * Tag name
       */
      tag: {
        type: String,
        default: 'div'
      },
      /**
       * NFT collections ids list
       */
      ids: {
        type: Array,
        default: null
      },
      /**
       * Owner Id
       */
      ownerId: {
        type: String,
        default: null
      },
      /**
       * Filter for items
       */
      filterItems: {
        type: Object,
        default: undefined
      }
    },

    data() {
      return {
        loading: false,
        ready: false
      };
    },

    computed: {
      /**
       * Get computed filter for items
       */
      getterFilter() {
        const filter = {
          ...this.filterItems
        };

        if (this.ids && this.ids.length) filter['+_id'] = this.ids;
        if (this.ownerId) filter.ownerId = this.ownerId;

        return filter;
      },

      /**
       * Get computed NFT collection list
       */
      nftCollectionsList() {
        return this.$store.getters['nftCollections/list'](this.getterFilter);
      },

      /**
       * Get computed binding slot properties
       */
      slotProps() {
        return {
          nftCollections: this.nftCollectionsList,
          loading: this.loading,
          ready: this.ready
        };
      }
    },

    created() {
      this.loadNftCollections();
    },

    methods: {
      /**
       * Load NFT collections list
       */
      loadNftCollections() {
        this.loading = true;

        const {
          ids,
          ownerId,
          filterItems,
        } = this;

        const payload = {
          ids,
          ownerId,
          ...filterItems
        };
        
        this.$store.dispatch('nftCollections/getList', payload)
          .then(() => {

            this.loading = false;
            this.ready = true;

            /**
             * Triggers when NFT collections list is ready
             *
             * @property {Array.<Object>}
             */
            this.$emit('ready', this.nftCollectionsList);
          });
      }
    }
  });
</script>
