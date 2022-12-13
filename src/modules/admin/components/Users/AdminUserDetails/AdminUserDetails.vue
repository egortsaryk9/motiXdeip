<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="User Details"
      >
        <template #append>
          <m-btn
            small
            kind="primary"
            outlined
            :to="{ name: 'admin.users.edit', userId: userId }"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
          </m-btn>
        </template>
      </vex-section-title>

      <user-details 
        :user="user"
        :schema="schema"
      />

    </ve-stack>
  </vex-section>
</template>

<script>

  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '@/components';
  import { UserDetails } from '@/casimir-framework/modules/users';

  export default {
    name: 'AdminUserDetails',

    components: {
      UserDetails,
      MBtn,
      VexSection,
      VexSectionTitle,
      VeStack,
    },

    props: {
      userId: {
        type: String,
        default: null
      },
    },

    computed: {

      schema() {
        return this.$layouts.getMappedData('user.details')?.value;
      },

      user() {
        return this.$store.getters['users/one'](this.userId);
      },

      isEditAvailable() {
        return this.user && this.user.creatorId === this.$currentUser._id;
      }

    },

    methods: {

      async getUser() {
        try {
          await this.$store.dispatch('users/getOne', this.userId);
        } catch (err) {
          console.error(err);
        }
      },
    },

    async created() {
      await this.getUser();
    },

  };
</script>
