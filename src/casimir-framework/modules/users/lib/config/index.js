import { blocksGenerator } from '@/casimir-framework/vue-layout-schema';
import { AttributeScope } from '@/casimir-framework/vars';
import { UserEmailRead, UserEmailSet } from '../components/Form/UserEmail';



export const userScope = {
  type: 'user',
  label: 'User',
  mappedKeys: {
    attributes: [
      {
        key: 'avatar',
        label: 'User avatar/photo',
        allowedTypes: ['avatar', 'image']
      },
      {
        key: 'firstName',
        label: 'User first name',
        allowedTypes: ['text']
      },
      {
        key: 'lastName',
        label: 'User last name',
        allowedTypes: ['text']
      }
    ],
    layouts: [
      {
        key: 'details',
        label: 'User details',
        allowedTypes: ['details']
      },
      {
        key: 'form',
        label: 'User form',
        allowedTypes: ['form']
      }
    ]
  }
};

export const userAttributes = [
  {
    type: 'userSelector',
    valueType: ['string'],
    label: 'User selector',
    icon: 'mdi-account-circle-outline',
    canBeMultiple: true,
    scopes: ['team', 'nftCollection']
  }
];

export const userFieldsLayoutBuilder = {
  blocks: {
    title: 'User',
    blocks: [
      ...blocksGenerator([
        {
          component: UserEmailRead,
          blockName: 'User Email',
          icon: 'mdi-calendar',
          blockType: 'simple',
          layoutType: 'details',
          scope: [AttributeScope.USER],
          disabledProps: ['schemaData']
        },
        {
          component: UserEmailSet,
          blockName: 'User Email',
          icon: 'mdi-calendar',
          model: 'email',
          blockType: 'simple',
          layoutType: 'form',
          scope: [AttributeScope.USER],
          disabledProps: ['schemaData']
        },        
      ])
    ]
  },
  components: {
    UserEmailRead,
    UserEmailSet,
  }
};

