import { defineComponent } from '@/casimir-framework/all';
import { AttributeReadMixin } from '../../mixins';

/**
 * Component for read only date attribute
 */
export default defineComponent({
  name: 'AttributeDateRead',

  mixins: [AttributeReadMixin],

  methods: {
    /**
     * Generate date attribute for read only
     */
    genAttribute() {
      return (
        <div>{this.internalValue}</div>
      );
    }
  }
});
