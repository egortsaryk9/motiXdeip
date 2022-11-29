<template>
  <div>
    <v-card outlined>
      <router-link
        :to="{ name: 'assetDetails', params: { assetId: nftItem._id } }"
        class="text-decoration-none"
      >
        <layout-renderer
          :value="nftItem"
          :schema="cardSchema"
          :schema-data="cardSchemaData"
        />
      </router-link>

      <ve-stack :gap="8" flow="column" class="align-end justify-end ma-4">
        <v-btn
          text
          outlined
          small
          :disabled="disabled"
          @click="handleDeclineClick"
        >
          {{ $t('module.nftItems.moderation.card.decline') }}
        </v-btn>
        <v-btn
          color="primary"
          small
          :disabled="disabled"
          @click="handleApproveClick"
        >
          {{ $t('module.nftItems.moderation.card.approve') }}
        </v-btn>
      </ve-stack>
    </v-card>

    <nft-item-decline-dialog
      v-if="isDeclineDialogOpened"
      v-model="isDeclineDialogOpened"
      :nft-item="nftItem"
      :nft-item-title="itemTitle"
      :success-message="successDeclineMessage"
      @success="handleDeclineSuccess"
    />
  </div>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';

  import { dateMixin } from '@/casimir-framework/all';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';
  import { NftItemDeclineDialog } from '../NftItemDeclineDialog';

  /**
   * NFT item moderation card
   */
  export default {
    name: 'NftItemModerationCard',

    components: {
      VeStack,
      LayoutRenderer,
      NftItemDeclineDialog
    },

    mixins: [dateMixin, attributedDetailsFactory('nftItem')],

    props: {
      /** NFT item */
      nftItem: {
        type: Object,
        required: true
      },

      titleAttributeKey: {
        type: String,
        default: null
      },

      /** Message to show in notification after success approve */
      successApproveMessage: {
        type: String,
        default() { return this.$t('module.nftItems.moderation.card.approveSuccess'); }
      },

      /** Message to show in notification after success decline */
      successDeclineMessage: {
        type: String,
        default() {
          return this.$t('module.nftItems.moderation.declineDialog.declineSuccess');
        }
      }
    },

    data() {
      return {
        isDeclineDialogOpened: false,
        loading: false,
        disabled: false
      };
    },

    computed: {
      itemTitle() {
        const isAttributeName = this.$attributes.getMappedData(
          this.titleAttributeKey,
          this.nftItem.attributes
        )?.value;
        return isAttributeName ? ` ${isAttributeName}` : '';
      },
      cardSchema() {
        return this.$layouts.getMappedData('nftItem.moderation')?.value;
      },
      cardSchemaData() {
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.nftItem),
            {
              scopeName: 'nftItem',
              scopeId: {
                nftItemId: this.nftItem.nftItemId,
                nftCollectionId: this.nftItem.nftCollectionId
              }
            }
          ),
          ...this.schemaData
        };
      }
    },

    methods: {
      /** Handle decline button click */
      handleDeclineClick() {
        this.isDeclineDialogOpened = true;
      },

      /** Disable buttons after decline */
      handleDeclineSuccess() {
        this.setDisabled(true);
      },

      /**
       * Set disabled
       * @param {boolean} value
       */
      setDisabled(value) {
        this.disabled = value;
      },

      /** Handle approve button click */
      async handleApproveClick() {
        const isConfirmed = await this.$confirm(
          this.$t('module.nftItems.moderation.card.approveConfirm.message', { title: this.itemTitle }),
          {
            title: this.$t('module.nftItems.moderation.card.approveConfirm.title')
          }
        );

        if (isConfirmed) {
          await this.approveNftItem();
        }
      },

      /** Approve NFT item */
      async approveNftItem() {
        try {
          const payload = {
            data: {
              _id: this.nftItem._id,
              status: NftItemMetadataDraftStatus.APPROVED
            }
          };

          await this.$store.dispatch('nftItems/moderate', payload);
          this.$notifier.showSuccess(this.successApproveMessage);
          this.setDisabled(true);
        } catch (err) {
          console.error(err);
          this.$notifier.showError('An error occured while approving, please try again later');
        }
      }
    }
  };
</script>
