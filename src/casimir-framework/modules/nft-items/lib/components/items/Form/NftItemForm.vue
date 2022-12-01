<template>
  <validation-observer v-slot="{ invalid, handleSubmit }" ref="observer">
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(submit)"
    >
      <ve-stack :gap="24">
        <layout-renderer
          :value="nftItem"
          :schema="internalSchema"
          :schema-data="internalSchemaData"
        />

        <v-divider />

        <div class="d-flex align-center">
          <v-spacer />
          <ve-stack flow="column" :gap="8">
            <v-btn
              color="primary"
              text
              :disabled="loading || disabled"
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
              {{ submitLabel }}
            </v-btn>
          </ve-stack>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>
  import { defineComponent, formFactory } from '@/casimir-framework/all';

  import { VeStack } from '@/casimir-framework/vue-elements';
  import { AttributeScope, NFT_ITEM_METADATA_FORMAT } from '@/casimir-framework/vars';
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';


  /**
   * NFT item form component
   */
  export default defineComponent({
    name: 'NftItemForm',

    components: {
      VeStack,
      LayoutRenderer
    },

    mixins: [formFactory('nftItem'), attributedDetailsFactory('nftItem')],

    props: {
      nftItem: {
        type: Object,
        default: () => {}
      },
      /**
       * NFT collection info
       */
      nftCollection: {
        type: Object,
        default: () => {}
      }
    },

    data() {
      return {
        filesInputLoading: false,
        NFT_ITEM_METADATA_FORMAT
      };
    },

    computed: {
      internalSchemaData() {
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.nftItem),
            {
              scopeName: AttributeScope.NFT_ITEM,
              scopeId: {
                nftItemId: this.nftItem._id,
                nftCollectionId: this.nftItem.nftCollectionId
              }
            }
          ),
          ...this.schemaData
        };
      },
      /**
       * Get computed submit label
       */
      submitLabel() {
        return this.isEditMode
          ? this.$t('module.nftItems.form.update')
          : this.$t('module.nftItems.form.create');
      },

      /**
       * Get team
       */
      team() {
        return this.$store.getters['teams/one'](this.nftCollection.ownerId);
      }
    },

    methods: {

      /**
       * Create NFT Item
       *
       * @param {Object} data
       */
      async createNftItem(data) {
        try {
          const payload = {
            initiator: this.$currentUser,
            data
          };
          await this.$store.dispatch('nftItems/create', payload);
          this.emitSuccess();
        } catch (err) {
          console.error(err);
        }
      },
      /**
       * Update nftItem
       *
       * @param {Object} data
       */
      async updateNftItem(data) {
        try {
          const payload = {
            initiator: this.$currentUser,
            data: { ...this.nftItem, ...data }
          }
          await this.$store.dispatch('nftItems/update', payload);
          this.emitSuccess();
        } catch (err) {
          console.error(err);
        }
      },
      /**
       * Triggers when user submits form
       *
       * @event submit
       */
      async submit() {
        this.loading = true;
        const data = {
          nftCollectionId: this.nftCollection._id,
          ownerId: this.nftCollection.ownerId,
          creatorId: this.nftCollection.ownerId,
        };

        if (this.isEditMode) {
          await this.updateNftItem(data);
        } else {
          await this.createNftItem(data);
        }
        this.loading = false;
      },

      emitSuccess() {
        /**
         * Success event
         */
        this.$emit('success');
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
