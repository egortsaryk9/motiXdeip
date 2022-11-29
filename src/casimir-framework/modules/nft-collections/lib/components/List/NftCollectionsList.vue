<template>
  <nft-collections-data-provider
    v-bind="providerProps"
  >
    <template #default="{nftCollections, loading}">
      <v-data-table
        :headers="tableHeaders"
        :items="nftCollections"
        :loading="loading"
        disable-sort
        disable-pagination
        hide-default-footer
        @click:row="handleRowClick"
      >

        <template #item.id="{item}">
          <span>{{ item._id }}</span>
        </template>

        <template #item.actions="{item}">
          <vex-tooltip
            v-if="isOwner(item)"
            :tooltip="$t('module.nftCollections.list.edit')"
            bottom
          >
            <v-btn
              icon
              small
              @click.stop="handleEditClick(item)"
            >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </vex-tooltip>

          <vex-tooltip
            :tooltip="$t('module.nftCollections.list.view')"
            bottom
          >
            <v-btn
              icon
              small
              @click.stop="handleViewClick(item)"
            >
              <v-icon small>
                mdi-eye-outline
              </v-icon>
            </v-btn>
          </vex-tooltip>
        </template>
      </v-data-table>
    </template>
  </nft-collections-data-provider>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';
  import { VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import NftCollectionsDataProvider from '../DataProvider';

  /**
   * NFT items list component
   */
  export default defineComponent({
    name: 'NftCollectionsList',

    components: {
      NftCollectionsDataProvider,
      VexTooltip
    },

    props: {
      ...NftCollectionsDataProvider.options.props
    },

    data() {
      return {
        tableHeaders: [
          {
            text: this.$t('module.nftCollections.list.id'),
            value: 'id',
          },
          {
            value: 'actions',
            width: '20%'
          }
        ]
      };
    },

    computed: {
      /**
       * Get computed provider properties
       */
      providerProps() {
        return getBindableProps.call(this, NftCollectionsDataProvider.options.props);
      }
    },

    methods: {
      /**
       * Check if current user is NFT Collection owner
       *
       * @param {Object} nftCollection
       */
      isOwner(nftCollection) {
        return true // nftCollection.ownerId === 'this.$currentUser._id';
      },

      handleEditClick(nftCollection) {
        /**
         * Triggers when user clicks the edit button
         *
         * @property {Object} nftCollection
         */
        this.$emit('click-edit', nftCollection);
      },

      handleViewClick(nftCollection) {
        /**
         * Triggers when user clicks the view button
         *
         * @property {Object} nftCollection
         */
        this.$emit('click-view', nftCollection);
      },

      handleRowClick(nftCollection) {
        /**
         * Triggers when user clicks the row
         *
         * @property {Object} nftCollection
         */
        this.$emit('click-row', nftCollection);
      }
      
    }
  });
</script>
