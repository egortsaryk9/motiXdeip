<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('moderation.title')"
      />
      <v-tabs
        background-color="transparent"
        centered
        fixed-tabs
        class="transparent"
      >
        <v-tab :to="{name: 'moderation.pending'}">
          {{ $t('moderation.pending') }}
        </v-tab>
        <v-tab :to="{name: 'moderation.reviewed'}">
          {{ $t('moderation.reviewed') }}
        </v-tab>
      </v-tabs>
      <router-view />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { awaitForStore } from '@/casimir-framework/all';

  export default {
    name: 'ModerationPage',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack
    },

    async created() {
      await awaitForStore(this.$store, 'currentPortal/data');
      this.checkRole();
    },

    methods: {
      checkRole() {
        if (!this.$store.getters['isModerator']) {
          this.$router.push({ name: 'home' });
        }
      }
    }
  };
</script>
