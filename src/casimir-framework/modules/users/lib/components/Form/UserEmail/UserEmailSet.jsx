
import { defineComponent } from '@/casimir-framework/all';
import {
  VTextField
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'vuetify/lib/components';
import { ValidationProvider } from '@/casimir-framework/plugins/Validation';
import { FieldSetMixin } from '@/casimir-framework/vue-layout-schema';


export default defineComponent({
  name: 'UserEmailSet',

  mixins: [FieldSetMixin],

  data() {
    return {
      validationRules: 'required|email'
    };
  },

  render() {
    
    const scopedSlots = {
      default: ({ errors }) => {
        return <VTextField
          vModel={this.internalValue}
          label={'Email'}
          errorMessages={errors}
      />
      }
    };

    return (
      <ValidationProvider
        name={'Email'}
        rules={this.validationRules}
        scopedSlots={scopedSlots}
        tag="div"
      />
    );
  }
});