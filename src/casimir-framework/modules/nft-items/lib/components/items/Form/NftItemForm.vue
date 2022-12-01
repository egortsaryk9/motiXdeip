<template>
  <validation-observer 
    v-slot="{ handleSubmit, invalid }" 
    ref="observer"
    tag="div"
  >
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <ve-stack>
        <layout-renderer
          v-if="schema.length"
          v-model="formData"
          :key="forceUpdateKey"
          :schema="schema"
          :schema-data="schemaData"
        />

        <v-divider />

        <div class="d-flex">
          <v-spacer />
          <!-- <ve-stack flow="column" :gap="8"> -->
          <v-btn
            :disabled="loading || disabled"
            color="primary"
            text
            class="mr-2"
            @click="handleCancelClick"
          >
            {{ $t('module.nftItems.form.cancel') }}
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            depressed
            :disabled="disabled || untouched || invalid"
            :loading="loading"
          >
            {{ submitLabelText }}
          </v-btn>
          <!-- </ve-stack> -->
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>

  import { attributedFormFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { defineComponent } from '@/casimir-framework/all';
  import { ViewMode, NftItemMetadataDraftStatus } from '@/casimir-framework/vars';


  /**
   * NFT item form component
   */
  export default defineComponent({
    name: 'NftItemForm',

    components: {
      VeStack,
      LayoutRenderer
    },

    mixins: [attributedFormFactory('nftItem', 'nftItem')],

    props: {
      /**
       * Cancel label
       *
       * @example 'Cancel'
       */
      cancelLabel: {
        type: String,
        default() {
          return this.$t('module.nftItems.form.cancel');
        }
      },
      /**
       * Submit label
       *
       * @example 'Submit'
       */
      submitLabel: {
        type: String,
        default() {
          return null;
        }
      },
      /**
       * NFT collection info
       */
      nftCollectionId: {
        type: String,
        default: null
      },

      /**
       * Is moderation required
       */
      isModerationRequired: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isEditMode() { return this.mode === ViewMode.EDIT; },
      /**
       * Get computed submit label
       */
      submitLabelText() {
        if (this.submitLabel) {
          return this.submitLabel;
        }
        return this.isEditMode
          ? this.$t('module.nftItems.form.update')
          : this.$t('module.nftItems.form.create');
      }
    },

    methods: {
      /**
       * Triggers when user submits form
       *
       * @event submit
       */
      async onSubmit() {
        this.loading = true;

        if (!this.isEditMode) {
          await this.createNftItem();
        } else {
          await this.updateNftItem();
        }
        
        this.loading = false;
      },

      /**
       * Create NFT Item
       *
       * @param {Object} data
       */
      async createNftItem() {
        try {

          const status = this.isModerationRequired
            ? NftItemMetadataDraftStatus.PROPOSED
            : NftItemMetadataDraftStatus.APPROVED;

          const payload = {
            initiator: this.$currentUser,
            data: {
              nftCollectionId: this.nftCollectionId,
              ownerId: this.$currentUser._id,
              creatorId: this.$currentUser._id,
              status,
              ...this.lazyFormData
            }
          };

          const { _id } = await this.$store.dispatch('nftItems/create', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },
      /**
       * Update NFT Item
       *
       * @param {Object} data
       */
      async updateNftItem() {
        try {
          const payload = {
            initiator: this.$currentUser,
            data: this.lazyFormData
          };
          
          const { _id } = await this.$store.dispatch('nftItems/update', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },

      emitSuccess(_id) {
        /**
         * Success when succeeded
         */
        this.$emit('success', _id);
      },

      emitError(err) {
        /**
         * Triggers when error occurs
         *
         * @property {Error} err
         */
        this.$emit('error', err);
      },

      emitCancel() {
        /**
         * Triggers by clicking on cancel button
         */
        this.$emit('cancel');
      },
      /**
       * Handle cancel click
       *
       * @event click
       */
      handleCancelClick() {
        this.emitCancel();
      }
    }
  });
</script>
