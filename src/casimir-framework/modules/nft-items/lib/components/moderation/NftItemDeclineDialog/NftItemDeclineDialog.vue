<template>
  <vex-dialog
    v-model="isDialogOpen"
    width="600"
    :disabled="loading"
    :title="dialogTitle"
    @click:confirm="handleConfirmClick"
    @click:cancel="handleCancelClick"
  >
    <ve-stack>
      <span>
        {{ $t('module.nftItems.moderation.declineDialog.message',{ title: nftItemTitle }) }}
      </span>

      <v-text-field
        v-model="reason"
        :label="$t('module.nftItems.moderation.declineDialog.reason')"
      />
    </ve-stack>
  </vex-dialog>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { VexDialog } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';

  /** Decline NFT item on moderation dialog */
  export default {
    name: 'NftItemDeclineDialog',

    components: {
      VexDialog,
      VeStack
    },

    props: {
      /**
       * Is dialog opened value
       * @model
       */
      value: {
        type: Boolean,
        default: false
      },
      /** NFT item */
      nftItem: {
        type: Object,
        default: null
      },
      nftItemTitle: {
        type: String,
        default: ''
      },
      /** Successful decline message */
      successMessage: {
        type: String,
        default() {
          return this.$t('module.nftItems.moderation.declineDialog.declineSuccess');
        }
      }
    },

    data() {
      return {
        reason: null,
        loading: false
      };
    },

    computed: {
      /** Is dialog opened */
      isDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.reason = null;
          /** Value change  */
          this.$emit('input', value);
        }
      },

      /** Dialog title */
      dialogTitle() {
        return this.$t('module.nftItems.moderation.declineDialog.title');
      }
    },

    methods: {
      /** Close dialog */
      closeDialog() {
        this.isDialogOpen = false;
      },

      /** Handle cancel button click */
      handleCancelClick() {
        this.closeDialog();
      },

      /** Handle confirm button click */
      handleConfirmClick() {
        this.declineNftItem();
      },

      /**
       * Set loading
       * @param {boolean} value
       */
      setLoading(value) {
        this.loading = value;
      },

      /** Decline NFT item */
      async declineNftItem() {
        this.setLoading(true);

        try {
          const payload = {
            data: {
              _id: this.nftItem._id,
              status: NftItemMetadataDraftStatus.REJECTED,
              moderationMessage: this.reason
            }
          };

          await this.$store.dispatch('nftItems/moderate', payload);

          /**
           * NFT item declined successfully
           * @event success
           */
          this.$emit('success', this.nftItem);
          this.closeDialog();
          this.$notifier.showSuccess(this.successMessage);
        } catch (error) {
          console.error(error?.error || error);
          this.$notifier.showError(error?.error?.message || error);
        }

        this.setLoading(false);
      }
    }
  };
</script>
