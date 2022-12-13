<template>
  <validation-observer 
    v-slot="{ handleSubmit, invalid }"
    ref="observer"
    tag="div"
  >
    <v-form 
      :disabled="loading" 
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <ve-stack>
        <layout-renderer
          v-if="schema.length"
          v-model="formData"
          :key="forceUpdateKey"
          :schema="schema"
          :schema-data="schemaData"
        />

        <v-divider />

        <div class="d-flex">
          <v-spacer />
          <v-btn
            :disabled="loading || disabled"
            color="primary"
            text
            class="mr-2"
            @click="handleCancelClick"
          >
            {{ cancelLabel }}
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            :disabled="disabled || untouched || invalid"
            :loading="loading"
          >
            {{ submitLabelText }}
          </v-btn>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>

  import { attributedFormFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { defineComponent } from '@/casimir-framework/all';
  import { ViewMode } from '@/casimir-framework/vars';

  /**
   * User Form component
   */
  export default defineComponent({
    name: 'UserForm',

    components: {
      VeStack,
      LayoutRenderer,
    },

    mixins: [attributedFormFactory('user', 'user')],

    props: {
      /**
       * The 'Cancel' button label
       *
       * @example 'Cancel'
       */
      cancelLabel: {
        type: String,
        default() {
          return this.$t('module.users.form.cancel');
        }
      },

      /**
       * The 'Submit' button label
       *
       * @example 'Submit'
       */
      submitLabel: {
        type: String,
        default() {
          return null;
        }
      },
    },

    computed: {
      isEditMode() { 
        return this.mode === ViewMode.EDIT; 
      },

      /**
       * Get computed label for the 'Submit' button
       */
      submitLabelText() {
        if (this.submitLabel) {
          return this.submitLabel;
        }
        return this.isEditMode
          ? this.$t('module.users.form.update')
          : this.$t('module.users.form.create');
      }
    },

    methods: {

      /**
       * Triggers when the form is submitted
       *
       * @event success
       * @event error
       */
      async onSubmit() {
        this.loading = true;

       if (!this.isEditMode) {
          await this.createUser();
        } else {
          await this.updateUser();
        }
        
        this.loading = false;
      },

      /**
       * Create User
       *
       * @event success
       * @event error
       */
      async createUser() {
        try {
          debugger;
          const { attributes } = this.lazyFormData;
          const email = this.$attributes.getMappedData('user.email', attributes)?.value;
          if (!email) {
            throw new Error("attribute mapping for 'user.email' is not defined, or 'email' value is not specified");
          }
          debugger;
          const payload = {
            initiator: this.$currentUser,
            data: { ...this.lazyFormData, email, pubKey: "tmp" }
          };
          const { _id } = await this.$store.dispatch('users/create', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },

      /**
       * Update User
       * 
       * @event success
       * @event error
       */
      async updateUser() {
        try {
          const { attributes } = this.lazyFormData;
          const email = this.$attributes.getMappedData('user.email', attributes)?.value;
          if (!email) {
            throw new Error("attribute mapping for 'user.email' is not defined, or 'email' value is not specified");
          }
          const payload = {
            initiator: this.$currentUser,
            data: { ...this.lazyFormData, email, pubKey: "tmp" }
          };
          const { _id } = await this.$store.dispatch('users/update', payload);
          this.emitSuccess(_id);
        } catch (err) {
          this.emitError(err);
        }
      },

      /**
       * Triggers when submission is succeeded
       * 
       * @param {string} _id
       * @event success
       */
      emitSuccess(_id) {
        this.$emit('success', _id);
      },

      /**
       * Triggers when submission is failed
       * 
       * @param {Error} err
       * @event error
       */
      emitError(err) {
        this.$emit('error', err);
      },
      
      /**
       * Triggers when the 'Cancel' button is clicked
       * 
       * @event cancel
       */
      emitCancel() {
        this.$emit('cancel');
      },

      /**
       * Handle cancelation
       */
      handleCancelClick() {
        this.emitCancel();
      }
    }
  });
</script>
