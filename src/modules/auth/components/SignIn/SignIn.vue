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
          {{ $t('auth.signInToContinue') }}
        </div>
        <auth-sign-in
          @success="handleSignInSuccess"
          @error="handleSignInError" 
         />
      </ve-stack>
    </v-card>
  </v-sheet>
</template>

<script>
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { AuthSignIn } from '@/casimir-framework/modules/auth';

  export default {
    name: 'SignIn',
    components: {
      AuthSignIn,
      VeStack
    },

    methods: {
      handleSignInSuccess() {
        this.$notifier.showSuccess(this.$t('auth.signInSuccess'));
        this.$router.push({ name: 'home' });
      },
      handleSignInError(err) {
        this.$notifier.showError(err);
      }
    }
  };
</script>
