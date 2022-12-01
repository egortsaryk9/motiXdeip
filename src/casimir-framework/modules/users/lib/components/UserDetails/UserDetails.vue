<template>
  <layout-renderer
    :value="user"
    :schema="internalSchema"
    :schema-data="internalSchemaData"
  />
</template>

<script>
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';
  import { defineComponent } from '@/casimir-framework/all';

  export default defineComponent({
    name: 'UserDetails',

    components: {
      LayoutRenderer
    },

    mixins: [
      attributedDetailsFactory('user')
    ],

    computed: {
      /**
       * Get computed schema data
       */
      internalSchemaData() {
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.user),
            {
              scopeName: 'user',
              scopeId: this.user._id
            }
          ),
          ...this.schemaData
        };
      }
    }
  });
</script>
