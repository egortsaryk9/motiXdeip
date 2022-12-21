import { blocksGenerator } from '@/casimir-framework/vue-layout-schema';
import { AttributeScope } from '@/casimir-framework/vars';

import {
  AssetCreatedAt,
  AssetCollectionName,
  AssetStatus,
  AssetAuthor,
  AssetFile,
  AssetQueueNumber
} from '@/components';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Creation',
      blocks: [
        ...blocksGenerator([
          {
            component: AssetCreatedAt,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-calendar',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData','components', 'value']
          },
          {
            component: AssetCollectionName,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-image-multiple',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData','components', 'value']
          },
          {
            component: AssetStatus,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-credit-card-chip-outline',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData','components', 'value']
          },
          {
            component: AssetAuthor,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-account',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData','components', 'value']
          },
          {
            component: AssetFile,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-file',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData', 'components', 'value']
          },
          {
            component: AssetQueueNumber,
            isSingle: true,
            isMandatory: false,
            icon: 'mdi-numeric',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData','components', 'value']
          },
        ])
      ]
    }
  ],
  components: {
    AssetCreatedAt,
    AssetCollectionName,
    AssetStatus,
    AssetAuthor,
    AssetFile,
    AssetQueueNumber
  }
};
