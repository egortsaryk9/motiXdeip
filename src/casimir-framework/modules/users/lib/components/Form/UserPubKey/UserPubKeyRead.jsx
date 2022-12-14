import { defineComponent } from '@/casimir-framework/all';
import { VeLineClamp } from '@/casimir-framework/vue-elements';

export default defineComponent({
  name: 'UserPubKeyRead',

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
    userPubKey() {
      const { pubKey } = this.schemaData.data;
      return pubKey;
    }
  },

  render() {

    return (
      <div>
        <VeLineClamp { ...{ props: this.proxyProps.VeLineClamp || {} }}>
          {this.userPubKey}
        </VeLineClamp>
      </div>
      )
    }
});
