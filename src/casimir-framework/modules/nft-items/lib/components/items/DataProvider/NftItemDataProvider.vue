<template>
  <div>
    <component :is="tag">
      <slot v-bind="slotProps" />
    </component>
    <infinite-loading :identifier="infiniteScrollId" @infinite="getList">
      <template #spinner>
        <v-progress-circular
          indeterminate
          class="my-8"
        />
      </template>

      <template #no-results class="my-8">
        {{ $t('module.nftItems.list.noResults') }}
      </template>
    </infinite-loading>
  </div>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import InfiniteLoading from 'vue-infinite-loading';

  /**
   * NFT items data provider
   */
  export default defineComponent({
    name: 'NftItemDataProvider',
    components: {
      InfiniteLoading
    },
    props: {
      /**
       * Tag name
       */
      tag: {
        type: String,
        default: 'div'
      },

      /** Page size */
      pageSize: {
        type: Number,
        default: 10
      },

      /** Filter */
      filter: {
        type: Object,
        default: undefined
      },

      /** Sort */
      sort: {
        type: Object,
        default: undefined
      }
    },

    data() {
      return {
        loading: false,
        list: [],
        page: 0,
        infiniteScrollId: `items-list-${new Date().getTime()}`
      };
    },

    computed: {
      /**
       * Get computed binding slot properties
       */
      slotProps() {
        return {
          nftItems: this.list,
          loading: this.loading
        };
      }
    },

    watch: {
      filter() {
        this.resetInfiniteScroll();
      },
      sort() {
        this.resetInfiniteScroll();
      }
    },

    methods: {
      /**
       * Get users list
       * @param {Object} scrollState
       * @param {Function} scrollState.loaded
       * @param {Function} scrollState.complete
       * @param {Function} scrollState.error
       * @param {Function} scrollState.reset
       */
      async getList(scrollState) {
        const query = {
          page: this.page,
          pageSize: this.pageSize
        };

        if (this.filter) query.filter = this.filter;
        if (this.sort) query.sort = this.sort;

        try {

          this.loading = true;
          const { items } = await this.$store.dispatch('nftItems/getList', query);
          if (items.length) {
            this.list = this.list.concat(items);
            this.page++;

            scrollState.loaded();
          } else {
            scrollState.complete();
          }

          this.loading = false;
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
      },

      /** Reset infinite scroll */
      resetInfiniteScroll() {
        this.page = 0;
        this.list = [];
        this.infiniteScrollId = `items-list-${new Date().getTime()}`;
      }
    }

  });
</script>
