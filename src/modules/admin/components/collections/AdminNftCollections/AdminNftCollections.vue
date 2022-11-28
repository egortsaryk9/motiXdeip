<template>
  <vex-section>
    <ve-stack :gap="24">
      <vex-section-title
        :title="$t('admin.collections.title')"
        class="align-center"
      >
        <template #append>
          <m-btn
            small
            kind="primary"
            outlined
            class="mr-4"
            :to="{ name: 'admin.collections.settings' }"
          >
            <v-icon left>
              mdi-tune-vertical
            </v-icon>
            {{ $t('admin.collections.settings.settings') }}
          </m-btn>
          <m-btn
            small
            kind="primary"
            depressed
            :to="{ name: 'admin.collections.create' }"
          >
            <v-icon left>
              mdi-folder-multiple-outline
            </v-icon>
            {{ $t('admin.collections.form.new') }}
          </m-btn>
        </template>
      </vex-section-title>

      <nft-collections-list
        @click-row="onRowClick"
        @click-edit="onEditClick"
        @click-view="onViewClick"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { NftCollectionsList } from '@/casimir-framework/modules/nft-collections';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'AdminNftCollections',
    components: {
      NftCollectionsList,
      MBtn,
      VeStack,
      VexSection,
      VexSectionTitle
    },
    methods: {
      onEditClick(nftCollection) {
        this.$router.push({
          name: 'admin.collections.edit',
          params: { nftCollectionId: nftCollection._id }
        });
      },
      onViewClick(nftCollection) {
        this.$router.push({
          name: 'admin.collections.details',
          params: { nftCollectionId: nftCollection._id }
        });
      },
      onRowClick(nftCollection) {
      }
    }
  };
</script>
