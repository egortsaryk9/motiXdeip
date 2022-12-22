<template>
  <div>
    <component :is="tag">
      <!--
        @slot
        @binding {Object} slotProps
      -->
      <slot v-bind="slotProps" />
    </component>
    <infinite-loading :identifier="infiniteScrollId" @infinite="getList">
      <template #spinner>
        <v-progress-circular
          indeterminate
          class="my-8"
        />
      </template>

      <template #no-results class="my-8">
        {{ $t('module.users.list.noResults') }}
      </template>
    </infinite-loading>
  </div>
</template>

<script>
  import { defineComponent, dataProviderFactory } from '@/casimir-framework/all';

  export default defineComponent({
    name: 'UsersDataProvider',

    mixins: [dataProviderFactory('users/getList', `users-list-${new Date().getTime()}`)],

    computed: {
      /**
       * Get computed binding slot properties
       */
      slotProps() {
        return {
          users: this.list,
          loading: this.loading
        };
      }
    },

  });
</script>
