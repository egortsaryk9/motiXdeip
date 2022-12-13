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
      title: 'Asset',
      blocks: [
        ...blocksGenerator([
          {
            component: AssetCreatedAt,
            icon: 'mdi-calendar',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetCollectionName,
            icon: 'mdi-image-multiple',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetStatus,
            icon: 'mdi-credit-card-chip-outline',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetAuthor,
            icon: 'mdi-account',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetFile,
            icon: 'mdi-file',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetQueueNumber,
            icon: 'mdi-numeric',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
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
