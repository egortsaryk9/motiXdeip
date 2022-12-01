<template>

  <v-sheet>
    <vex-section max-width="800" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title :title="title" />

        <nft-item-form
          :nft-item="asset"
          :nft-collection-id="nftCollectionId"
          :is-moderation-required="isModerationRequired"
          :schema="schema"
          :mode="mode"
          @success="handleSuccess"
          @error="handleError"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>

  import { NftItemForm } from '@/casimir-framework/modules/nft-items';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { formMixin, filterObjectKeys } from '@/casimir-framework/all';
  import { ViewMode } from '@/casimir-framework/vars';


  export default {
    name: 'AssetForm',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      NftItemForm
    },

    props: {
      ...filterObjectKeys(formMixin.props, ['mode'])
    },

    computed: {
      isEditMode() { return this.mode === ViewMode.EDIT; },
      title() {
        return !this.isEditMode
          ? this.$t('marketplace.createAsset.formCreateTitle')
          : this.$t('marketplace.createAsset.formUpdateTitle');
      },
      schema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },
      isModerationRequired() {
        return this.$store.getters['isModerationRequired'];
      },
      asset() {
        return this.isEditMode 
          ? this.$store.getters['nftItems/one'](this.assetId)
          : null;
      }
    },

    methods: {
      handleSuccess(assetId) {
        const message = !this.isEditMode 
          ? this.$t(`marketplace.createAsset.successCreate`)
          : this.$t(`marketplace.createAsset.successUpdate`)

        this.$notifier.showSuccess(message);
        this.$emit('success', assetId);
      },

      handleError(err) {
        console.error(err);

        const message = !this.isEditMode 
          ? this.$t(`marketplace.createAsset.errorCreate`)
          : this.$t(`marketplace.createAsset.errorUpdate`)

        this.$notifier.showError(message);
        this.$emit('error');
      },
    }
  };
</script>
