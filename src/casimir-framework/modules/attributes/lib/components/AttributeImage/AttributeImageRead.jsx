import { VexImage } from '@/plugins/VuetifyExtended';
import { defineComponent } from '@/casimir-framework/all';
import { AttributeReadMixin } from '../../mixins';

/**
 * Component for read only image attribute
 */
export default defineComponent({
  name: 'AttributeImageRead',

  mixins: [AttributeReadMixin],

  methods: {
    /**
     * Generate image attribute for read only
     */
    genAttribute() {
      const src = this.schemaData.getAttributeFileSrc(this.attributeId);
      const props = this?.proxyProps?.VexImage;

      return (
        <VexImage max-width="100%" max-height="100%" src={src}
          {...{ props }}
        />
      );
    }
  }

});
