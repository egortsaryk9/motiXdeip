<template>
  <v-sheet>
    <v-btn
      class="mt-2 ml-2"
      icon
      style="pointer-events: all"
      @click="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <vex-section max-width="800" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title :title="$t('admin.collections.details.title')" />

        <nft-collection-details
          :nft-collection="nftCollection"
          :schema="schema"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { NftCollectionDetails } from '@/casimir-framework/modules/nft-collections';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';


  export default {
    name: 'AdminNftCollectionDetails',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      NftCollectionDetails
    },

    props: {
      nftCollectionId: {
        type: String,
        required: true
      },
    },

    computed: {
      schema() {
        return this.$layouts.getMappedData('nftCollection.details')?.value;
      },
      nftCollection() {
        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      }
    },

    methods: {
      async getNftCollection() {
        try {
          await this.$store.dispatch('nftCollections/getOne', this.nftCollectionId);
        } catch (err) {
          console.error(err);
        }
      },
    },

    async created() {
      await this.getNftCollection();
    },

  };
</script>
