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
          <v-btn
            :disabled="loading || disabled"
            color="primary"
            text
            class="mr-2"
            @click="handleCancelClick"
          >
            {{ cancelLabel }}
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            :disabled="disabled || untouched || invalid"
            :loading="loading"
          >
            {{ submitLabelText }}
          </v-btn>
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
   * NFT item Form component
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
       * The 'Cancel' button label
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
       * The 'Submit' button label
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
       * NFT Collection info
       */
      nftCollectionId: {
        type: String,
        default: null
      },

      /**
       * Is moderation step required
       */
      isModerationRequired: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isEditMode() { 
        return this.mode === ViewMode.EDIT; 
      },

      /**
       * Get computed label for the 'Submit' button
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
       * Triggers when the form is submitted
       *
       * @event success
       * @event error
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
       * @event success
       * @event error
       */
      async createNftItem() {
        try {
          const payload = {
            initiator: this.$currentUser,
            data: {
              nftCollectionId: this.nftCollectionId,
              ownerId: this.$currentUser._id,
              creatorId: this.$currentUser._id,
              status: this.isModerationRequired
                ? NftItemMetadataDraftStatus.PROPOSED
                : NftItemMetadataDraftStatus.APPROVED,
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
       * @event success
       * @event error
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

      /**
       * Triggers when submission is succeeded
       * 
       * @param {string} _id
       * @event success
       */
      emitSuccess(_id) {
        this.$emit('success', _id);
      },

      /**
       * Triggers when submission is failed
       * 
       * @param {Error} err
       * @event error
       */
      emitError(err) {
        this.$emit('error', err);
      },

      /**
       * Triggers when the 'Cancel' button is clicked
       * 
       * @event cancel
       */
      emitCancel() {
        this.$emit('cancel');
      },

      /**
       * Handle cancelation
       */
      handleCancelClick() {
        this.emitCancel();
      }
    }
  });
</script>
