import { defineComponent } from '@/casimir-framework/all';
import { AttributeReadMixin } from '../../mixins';

/**
 * Component for read only number attribute
 */
export default defineComponent({
  name: 'AttributeNumberRead',

  mixins: [AttributeReadMixin],

  methods: {
    /**
     * Generate number attribute for read only
     */
    genAttribute() {
      return (
        <div>{this.internalValue}</div>
      );
    }
  }
});
