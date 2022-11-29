<template>
  <ve-stack class="mt-4">
    <div class="d-flex justify-end">
  
    </div>

    <nft-items-infinite-scroll
      v-slot="{list}"
      :filter="filter"
      :sort="sort"
      class="py-6"
    >
      <ve-auto-grid
        cols="1"
      >
        <nft-item-moderation-card
          v-for="asset in list"
          :key="asset._id"
          :nft-item="asset"
          title-attribute-key="nftItem.title"
          :success-approve-message="$t('moderation.pendingAssets.approveSuccess')"
          :success-decline-message="$t('moderation.pendingAssets.declineSuccess')"
        />
      </ve-auto-grid>
    </nft-items-infinite-scroll>
  </ve-stack>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { NftItemsInfiniteScroll, NftItemModerationCard } from '@/casimir-framework/modules/nft-items';
  import { VeAutoGrid, VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'PendingAssetsList',

    components: {
      NftItemModerationCard,
      NftItemsInfiniteScroll,
      VeAutoGrid,
      VeStack
    },

    data() {
      return {
        filter: {
          status: NftItemMetadataDraftStatus.PROPOSED
        },
        sort: { queueNumber: 'asc' },
      };
    }
  };
</script>
