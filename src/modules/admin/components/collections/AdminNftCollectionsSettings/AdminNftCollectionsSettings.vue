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

    <vex-section max-width="1200" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title :title="$t('admin.collections.settings.title')" />

        <validation-observer 
          v-slot="{ handleSubmit, invalid }" 
        >
          <v-form @submit.prevent="handleSubmit(updateActiveNftCollectionId)">
            <ve-stack :gap="32">

              <validation-provider
                v-slot="{ errors }"
                :name="$t('admin.collections.settings.title')"
              >
                <v-select
                  v-model="formData.activeNftCollectionId"
                  label="NFT Collection"
                  :items="nftCollectionsList"
                  :error-messages="errors"
                  hide-details
                />
              </validation-provider>

              <v-divider />

              <div class="d-flex">
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  :disabled="loading || disabled"
                  @click="$router.back()"
                >
                  Cancel
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  :disabled="disabled || invalid"
                  :loading="loading"
                >
                  Save
                </v-btn>
              </div>
            </ve-stack>
          </v-form>
        </validation-observer>
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { awaitForStore } from '@/casimir-framework/all';
  import { formMixin } from '@/casimir-framework/all';

  export default {
    name: 'AdminNftCollectionsSettings',
    components: {
      VeStack,
      VexSection,
      VexSectionTitle
    },

    mixins: [formMixin],

    computed: {
      nftCollectionsList() {
        return [
          { value: null, text: 'Without Collection' },
          ...this.$store.getters['nftCollections/list']()
            .map((c) => ({ text: c._id, value: c._id }))
        ];
      },
    },

    methods: {

      async loadNftCollections() {
        try {
          await this.$store.dispatch('nftCollections/getList');
        } catch (err) {
          console.error(err);
        }
      },

      async updateActiveNftCollectionId() {
        this.disabled = true;
        this.loading = true;

        try {
          const customFields = { ...this.$portalCustomFields, ...this.lazyFormData };
          await this.$store.dispatch('currentPortal/updatePortalCustomFields', { customFields,  title: 'temp' });
          this.$notifier.showSuccess('Active collection has been updated successfully');
          this.$router.push({
            name: 'admin.collections',
          });
        } catch (err) {
          console.error(err);
          this.$notifier.showError('An error occurred while settings Active collection, please try again later');
        }

        this.disabled = false;
        this.loading = false;
      },

      setActiveCollectionId() {
        const activeNftCollectionId = this.$portalCustomFields.activeNftCollectionId;
        this.$set(this.formData, 'activeNftCollectionId', activeNftCollectionId);
      },
    },

    async created() {
      await this.loadNftCollections();
      await awaitForStore(this.$store, 'currentPortal/customFields');
      this.setActiveCollectionId();
    }

  };
</script>
