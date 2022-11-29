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

    props: {
      nftCollectionId: {
        type: String,
        default: null
      },
    },

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
    },

    methods: {

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

          const isModerationRequired = this.$store.getters.isModerationRequired;
          const status = isModerationRequired
            ? NftItemMetadataDraftStatus.PROPOSED
            : NftItemMetadataDraftStatus.APPROVED;

          const nftItemPayload = {
            data: {
              nftCollectionId: this.nftCollectionId,
              nftItemId: `${new Date().getTime()}`,
              ownerId: email,
              creatorId: email,
              status: status,
              ...this.lazyFormData
            }
          };

          const { data: { _id: assetId } } = await this.$store.dispatch('nftItems/create', nftItemPayload);

          this.$notifier.showSuccess(this.$t('marketplace.createAsset.createSuccess'));
          this.$emit('success', assetId);
          this.$eventBus.$emit('submit-asset');
          this.clearForm();

        } catch (err) {
          console.error(err);
          this.$notifier.showError(this.$t('common.errors.request'));
        }
        
      }
    },

    mounted() {
      this.clearForm();
    },

    async created() {
      await awaitForStore(this.$store, 'isModerationRequired');
    }

  };
</script>
