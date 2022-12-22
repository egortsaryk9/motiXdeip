import { SYSTEM_ROLE, ViewMode } from '@/casimir-framework/vars';

import { AdminNavigationView } from '@/modules/admin/components/View/AdminNavigationView';

import { AdminUsersList } from '@/modules/admin/components/Users/AdminUsersList';
import { AdminUserForm } from '@/modules/admin/components/Users/AdminUserForm';
import { AdminUserDetails } from '@/modules/admin/components/Users/AdminUserDetails';

import { AdminNftCollectionsList } from '@/modules/admin/components/Collections/AdminNftCollectionsList';
import { AdminNftCollectionsForm } from '@/modules/admin/components/Collections/AdminNftCollectionsForm';
import { AdminNftCollectionDetails } from '@/modules/admin/components/Collections/AdminNftCollectionDetails';
import { AdminNftCollectionsSettings } from '@/modules/admin/components/Collections/AdminNftCollectionsSettings';

import { AdminAttributesList } from '@/modules/admin/components/Attributes/AdminAttributesList';
import { AdminAttributesForm } from '@/modules/admin/components/Attributes/AdminAttributesForm';
import { AdminAttributesSettings } from '@/modules/admin/components/Attributes/AdminAttributesSettings';

import { AdminLayouts } from '@/modules/admin/components/Layouts/AdminLayouts';
import { AdminLayoutsForm } from '@/modules/admin/components/Layouts/AdminLayoutsForm';
import { AdminLayoutsSettings } from '@/modules/admin/components/Layouts/AdminLayoutsSettings';

const formViewMeta = (
  auth = [SYSTEM_ROLE.ADMIN]
) => ({
  auth,
  viewSetup: {
    sideBar: { isVisible: false }
  }
});

export const adminRouter = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminNavigationView,
    meta: {
      auth: [SYSTEM_ROLE.ADMIN],
      redirectTo: 'home'
    },
    redirect: { name: 'admin.collections' },
    children: [
      {
        path: 'collections',
        component: { template: '<router-view />' },
        children: [
          {
            name: 'admin.collections',
            path: '',
            component: AdminNftCollectionsList,
            meta: { auth: [SYSTEM_ROLE.ADMIN] }
          },
          {
            name: 'admin.collections.details',
            path: ':nftCollectionId/details',
            component: AdminNftCollectionDetails,
            meta: { auth: [SYSTEM_ROLE.ADMIN], viewSetup: { sideBar: { isVisible: false } } },
            props: (route) => ({
              nftCollectionId: route.params.nftCollectionId
            })
          },
          {
            name: 'admin.collections.create',
            path: 'create',
            component: AdminNftCollectionsForm,
            meta: formViewMeta(),
            props: (route) => ({
              mode: ViewMode.CREATE
            })
          },
          {
            name: 'admin.collections.edit',
            path: ':nftCollectionId/edit',
            component: AdminNftCollectionsForm,
            meta: formViewMeta(),
            props: (route) => ({
              nftCollectionId: route.params.nftCollectionId,
              mode: ViewMode.EDIT
            })
          },
          {
            name: 'admin.collections.settings',
            path: 'settings',
            component: AdminNftCollectionsSettings,
            meta: formViewMeta(),
            props: (route) => ({
              nftCollectionId: route.params.nftCollectionId,
              mode: ViewMode.EDIT
            })
          },
        ]
      },
      {
        path: 'users',
        component: { template: '<div><router-view name="dialog"/><router-view /></div>' },
        meta: { auth: [SYSTEM_ROLE.ADMIN] },
        children: [
          {
            name: 'admin.users',
            path: '',
            component: AdminUsersList,
            meta: { auth: [SYSTEM_ROLE.ADMIN] }
          },
          {
            name: 'admin.users.create',
            path: 'create',
            component: AdminUserForm,
            meta: { auth: [SYSTEM_ROLE.ADMIN] },
            props: (route) => ({
              mode: ViewMode.CREATE
            }),
          },
          {
            name: 'admin.users.edit',
            path: ':userId/edit',
            component: AdminUserForm,
            meta: { auth: [SYSTEM_ROLE.ADMIN] },
            props: (route) => ({
              userId: route.params.userId,
              mode: ViewMode.EDIT
            }),
          },
          {
            name: 'admin.users.details',
            path: ':userId/details',
            component: AdminUserDetails,
            meta: { auth: [SYSTEM_ROLE.ADMIN], viewSetup: { sideBar: { isVisible: false } } },
            props: (route) => ({
              userId: route.params.userId,
            })
          }
        ]
      },
      {
        path: 'attributes',
        component: { template: '<router-view />' },
        children: [
          {
            name: 'admin.attributes',
            path: '',
            component: AdminAttributesList,
            meta: { auth: [SYSTEM_ROLE.ADMIN] }
          },
          {
            name: 'admin.attributes.settings',
            path: 'settings',
            component: AdminAttributesSettings,
            meta: formViewMeta()
          },
          {
            name: 'admin.attributes.create',
            path: 'create',
            component: AdminAttributesForm,
            meta: formViewMeta()
          },
          {
            name: 'admin.attributes.edit',
            path: ':attributeId/edit',
            component: AdminAttributesForm,
            meta: formViewMeta(),
            props: (route) => ({
              attributeId: route.params.attributeId,
              mode: ViewMode.EDIT,
              title: 'Edit attribute'
            })
          }
        ]
      },
      {
        path: 'layouts',
        component: { template: '<router-view />' },
        children: [
          {
            name: 'admin.layouts',
            path: '',
            component: AdminLayouts,
            meta: { auth: [SYSTEM_ROLE.ADMIN] }
          },
          {
            name: 'admin.layouts.settings',
            path: 'settings',
            component: AdminLayoutsSettings,
            meta: formViewMeta()
          },
          {
            name: 'admin.layouts.create',
            path: 'create',
            component: AdminLayoutsForm,
            meta: formViewMeta()
          },
          {
            name: 'admin.layouts.edit',
            path: ':layoutId/edit',
            component: AdminLayoutsForm,
            meta: formViewMeta(),
            props: (route) => ({
              layoutId: route.params.layoutId,
              mode: ViewMode.EDIT,
              title: 'Edit layout'
            })
          }
        ]
      }
    ]
  }
];
