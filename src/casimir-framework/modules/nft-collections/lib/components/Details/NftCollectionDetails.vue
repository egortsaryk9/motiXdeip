<template>
  <layout-renderer
    :value="nftCollection"
    :schema="internalSchema"
    :schema-data="internalSchemaData"
  />
</template>

<script>
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';
  import { defineComponent } from '@/casimir-framework/all';

  export default defineComponent({
    name: 'NftCollectionDetails',

    components: {
      LayoutRenderer
    },

    mixins: [
      attributedDetailsFactory('nftCollection')
    ],

    computed: {
      /**
       * Get computed schema data
       */
      internalSchemaData() {
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.nftCollection),
            {
              scopeName: 'nftCollection',
              scopeId: this.nftCollection._id
            }
          ),
          ...this.schemaData
        };
      }
    }
  });
</script>
