<template>
  <vex-section>
    <ve-stack :gap="24">
      <vex-section-title
        :title="$t('admin.collections.title')"
        class="align-center"
      >
        <template #append>
          <m-btn
            small
            kind="primary"
            outlined
            class="mr-4"
            :to="{ name: 'admin.collections.settings' }"
          >
            <v-icon left>
              mdi-tune-vertical
            </v-icon>
            {{ $t('admin.collections.settings.settings') }}
          </m-btn>
          <m-btn
            small
            kind="primary"
            depressed
            :to="{ name: 'admin.collections.create' }"
          >
            <v-icon left>
              mdi-folder-multiple-outline
            </v-icon>
            {{ $t('admin.collections.form.new') }}
          </m-btn>
        </template>
      </vex-section-title>

      <nft-collections-list>
        <template v-slot:default="{nftCollections, loading}">

          <v-data-table
            :headers="tableHeaders"
            :items="nftCollections"
            :loading="loading"
            disable-sort
            disable-pagination
            hide-default-footer
            @click:row="onRowClick"
          >

            <template #item.id="{item}">
              <span>{{ item._id }}</span>
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
      </nft-collections-list>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { NftCollectionsList } from '@/casimir-framework/modules/nft-collections';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle, VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';


  export default {
    name: 'AdminNftCollectionsList',
    components: {
      NftCollectionsList,
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
            text: this.$t('module.nftCollections.list.id'),
            value: 'actions',
            value: 'id',
          },
          {
            value: 'actions',
            width: '20%'
          }
        ]
      };
    },
    methods: {
      onEditClick(nftCollection) {
        this.$router.push({
          name: 'admin.collections.edit',
          params: { nftCollectionId: nftCollection._id }
        });
      },
      onViewClick(nftCollection) {
        this.$router.push({
          name: 'admin.collections.details',
          params: { nftCollectionId: nftCollection._id }
        });
      },
      onRowClick(nftCollection) {
      }
    }
  };
</script>
