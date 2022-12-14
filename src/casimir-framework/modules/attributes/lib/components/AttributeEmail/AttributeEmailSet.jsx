import {
  VTextField
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'vuetify/lib/components';

import { defineComponent } from '@/casimir-framework/all';
import { AttributeSetMixin } from '../../mixins';

/**
 * Component for changing text field attribute
 */
export default defineComponent({
  name: 'AttributeEmailSet',

  mixins: [AttributeSetMixin],

  data() {
    return {
      validationRules: 'required|email'
    };
  },

  methods: {
    /**
     * Generate changing text field
     *
     * @param {Array} errors
     */
    genAttribute(errors) {
      return (
        <VTextField
          vModel={this.internalValue}
          label={this.attributeInfo.title}
          errorMessages={errors}
        />
      );
    }
  }
});
