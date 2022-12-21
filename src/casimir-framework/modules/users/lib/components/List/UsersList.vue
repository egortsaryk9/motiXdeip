<template>
  <users-data-provider
    v-bind="providerProps"
  >
    <template #default="{users, loading}">
      <slot 
        v-bind:users="users"
        v-bind:loading="loading"
      />
    </template>
  </users-data-provider>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { getBindableProps } from '@/casimir-framework/plugins/VuetifyExtended/lib/composables/props';
  import UsersDataProvider from '../DataProvider';

  /**
   * Users list component
   */
  export default defineComponent({
    name: 'UsersList',

    components: {
      UsersDataProvider,
    },

    props: {
      ...UsersDataProvider.options.props
    },

    computed: {
      /**
       * Get computed provider properties
       */
      providerProps() {
        return getBindableProps.call(this, UsersDataProvider.options.props);
      }
    }
  });
</script>
