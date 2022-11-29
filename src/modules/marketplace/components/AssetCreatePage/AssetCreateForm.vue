<template>
  <validation-observer
    v-slot="{ invalid, handleSubmit }"
    ref="validationObserver"
  >
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(submit)"
    >
      <ve-stack>
        <layout-renderer
          v-if="formSchema"
          :key="forceUpdateKey"
          v-model="formData"
          :schema="formSchema"
          :schema-data="schemaData"
        />

        <validation-provider
          v-slot="{ errors }"
          :name="$t('marketplace.createAsset.moderation')"
          :rules="{ required: { allowFalse: false } }"
          :custom-messages="{ required: $t('marketplace.createAsset.moderationRequired') }"
        >
          <v-checkbox
            v-model="isModerationChecked"
            :label="$t('marketplace.createAsset.moderationMessage')"
            :error-messages="errors"
            hide-details="auto"
            class="pa-0 mt-0"
          />
        </validation-provider>

        <div class="buttons-container ml-auto">
          <m-btn
            kind="primary"
            :disabled="invalid"
            :loading="loading"
            type="submit"
          >
            Submit Creation
          </m-btn>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>
  import { attributedFormFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { NftItemMetadataDraftStatus, AttributeScope } from '@/casimir-framework/vars';
  import { MBtn } from '@/components/MBtn';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { awaitForStore } from '@/casimir-framework/all';

  export default {
    name: 'AssetCreateForm',

    components: {
      LayoutRenderer,
      VeStack,
      MBtn
    },

    mixins: [attributedFormFactory(AttributeScope.NFT_ITEM, 'nftItem')],

    data() {
      return {
        loading: false,
        isModerationChecked: false
      };
    },

    computed: {
      formSchema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },

      nftCollection() {
        return {} //this.$store.getters.userNftCollection;
      },
    },

    methods: {
      // async reloadNftCollection() {
      //   await this.$store.dispatch('getCurrentUserNftCollection');
      // },

      async submit() {
        this.loading = true;
        await this.createAsset();
        this.loading = false;
      },

      clearForm() {
        this.restoreOldValue(true);
        this.isModerationChecked = false;
        this.$refs.validationObserver.reset();
      },

      async createAsset() {
        const email = this.$attributes.getMappedData('nftItem.email', this.lazyFormData.attributes)?.value;

        try {
          
          // const {
          //   nftItemMetadataDraftModerationRequired = false
          // } = this.$currentPortal?.profile?.settings?.nftModeration.isRequired || {};
          // const status = nftItemMetadataDraftModerationRequired
          //   ? NftItemMetadataDraftStatus.PROPOSED
          //   : NftItemMetadataDraftStatus.APPROVED;

          const draftPayload = {
            data: {
              nftCollectionId: "lisbon-I-love-you",
              nftItemId: `${new Date().getTime()}`,
              owner: email,
              ownedByTeam: false,
              authors: [email],
              status: NftItemMetadataDraftStatus.PROPOSED,
              ...this.lazyFormData
            }
          };

          const { data: { _id } } = await this.$store.dispatch('nftItemDrafts/create', draftPayload);

          let createdAssetId = _id;

          this.$notifier.showSuccess(this.$t('marketplace.createAsset.createSuccess'));
          this.$emit('success');
          this.$eventBus.$emit('submit-asset');
          this.clearForm();

          this.$router.push({
            name: 'assetDetails',
            params: { assetId: createdAssetId }
          });

        } catch (err) {
          console.error(err);
          this.$notifier.showError(this.$t('common.errors.request'));
        }
        
      }
    },

    // async created() {
    //   await awaitForStore(this.$store, 'currentPortal/data');
    // },

    mounted() {
      this.clearForm();
      // this.reloadNftCollection();
    },

  };
</script>
