<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="Creation Details"
      >
        <template v-if="$currentUser.isAdmin" #append>
          <m-btn
            small
            kind="primary"
            outlined
            :to="{ name: 'asset.edit', nftItemId: assetId }"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
          </m-btn>
        </template>
      </vex-section-title>

      <asset-details :assetId="assetId"/>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '@/components';

  import AssetDetails from './AssetDetails';

  export default {
    name: 'AssetsDetailsPage',

    components: {
      MBtn,
      VexSection,
      VexSectionTitle,
      VeStack,
      AssetDetails
    },

    props: {
      assetId: {
        type: String,
        default: null
      },
    },

    data() {
      return {
      };
    },

    mounted() {
    },

    beforeDestroy() {
    }
  };
</script>
