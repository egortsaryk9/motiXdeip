import { SYSTEM_ROLE, ViewMode } from '@/casimir-framework/vars';

import { AdminNftCollections } from '@/modules/admin/components/collections/AdminNftCollections';
import { AdminNftCollectionsForm } from '@/modules/admin/components/collections/AdminNftCollectionsForm';
import { AdminNftCollectionDetails } from '@/modules/admin/components/collections/AdminNftCollectionDetails';
import { AdminNftCollectionsSettings } from '@/modules/admin/components/collections/AdminNftCollectionsSettings';

import { AdminAttributes } from '@/modules/admin/components/attributes/AdminAttributes';
import { AdminAttributesForm } from '@/modules/admin/components/attributes/AdminAttributesForm';
import { AdminAttributesSettings } from '@/modules/admin/components/attributes/AdminAttributesSettings';

import { AdminLayouts } from '@/modules/admin/components/layouts/AdminLayouts';
import { AdminLayoutsForm } from '@/modules/admin/components/layouts/AdminLayoutsForm';
import { AdminLayoutsSettings } from '@/modules/admin/components/layouts/AdminLayoutsSettings';

import { AdminNavigationView } from '@/modules/admin/components/view/AdminNavigationView';

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
            component: AdminNftCollections,
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
        path: 'attributes',
        component: { template: '<router-view />' },
        children: [
          {
            name: 'admin.attributes',
            path: '',
            component: AdminAttributes,
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
