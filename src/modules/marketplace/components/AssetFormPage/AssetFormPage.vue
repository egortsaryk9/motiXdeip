<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="Lisbon, I love you"
      />
      <v-sheet>
        <vex-section 
          max-width="800" 
          class="mx-auto pa-0"
        >
          <ve-stack :gap="32">
            <vex-section-title :title="isEditMode 
              ? $t('marketplace.createAsset.formUpdateTitle')
              : $t('marketplace.createAsset.formCreateTitle')"
             />

            <nft-item-form
              :nft-item="nftItem"
              :nft-collection-id="nftCollection?._id"
              :is-moderation-required="isModerationRequired"
              :schema="schema"
              :mode="mode"
              @success="handleSuccess"
              @error="handleError"
              @cancel="handleCancel"
            />
          </ve-stack>
        </vex-section>
      </v-sheet>
      <router-view />
    </ve-stack>
  </vex-section>
</template>

<script>

  import { NftItemForm } from '@/casimir-framework/modules/nft-items';
  import { ViewMode } from '@/casimir-framework/vars';
  import { awaitForStore } from '@/casimir-framework/all';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { formMixin, filterObjectKeys } from '@/casimir-framework/all';


  export default {
    name: 'AssetForm',

    components: {
      NftItemForm,
      VexSection,
      VexSectionTitle,
      VeStack
    },

    props: {

      assetId: {
        type: String,
        required: false
      },

      ...filterObjectKeys(formMixin.props, ['mode']),
      
    },

    computed: {
      isEditMode() { 
        return this.mode === ViewMode.EDIT; 
      },

      schema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },
      
      nftItem() {
        return this.isEditMode 
          ? this.$store.getters['nftItems/one'](this.assetId)
          : null;
      },

      nftCollection() {
        return this.$store.getters.activeNftCollection;
      },

      isModerationRequired() {
        return this.$store.getters['isModerationRequired'];
      },
    },

    methods: {

      handleSuccess(assetId) {
        const message = !this.isEditMode 
          ? this.$t(`marketplace.createAsset.successCreate`)
          : this.$t(`marketplace.createAsset.successUpdate`)

        this.$notifier.showSuccess(message);
        setTimeout(() => {
          this.$router.push({
            name: 'asset.details',
            params: { assetId: assetId }
          });
        }, 1500);
      },

      handleError(err) {
        console.error(err);

        const message = !this.isEditMode 
          ? this.$t(`marketplace.createAsset.errorCreate`)
          : this.$t(`marketplace.createAsset.errorUpdate`)

        this.$notifier.showError(message);
      },

      handleCancel() {
        this.$router.back();
      }

    },

    async created() {
      if (this.isEditMode) {
        await this.$store.dispatch('nftItems/getOne', this.assetId);
      } 
      await awaitForStore(this.$store, 'currentPortal/customFields');
      await this.$store.dispatch('getActiveNftCollection');
    }
  };
</script>
