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
        <vex-section-title title="Attribute settings" />
        <attributes-mappings :value="$store.getters['attributes/settings']" />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { AttributesMappings } from '@/casimir-framework/modules/attributes';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'AdminAttributesSettings',
    components: {
      AttributesMappings,

      VeStack,
      VexSection,
      VexSectionTitle
    }
  };
</script>
