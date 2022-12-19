import { blocksGenerator, normalizeBlocksObject } from '@/casimir-framework/vue-layout-schema';
import { defaultLayoutComponents } from '../helpers/defaultLayoutsComponents';

const {
  VexVideoEmbed,
  VImg
} = defaultLayoutComponents;

export const contentBlocks = {
  title: 'Content',
  blocks: [
    ...normalizeBlocksObject([
      {
        is: 'span',
        isSingle: false,
        isMandatory: false,
        name: 'Text',
        icon: 'mdi-text',
        blockType: 'content',
        text: ''
      }
    ]),
    ...blocksGenerator([
      {
        component: VImg,
        isSingle: false,
        isMandatory: false,
        blockName: 'Image',
        icon: 'mdi-image-outline',
        blockType: 'component'
      },
      {
        component: VexVideoEmbed,
        isSingle: false,
        isMandatory: false,
        blockName: 'Video',
        icon: 'mdi-video-outline',
        excludeProps: ['params'],
        blockType: 'component'
      }
    ])
  ]
};
