<template>
  <attributes-data-provider
    v-bind="providerProps"
  >
    <template #default="{attributes, loading}">
      <slot 
        v-bind:attributes="attributes"
        v-bind:loading="loading"
      />
    </template>
  </attributes-data-provider>

</template>

<script>
  import { VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import AttributesDataProvider from '../DataProvider';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';

  /**
   * Component for creating list of attributes
   */
  export default {
    name: 'AttributesList',

    components: {
      VeStack,
      VexTooltip,
      AttributesDataProvider
    },

    props: {
      ...AttributesDataProvider.options.props
    },

    computed: {
      /**
       * Get computed provider properties
       */
      providerProps() {
        return getBindableProps.call(this, AttributesDataProvider.options.props);
      }
    }

  };
</script>
