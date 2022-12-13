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
        <vex-section-title :title="!isEditMode 
          ? $t('admin.collections.form.create')
          : $t('admin.collections.form.update')" 
        />

        <nft-collection-form
          :nft-collection="nftCollection"
          :schema="schema"
          :mode="mode"
          @success="handleSuccess"
          @error="handleError"
          @cancel="handleCancel"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { NftCollectionForm } from '@/casimir-framework/modules/nft-collections';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { formMixin, filterObjectKeys } from '@/casimir-framework/all';
  import { ViewMode } from '@/casimir-framework/vars';


  export default {
    name: 'AdminNftCollectionsForm',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      NftCollectionForm
    },

    props: {

      nftCollectionId: {
        type: String,
        required: false
      },

      ...filterObjectKeys(formMixin.props, ['mode'])
    },

    computed: {

      isEditMode() { 
        return this.mode === ViewMode.EDIT; 
      },

      schema() {
        return this.$layouts.getMappedData('nftCollection.form')?.value;
      },

      nftCollection() {
        return this.isEditMode 
          ? this.$store.getters['nftCollections/one'](this.nftCollectionId)
          : null;
      }
      
    },

    methods: {

      handleSuccess() {
        const messageKey = !this.isEditMode
          ? 'successCreate'
          : 'successUpdate';

        this.$notifier.showSuccess(this.$t(`admin.collections.form.${messageKey}`));
        this.$router.push({
          name: 'admin.collections',
        });
      },

      handleError(err) {
        console.error(err);

        const messageKey = !this.isEditMode
          ? 'errorCreate'
          : 'errorUpdate';

        this.$notifier.showError(this.$t(`admin.collections.form.${messageKey}`));
        this.$router.push({
          name: 'admin.collections',
        });
      },

      handleCancel() {
        this.$router.back();
      }

    }
  };
</script>
