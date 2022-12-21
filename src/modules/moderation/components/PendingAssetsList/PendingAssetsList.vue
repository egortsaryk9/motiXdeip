<template>
  <ve-stack class="mt-4">
    <nft-items-list 
     :filter="filter"
     :sort="sort"
    >
      <template v-slot:default="{nftItems}">
        <ve-auto-grid
          cols="1"
        >
          <nft-item-moderation-card
            v-for="asset in nftItems"
            :key="asset._id"
            :nft-item="asset"
            title-attribute-key="nftItem.title"
            :success-approve-message="$t('moderation.pendingAssets.approveSuccess')"
            :success-decline-message="$t('moderation.pendingAssets.declineSuccess')"
          />
        </ve-auto-grid>
      </template>
    </nft-items-list>
  </ve-stack>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { NftItemsList, NftItemModerationCard } from '@/casimir-framework/modules/nft-items';
  import { VeAutoGrid, VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'PendingAssetsList',

    components: {
      NftItemModerationCard,
      NftItemsList,
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
