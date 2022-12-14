import { defineComponent } from '@/casimir-framework/all';
import { VeLineClamp } from '@/casimir-framework/vue-elements';

export default defineComponent({
  name: 'UserEmailRead',

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    },
    proxyProps: {
      type: Object,
      default: () => ({})
    },
  },

  computed: {
    userEmail() {
      const { email } = this.schemaData.data;
      return email;
    }
  },


  render() {

    return (
      <div>
        <VeLineClamp { ...{ props: this.proxyProps.VeLineClamp || {} }}>
          {this.userEmail}
        </VeLineClamp>
      </div>
      )
    }
});
