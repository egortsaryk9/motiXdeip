import { VexFileInputExtended } from '@/casimir-framework/plugins/VuetifyExtended';

import { defineComponent } from '@/casimir-framework/all';
import { AttributeSetMixin } from '../../mixins';

/**
 * Component for changing file attribute
 */
export default defineComponent({
  name: 'AttributeFileSet',

  mixins: [AttributeSetMixin],

  data() {
    return {
      lazyValue: undefined
    };
  },

  methods: {
    /**
     * Generate changing file attribute
     *
     * @param {Array} errors
     */
    genAttribute(errors) {
      const urlBuilder = (attributeId, schemaData) => {
        return (file) => {
          return schemaData.getAttributeFileSrc(attributeId, file);
        }
      }
      return (
        <VexFileInputExtended
          vModel={this.internalValue}
          label={this.attributeInfo.title}
          multiple={!!this.attributeInfo.isMultiple}
          urlBuilder={urlBuilder(this.attributeId, this.schemaData)}
          errorMessages={errors}
        />
      );
    }
  }
});
