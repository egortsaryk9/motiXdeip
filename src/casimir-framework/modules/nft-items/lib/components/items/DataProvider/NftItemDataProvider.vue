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
  import { defineComponent, dataProviderFactory } from '@/casimir-framework/all';

  /**
   * NFT items data provider
   */
  export default defineComponent({
    name: 'NftItemDataProvider',

    mixins: [dataProviderFactory('nftItems/getList', `items-list-${new Date().getTime()}`)],
  
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
    }

  });
</script>
