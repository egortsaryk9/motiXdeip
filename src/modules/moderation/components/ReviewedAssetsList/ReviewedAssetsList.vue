<template>
  <ve-stack class="mt-4">
    <div class="d-flex justify-end">
      <v-select
        v-model="status"
        :label="$t('moderation.reviewedAssets.filter.label')"
        :items="statuses"
        class="status-select"
        hide-details
      />
    </div>

    <nft-items-list>
      <template v-slot:default="{nftItems}">
        <ve-auto-grid
          cols="1"
        >
          <asset-card
            v-for="asset in nftItems"
            :key="asset._id"
            :asset="asset"
            add-assets-details-modal
          />
        </ve-auto-grid>
      </template>
    </nft-items-list>

  </ve-stack>
</template>

<script>
  import { VeStack, VeAutoGrid } from '@/casimir-framework/vue-elements';
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { NftItemsList } from '@/casimir-framework/modules/nft-items';

  import { AssetCard } from '@/components';

  export default {
    name: 'ReviewedAssetsList',

    components: {
      VeStack,
      VeAutoGrid,
      AssetCard,
      NftItemsList
    },

    data() {
      const statuses = [
        {
          text: this.$t('moderation.reviewedAssets.filter.showAll'),
          value: {
            $in: [NftItemMetadataDraftStatus.APPROVED,
                  NftItemMetadataDraftStatus.REJECTED]
          }
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.approved'),
          value: NftItemMetadataDraftStatus.APPROVED
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.denied'),
          value: NftItemMetadataDraftStatus.REJECTED
        }
      ];

      return {
        statuses,
        status: statuses[0].value,
        sort: { queueNumber: 'asc' }
      };
    },

    computed: {
      filter() {
        return {
          status: this.status
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .status-select {
    max-width: 200px;
  }
</style>
