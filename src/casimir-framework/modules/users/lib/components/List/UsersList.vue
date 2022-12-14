<template>
  <users-data-provider
    v-bind="providerProps"
  >
    <template #default="{users, loading}">
      <v-data-table
        :headers="tableHeaders"
        :items="users"
        :loading="loading"
        disable-sort
        disable-pagination
        hide-default-footer
        @click:row="handleRowClick"
      >

        <template #item.id="{item}">
          <span>{{ item._id }}</span>
        </template>

        <template #item.email="{item}">
          <span>{{ item.email }}</span>
        </template>

        <template #item.actions="{item}">
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

          <vex-tooltip
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
        </template>
      </v-data-table>
    </template>
  </users-data-provider>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';
  import { VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import UsersDataProvider from '../DataProvider';

  /**
   * Users list component
   */
  export default defineComponent({
    name: 'UsersList',

    components: {
      UsersDataProvider,
      VexTooltip
    },

    props: {
      ...UsersDataProvider.options.props
    },

    data() {
      return {
        tableHeaders: [
          {
            text: this.$t('module.users.list.id'),
            value: 'id',
          },
          {
            text: this.$t('module.users.list.email'),
            value: 'email',
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
        return getBindableProps.call(this, UsersDataProvider.options.props);
      }
    },

    methods: {

      handleEditClick(user) {
        /**
         * Triggers when user clicks the edit button
         *
         * @property {Object} user
         */
        this.$emit('click-edit', user);
      },

      handleViewClick(user) {
        /**
         * Triggers when user clicks the view button
         *
         * @property {Object} nftCollection
         */
        this.$emit('click-view', user);
      },

      handleRowClick(user) {
        /**
         * Triggers when user clicks the row
         *
         * @property {Object} user
         */
        this.$emit('click-row', user);
      }
      
    }
  });
</script>
