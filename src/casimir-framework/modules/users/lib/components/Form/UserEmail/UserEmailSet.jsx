
import { defineComponent } from '@/casimir-framework/all';
import {
  VTextField
// eslint-disable-next-line import/extensions,import/no-unresolved
} from 'vuetify/lib/components';
import { ValidationProvider } from '@/casimir-framework/plugins/Validation';
import { isEqual, cloneDeep } from 'lodash';


export default defineComponent({
  name: 'UserEmailSet',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      lazyValue: undefined,
      validationRules: 'required|email'
    };
  },


  computed: {
    internalValue: {
      get() {
        return this.lazyValue;
      },
      set(val) {
        this.lazyValue = val;
        this.$emit('input', val);
      }
    }
  },

  watch: {
    value: {
      handler(value) {
        this.valueHandler(value);
      },
      immediate: true,
      deep: true
    },

    lazyValue: {
      handler(newVal) {
        this.$set(this, 'internalValue', newVal);
      },
      deep: true
    }
  },

  methods: {
    /**
     * Handle and set component value on model change
     * @param {*} value
     */
    valueHandler(value) {
      if (value && !isEqual(value, this.internalValue)) {
        const upd = cloneDeep(value);
        this.$set(this, 'internalValue', upd);
      }
    }
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