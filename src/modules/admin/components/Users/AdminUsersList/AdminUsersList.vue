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

      <users-list>
        <template v-slot:default="{users, loading}">

          <v-data-table
            :headers="tableHeaders"
            :items="users"
            :loading="loading"
            disable-sort
            disable-pagination
            hide-default-footer
            @click:row="onRowClick"
          >

            <template #item.id="{item}">
              <span>{{ item._id }}</span>
            </template>

            <template #item.email="{item}">
              <span>{{ item.email }}</span>
            </template>

            <template #item.actions="{item}">
              <vex-tooltip
                :tooltip="$t('module.nftCollections.list.view')"
                bottom
              >
                <v-btn
                  icon
                  small
                  @click.stop="onViewClick(item)"
                >
                  <v-icon small>
                    mdi-eye-outline
                  </v-icon>
                </v-btn>
              </vex-tooltip>

              <vex-tooltip
                :tooltip="$t('module.nftCollections.list.edit')"
                bottom
              >
                <v-btn
                  icon
                  small
                  @click.stop="onEditClick(item)"
                >
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </vex-tooltip>
            </template>
          </v-data-table>
        </template>
      </users-list>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { UsersList } from '@/casimir-framework/modules/users';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle, VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';


  export default {
    name: 'AdminUsers',
    components: {
      UsersList,
      MBtn,
      VeStack,
      VexSection,
      VexSectionTitle,
      VexTooltip
    },
    data() {
      return {
        tableHeaders: [
          {
            text: this.$t('module.users.list.id'),
            value: 'id',
          },
          {
            text: this.$t('module.users.list.email'),
            value: 'email',
          },
          {
            value: 'actions',
            width: '20%'
          }
        ]
      }
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
