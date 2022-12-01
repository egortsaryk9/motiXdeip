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
          :key="forceUpdateKey"
          v-model="formData"
          :schema="schema"
          :schema-data="schemaData"
        />

        <v-divider />

        <div class="d-flex">
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="loading"
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
  import { formFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { VeStack, VeRawDisplay } from '@/casimir-framework/vue-elements';
  import { ViewMode } from '@/casimir-framework/vars';
  import { defineComponent } from '@/casimir-framework/all';


  /**
   * NFT item form component
   */
  export default defineComponent({
    name: 'UserForm',

    components: {
      LayoutRenderer,
      VeStack,
      VeRawDisplay
    },

    mixins: [formFactory('user', 'user')],

    props: {
      /**
       * Cancel label
       *
       * @example 'Cancel'
       */
      user: {
        type: Object,
        default: () => {}
      },

      /**
      cancelLabel: {
        type: String,
        default() {
          return this.$t('module.users.form.cancel');
        }
      },
      /**
       * Submit label
       *
       * @example 'Submit'
       */
      submitLabel: {
        type: String,
        default() {
          return null;
        }
      },
      // override mixin prop
      /**
       * View mode
       *
       * @example 'Edit'
       */
      mode: {
        type: [String, Number],
        default: ViewMode.EDIT,
        validator(value) {
          return value === ViewMode.EDIT;
        }
      }
    },

    computed: {
      /**
       * Get computed text for submit label
       */
      submitLabelText() {
        if (this.submitLabel) {
          return this.submitLabel;
        }

        return this.$t('module.users.form.update');
      }
    },

    methods: {
      /**
       * Triggers when user submits form
       *
       * @event submit
       */
      async onSubmit() {
        this.loading = true;

        await this.updateUser();

        this.loading = false;
      },
      /**
       * Update user
       */
      async updateUser() {
        const payload = {
          initiator: this.$currentUser,
          data: this.lazyFormData
        };

        try {
          await this.$store.dispatch('users/update', payload);
          this.emitSuccess();
        } catch (err) {
          this.emitError(err);
        }
      },

      emitSuccess() {
        /**
         * Success event
         */
        this.$emit('success');
      },

      emitError(err) {
        console.error(err);
        /**
       * Triggers when error occurs
       *
       * @property {Error} err
       */
        this.$emit('error', err);
      },
      /**
       * Triggers by clicking on cancel button
       *
       * @event click
       */
      handleCancelClick() {
        this.$emit('cancel');
        this.restoreOldValue(true);
      }
    }
  });
</script>
