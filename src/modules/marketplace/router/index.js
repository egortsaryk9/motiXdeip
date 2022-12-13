import { AssetListPage } from '../components/AssetListPage';
import { ConceptPage } from '../components/ConceptPage';
import { AssetFormPage } from '../components/AssetFormPage';
import { AssetsDetailsPage } from '../components/AssetsDetailsPage';
import { SYSTEM_ROLE } from '@/casimir-framework/vars';
import { ViewMode } from '@/casimir-framework/vars';


export const marketplaceRouter = [
  {
    path: '/',
    component: { template: '<div><router-view name="dialog"/><router-view /></div>' },
    meta: { auth: false },
    children: [
      {
        name: 'concept',
        path: '',
        component: ConceptPage,
        meta: { auth: false }
      },
      {
        name: 'asset.list',
        path: 'asset/list',
        component: AssetListPage,
        meta: { auth: false }
      },
      {
        name: 'asset.create',
        path: 'asset/create',
        component: AssetFormPage,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          mode: ViewMode.CREATE
        }),
      },
      {
        name: 'asset.edit',
        path: 'asset/edit/:assetId',
        component: AssetFormPage,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          assetId: route.params.assetId,
          mode: ViewMode.EDIT
        }),
      },
      {
        name: 'asset.details',
        path: 'asset/details/:assetId',
        component: AssetsDetailsPage,
        meta: { auth: false },
        props: (route) => ({
          assetId: route.params.assetId,
        })
      }
    ]
  }
];
