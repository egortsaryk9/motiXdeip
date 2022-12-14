
import { defineComponent } from '@/casimir-framework/all';
import {
  VTextField
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'vuetify/lib/components';
import { ValidationProvider } from '@/casimir-framework/plugins/Validation';
import { FieldSetMixin } from '@/casimir-framework/vue-layout-schema';


export default defineComponent({
  name: 'UserPubKeySet',

  mixins: [FieldSetMixin],

  data() {
    return {
      validationRules: 'required|pubKey'
    };
  },

  render() {
    
    const scopedSlots = {
      default: ({ errors }) => {
        return <VTextField
          vModel={this.internalValue}
          label={'ECDSA Public Key'}
          errorMessages={errors}
      />
      }
    };

    return (
      <ValidationProvider
        name={'ECDSA Public Key'}
        rules={this.validationRules}
        scopedSlots={scopedSlots}
        tag="div"
      />
    );
  }
});