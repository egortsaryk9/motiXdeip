<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.conceptPage.pageTitle')"
      >
        <template #append>
          <v-btn
            :to="{ name: 'assetList' }"
            kind="primary"
            small
          >
            <!-- XXX: Put your logo here -->
            See creations in Queue
          </v-btn>
        </template>
      </vex-section-title>
      <div class="d-flex align-center justify-start">
        <div class="text-body-1">
          A creative movement celebrating our city through the eyes and lives of those who love it.
        </div>
      </div>
      <div class="d-flex align-center justify-center">
        <m-btn
          kind="primary"
          :to="{ name: 'assetCreate' }"
        >
          Submit Creation
        </m-btn>
      </div>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '@/components';

  export default {
    name: 'ConceptPage',

    components: {
      MBtn,
      VexSection,
      VexSectionTitle,
      VeStack,
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
