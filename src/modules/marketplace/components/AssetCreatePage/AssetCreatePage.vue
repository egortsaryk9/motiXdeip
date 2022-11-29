<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="Lisbon, I Love you"
      />
        <asset-create-form
          :nft-collection-id="activeNftCollection?._id"
          ref="createAssetForm"
          @success="handleCreateSuccess"
        />
      <router-view />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import AssetCreateForm from './AssetCreateForm';
  import { awaitForStore } from '@/casimir-framework/all';

  export default {
    name: 'AssetCreatePage',

    components: {
      AssetCreateForm,
      VexSection,
      VexSectionTitle,
      VeStack
    },

    computed: {
      activeNftCollection() {
        return this.$store.getters.activeNftCollection;
      },
    },

    methods: {
      handleCreateSuccess(assetId) {
        this.$router.push({
          name: 'assetDetails',
          params: { assetId: assetId }
        });
      },
    },

    async created() {
      await awaitForStore(this.$store, 'currentPortal/customFields');
      await this.$store.dispatch('getActiveNftCollection');
    }
  };
</script>
