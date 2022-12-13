<template>
  <vex-section>
    <ve-stack :gap="24">
      <vex-section-title
        :title="$t('admin.users.title')"
        class="align-center"
      >

        <template #append>
          <m-btn
            small
            kind="primary"
            depressed
            :to="{ name: 'admin.users.create' }"
          >
            <v-icon left>
              mdi-account-plus
            </v-icon>
            {{ $t('admin.users.form.new') }}
          </m-btn>
        </template>
      </vex-section-title>

      <users-list 
        @click-row="onRowClick"
        @click-edit="onEditClick"
        @click-view="onViewClick"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { UsersList } from '@/casimir-framework/modules/users';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';


  export default {
    name: 'AdminUsers',
    components: {
      UsersList,
      MBtn,
      VeStack,
      VexSection,
      VexSectionTitle
    },
    methods: {
      onEditClick(user) {
        this.$router.push({
          name: 'admin.users.edit',
          params: { userId: user._id }
        });
      },
      onViewClick(user) {
        this.$router.push({
          name: 'admin.users.details',
          params: { userId: user._id }
        });
      },
      onRowClick(user) {
      }
    }
  };
</script>
