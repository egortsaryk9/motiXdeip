<template>
  <v-sheet>
    <v-btn
      class="mt-2 ml-2"
      icon
      style="pointer-events: all"
      @click="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <vex-section max-width="800" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title :title="title" />

        <users-form
          :user="userId"
          :schema="schema"
          :mode="mode"
          @success="handleSuccess"
          @error="handleError"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { AdminUsersForm } from '@/casimir-framework/modules/users';
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { formMixin, filterObjectKeys } from '@/casimir-framework/all';
  import { ViewMode } from '@/casimir-framework/vars';


  export default {
    name: 'AdminUsersForm',


    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      AdminUsersForm
    },

    props: {
      userId: {
        type: String,
        required: false
      },

      ...filterObjectKeys(formMixin.props, ['mode'])
    },

    computed: {
      isEditMode() { return this.mode === ViewMode.EDIT; },
      title() {
        return !this.isEditMode
          ? this.$t('admin.collections.form.create')
          : this.$t('admin.collections.form.update');
      },
      schema() {
        return this.$layouts.getMappedData('user.form')?.value;
      },
      user() {
        if (!this.isEditMode) {
          return null;
        }
        return this.$store.getters['users/one'](this.userId);
      }
    },

    methods: {
      handleSuccess() {
        const messageKey = !this.isEditMode
          ? 'successCreate'
          : 'successUpdate';

        this.$notifier.showSuccess(this.$t(`admin.collections.form.${messageKey}`));
        this.$router.push({
          name: 'admin.collections',
        });
      },

      handleError() {
        const messageKey = !this.isEditMode
          ? 'errorCreate'
          : 'errorUpdate';

        this.$notifier.showError(this.$t(`admin.collections.form.${messageKey}`));
        this.$router.push({
          name: 'admin.collections',
        });
      },
    }

  };
</script>
