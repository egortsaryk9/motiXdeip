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
  import { ViewMode } from '@/casimir-framework/vars';


  /**
   * NFT Collection form component
   */
  export default defineComponent({
    name: 'NftCollectionForm',

    components: {
      VeStack,
      LayoutRenderer
    },

    mixins: [attributedFormFactory('nftCollection', 'nftCollection')],

    props: {
      /**
       * Cancel label
       *
       * @example 'Cancel'
       */
      cancelLabel: {
        type: String,
        default() {
          return this.$t('module.nftCollections.form.cancel');
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
      }
    },

    computed: {
      isEditMode() { return this.mode === ViewMode.EDIT; },
      /**
       * Get computed text for submit label
       */
      submitLabelText() {
        if (this.submitLabel) {
          return this.submitLabel;
        }
        return !this.isEditMode
          ? this.$t('module.nftCollections.form.create')
          : this.$t('module.nftCollections.form.update');
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
          await this.createNftCollection();
        } else {
          await this.updateNftCollection();
        }

        this.loading = false;
      },

      /**
       * Create NFT collection
       */
      async createNftCollection() {
        const payload = {
          initiator: this.$currentUser,
          data: {
            ownerId: this.$currentUser._id,
            ...this.lazyFormData
          }
        };

        try {
          const { _id } = await this.$store.dispatch('nftCollections/create', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },

      /**
       * Update NFT collection
       */
      async updateNftCollection() {
        const payload = {
          initiator: this.$currentUser,
          data: this.lazyFormData
        };

        try {
          const { _id } = await this.$store.dispatch('nftCollections/update', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },

      emitSuccess(_id) {
        /**
         * Success event
         *
         * @property {string} id
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

      handleCancelClick() {
        this.emitCancel();
      }
    }
  });
</script>
