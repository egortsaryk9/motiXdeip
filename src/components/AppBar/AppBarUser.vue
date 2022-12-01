<template>
  <ve-stack flow="column" gap="8">
    <m-btn
      v-if="$isGuest"
      kind="secondary"
      small
      active-class="no-active"
      :to="{ name: 'signIn' }"
    >
      {{ $t('auth.signIn') }}
    </m-btn>

    <template v-if="$isUser">
      <v-menu
        bottom
        left
        offset-y
        min-width="220"
      >
        <template #activator="{ on }">
          <m-btn
            kind="tetriary"
            small
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </m-btn>
        </template>

        <v-list dense active-class="primary">
          <v-list-item
            v-for="(item, index) of userMenu"
            :key="'nav-tab-' + index"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-if="item.icon">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.label }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isModerator" :to="{ name: 'moderation' }">
            <v-list-item-icon>
              <v-icon>mdi-thumbs-up-down</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('components.appBar.moderation') }}</v-list-item-title>
          </v-list-item>

          <template v-if="$currentUser.isAdmin">
            <v-divider />
            <v-list-item :to="{ name: 'admin' }">
              <v-list-item-icon>
                <v-icon>mdi-account-tie</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('components.appBar.admin') }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-divider />

          <v-list-item @click="handleSignOut">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('auth.signOut') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </template>
  </ve-stack>
</template>

<script>
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '../MBtn';

  export default {
    name: 'AppBarUser',

    components: {
      VeStack,
      MBtn
    },

    data() {
      return {
      };
    },

    computed: {

      userMenu() {
        return [
          {
            label: this.$t('components.appBar.submitAsset'),
            icon: 'mdi-image',
            to: { name: 'assetCreate' }
          },
        ];
      },

      isModerator() {
        return this.$store.getters['isModerator'];
      },

    },

    methods: {

      handleSignOut() {
        this.$store.dispatch('auth/signOut');
      },
      
    }
  };
</script>
