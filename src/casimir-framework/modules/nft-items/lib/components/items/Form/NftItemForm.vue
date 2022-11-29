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

  // import { AccessService } from '@casimir.one/access-service';

  // const accessService = AccessService.getInstance();

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
                nftItemId: this.nftItem.nftItemId,
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

    async created() {
      this.setExistingFiles();
    },

    methods: {
      /**
       * Get Nft item nftItem url by file hash
       *
       * @param {string} fileHash
       */
      getContentUrl(fileHash) {
        const { DEIP_SERVER_URL } = this.$env;
        // return `${DEIP_SERVER_URL}/api/v2/nft-items/package/${this.nftItem._id}/
        // ${fileHash}?download=true&authorization=${accessService.getAccessToken()}`;
        return `${DEIP_SERVER_URL}/api/v2/nft-items/package/${this.nftItem._id}/${fileHash}?download=true}`;
      },
      /**
       * Set form data files
       */
      async setExistingFiles() {
        if (this.formData.packageFiles?.length > 0) {
          this.filesInputLoading = true;

          try {
            this.formData.files = await Promise.all(this.formData.packageFiles.map(async (file) => {
              const res = await fetch(this.getContentUrl(file.hash));
              return new File([res.blob()], file.filename);
            }));
          } catch (error) {
            console.error('Failed to upload files', error);
          }
          this.filesInputLoading = false;
        }
      },
      /**
       * Create nftItem
       *
       * @param {Object} data
       */
      async createNftItem(data) {
        try {
          await this.$store.dispatch('nftItems/create', { data });
          this.emitSuccess();
        } catch (error) {
          console.error(error);
        }
      },
      /**
       * Update nftItem
       *
       * @param {Object} data
       */
      async updateNftItem(data) {
        try {
          await this.$store.dispatch('nftItems/update',{ data: { ...this.nftItem, ...data } });
          this.emitSuccess();
        } catch (error) {
          console.error(error);
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
          title: this.formData.title,
          authors: this.formData.authors,
          ownerId: this.nftCollection.ownerId,
          formatType: this.formData.formatType,
          nftItemId: this.nftCollection.nextNftItemId
        };

        if (this.formData.formatType === NFT_ITEM_METADATA_FORMAT.JSON) {
          data.jsonData = this.formData.jsonData;
        } else if (this.formData.formatType === NFT_ITEM_METADATA_FORMAT.PACKAGE) {
          data.files = this.formData.files;
        }

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
