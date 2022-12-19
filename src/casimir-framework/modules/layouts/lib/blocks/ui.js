import { blocksGenerator } from '@/casimir-framework/vue-layout-schema';
import { defaultLayoutComponents } from '../helpers/defaultLayoutsComponents';

const {
  VDivider,
  VCard,
  VexMiniMetaItem,
  VexTooltip,
  VexTextExpand,
  VexScrollableText
} = defaultLayoutComponents;

export const uiBlocks = {
  title: 'UI elements',
  blocks: blocksGenerator([
    {
      component: VDivider,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-minus',
      blockType: 'component',
      children: []
    },
    {
      component: VexMiniMetaItem,
      isSingle: false,
      isMandatory: false,
      blockName: 'Meta item',
      icon: 'mdi-tag-text-outline',
      excludeProps: ['meta', 'title'],
      blockType: 'component'
    },
    {
      component: VexTooltip,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-tooltip-text-outline',
      children: []
    },
    {
      component: VexTextExpand,
      isSingle: false,
      isMandatory: false,
      blockName: 'Expand',
      icon: 'mdi-text-box-plus-outline',
      children: []
    },
    {
      component: VexScrollableText,
      isSingle: false,
      isMandatory: false,
      blockName: 'ScrollableText',
      icon: 'mdi-script-text-outline ',
      children: []
    },
    {
      component: VCard,
      isSingle: false,
      isMandatory: false,
      blockName: 'Card',
      icon: 'mdi-card-text-outline',
      includeProps: [
        'elevation',
        'height',
        'width',
        'maxHeight',
        'maxWidth',
        'minHeight',
        'minWidth',
        'rounded',
        'outlined'
      ],
      children: []
    }
  ])
};
