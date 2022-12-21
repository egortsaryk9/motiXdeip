import { isEqual, cloneDeep } from 'lodash';


export const FieldMixin = {
  name: 'FieldMixin',

  props: {

    schemaData: {
      type: Object,
      default: () => ({})
    },

    proxyProps: {
      type: Object,
      default: () => ({})
    },

    components: {
      type: Object,
      default: () => ({})
    },

    value: {
      type: [String, Number, Array, Object, Boolean, File],
      default: undefined
    }

  },

  computed: {
    /**
     * @return {string|number|Array|Object|boolean|File}
     */
    internalValue() {
      return this.value;
    }
  }
};


export const FieldModelMixin = {
  name: 'FieldModelMixin',

  model: {
    prop: 'value',
    event: 'input'
  },

  data() {
    return {
      lazyValue: undefined
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
  }
};


export const FieldSetMixin = {
  name: 'FieldSetMixin',
  mixins: [FieldMixin, FieldModelMixin],
};


export const FieldReadMixin = {
  name: 'FieldReadMixin',
  mixins: [FieldMixin],
};