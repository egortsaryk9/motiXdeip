import { defineComponent } from '@/casimir-framework/all';
import { VeLineClamp } from '@/casimir-framework/vue-elements';
import { FieldReadMixin } from '@/casimir-framework/vue-layout-schema';


export default defineComponent({
  name: 'UserEmailRead',

  mixins: [FieldReadMixin],

  computed: {
    internalValue() {
      return this.value || this.schemaData?.data?.email;
    }
  },

  render() {

    return this.internalValue 
      ? (
          <div>
            <VeLineClamp { ...{ props: this.proxyProps.VeLineClamp || {} }}>
              {this.internalValue}
            </VeLineClamp>
          </div>
        )
      : null;
    }
});
