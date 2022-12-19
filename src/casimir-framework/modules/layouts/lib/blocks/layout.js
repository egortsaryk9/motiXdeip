import { blocksGenerator } from '@/casimir-framework/vue-layout-schema';
import { defaultBreakpoints } from '@/casimir-framework/vue-elements/lib/util/breakpoint';
import { camelCase } from 'change-case';
import { defaultLayoutComponents } from '../helpers/defaultLayoutsComponents';

const {
  VexHeader,
  VexSection,
  VexSectionSplit,
  VeStack,
  VRow,
  VCol,
  VSheet
} = defaultLayoutComponents;

export const layoutBlocks = {
  title: 'Layout',
  blocks: blocksGenerator([
    {
      component: VexHeader,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-page-layout-header',
      children: [],
      excludeProps: ['returnDominant'],
      allowedFor: {
        mode: [],
        scope: []
      }
    },
    {
      component: VexSection,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-page-layout-body',
      children: []
    },
    {
      component: VexSectionSplit,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-view-week-outline',
      blockType: 'row',
      children: []
    },
    {
      component: VSheet,
      isSingle: false,
      isMandatory: false,
      blockName: 'Container',
      icon: 'mdi-card-outline',
      children: [],
      excludeProps: ['shaped', 'tile', 'elevation']
    },
    {
      component: VRow,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-view-grid-outline',
      children: [],
      blockType: 'row'
    },
    {
      component: VCol,
      isSingle: false,
      isMandatory: false,
      icon: 'mdi-view-grid-plus-outline',
      children: []
    },
    {
      component: VeStack,
      isSingle: false,
      isMandatory: false,
      propsValues: {
        ...defaultBreakpoints.reduce((acc, bp) => ({
          ...acc,
          ...{
            [camelCase(`flow-${bp}`)]: ['row', 'column']
          }
        }), { flow: ['row', 'column'] })
      },
      blockName: 'Stack',
      icon: 'mdi-view-sequential-outline',
      children: []
    }
  ])
};
