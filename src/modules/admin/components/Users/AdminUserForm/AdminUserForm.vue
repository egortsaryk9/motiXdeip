<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="User Form"
      />
      <v-sheet>
        <vex-section 
          max-width="800" 
          class="mx-auto pa-0"
        >
          <ve-stack :gap="32">
            <vex-section-title :title="!isEditMode 
              ? $t('userProfile.form.create')
              : $t('userProfile.form.update')"
             />

            <user-form
              :user="user"
              :schema="schema"
              :mode="mode"
              @success="handleSuccess"
              @error="handleError"
              @cancel="handleCancel"
            />

          </ve-stack>
        </vex-section>
      </v-sheet>
      <router-view />
    </ve-stack>
  </vex-section>
</template>


<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { UserForm } from '@/casimir-framework/modules/users';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { ViewMode } from '@/casimir-framework/vars';
  import { formMixin, filterObjectKeys } from '@/casimir-framework/all';


  export default {
    name: 'AdminUserForm',
    components: {
      UserForm,
      VexSection,
      VexSectionTitle,
      VeStack,
    },

    props: {

      userId: {
        type: String,
        required: false
      },

      ...filterObjectKeys(formMixin.props, ['mode']),
      
    },

    computed: {

      isEditMode() { 
        return this.mode === ViewMode.EDIT; 
      },

      schema() {
        return this.$layouts.getMappedData('user.form')?.value;
      },

      user() {
        return this.isEditMode 
          ? this.$store.getters['users/one'](this.userId)
          : null;
      }

    },

    methods: {

      handleSuccess() {
        const message = !this.isEditMode 
          ? this.$t(`userProfile.form.successCreate`)
          : this.$t(`userProfile.form.successUpdate`)

        this.$notifier.showSuccess(message);
        this.$router.push({ name: 'admin.users' });
      },
      
      handleError(err) {
        console.error(err);

        const message = !this.isEditMode 
          ? this.$t(`userProfile.form.errorCreate`)
          : this.$t(`userProfile.form.errorUpdate`)

        this.$notifier.showError(message);
      },
      
      handleCancel() {
        this.$router.back();
      }

    },

    async created() {
      if (this.isEditMode) {
        await this.$store.dispatch('users/getOne', this.userId);
      } 
    }

  };
</script>