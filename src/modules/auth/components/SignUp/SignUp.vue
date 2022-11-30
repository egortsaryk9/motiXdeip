<template>
  <v-sheet
    min-height="100vh"
    class="d-flex flex-column align-center justify-center pa-16 transparent"
  >
    <v-card
      class="mx-auto pa-12 mb-6"
      outlined
      max-width="416"
      width="100%"
    >
      <ve-stack :gap="32" class="text-center">
        <div class="text-h3">
          {{ $t('module.auth.signUp') }}
        </div>
        <auth-sign-up
          @success="handleSignUpSuccess"
          @error="handleSignUpError" 
        />
      </ve-stack>
    </v-card>
  </v-sheet>
</template>

<script>
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { AuthSignUp } from '@/casimir-framework/modules/auth';

  export default {
    name: 'SignUp',
    components: {
      AuthSignUp,
      VeStack
    },

    methods: {
      handleSignUpSuccess() {
        this.$notifier.showSuccess(this.$t('auth.signUpSuccess'));
        this.$router.push({ name: 'home' });
      },
      handleSignUpError(err) {
        this.$notifier.showError(err);
      }
    }
  };
</script>
