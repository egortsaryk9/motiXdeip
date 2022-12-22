<template>
  <vex-section>
    <ve-stack :gap="24">
      <vex-section-title
        :title="$t('admin.attributes.title')"
        class="align-center"
      >
        <template #append>
          <m-btn
            small
            kind="primary"
            outlined
            class="mr-4"
            :to="{ name: 'admin.attributes.settings' }"
          >
            <v-icon left>
              mdi-tune-vertical
            </v-icon>
            {{ $t('admin.attributes.settings') }}
          </m-btn>
          <m-btn
            small
            kind="primary"
            depressed
            :to="{ name: 'admin.attributes.create' }"
          >
            <v-icon left>
              mdi-puzzle-plus-outline
            </v-icon>
            {{ $t('admin.attributes.attribute.create') }}
          </m-btn>
        </template>
      </vex-section-title>

      <ve-stack>
        <v-sheet color="neutral lighten-5" rounded class="pa-6">
          <v-row>
            <v-col cols="2">
              <v-select
                v-model.number="filter.scope"
                label="Scope"
                :items="scopesSelectorList"
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="filter.title"
                label="Search"
                hide-details
              />
            </v-col>
          </v-row>
        </v-sheet>

        <attributes-list>
          <template #default="{loading}">
            <v-data-table
              :items="filteredAttributes"
              :headers="tableHeaders"
              :loading="loading"

              disable-sort
              disable-pagination
              hide-default-footer
              :search="filter.title"
            >
              <template #item.scope="{ item }">
                <template v-if="scopeTypeInfo(item.scope)">
                  <v-chip
                    small
                    readonly
                    :color="scopesPalette[item.scope].background"
                  >
                    {{ scopeTypeInfo(item.scope).label }}
                  </v-chip>
                </template>
                <template v-else>
                  <span class="error--text">Scope '{{ item.scope }}' not found</span>
                </template>
              </template>

              <template #item.type="{ item }">
                <v-chip small readonly>
                  {{ attrTypeInfo(item.type).label }}
                </v-chip>
              </template>

              <template #item.markers="{ item }">
                <!-- 'isEditable',-->
                <!-- 'isFilterable',-->
                <!-- 'isHidden',-->
                <!--  isRequired',-->
                <!-- 'isSystem'-->

                <ve-stack flow="column" :gap="8" class="justify-end">
                  <vex-tooltip v-if="!item.isEditable" top tooltip="Not editable after first fill">
                    <v-icon small class="text--disabled">
                      mdi-file-cancel-outline
                    </v-icon>
                  </vex-tooltip>

                  <vex-tooltip v-if="item.isFilterable" top tooltip="Used in filter">
                    <v-icon small class="text--disabled">
                      mdi-filter-variant
                    </v-icon>
                  </vex-tooltip>

                  <vex-tooltip v-if="item.isHidden" top tooltip="Hidden field">
                    <v-icon small class="text--disabled">
                      mdi-eye-off-outline
                    </v-icon>
                  </vex-tooltip>

                  <vex-tooltip v-if="item.isRequired" top tooltip="If this field is being used in a form layout, the user must provide a value during submission">
                    <v-icon small class="text--disabled">
                      mdi-asterisk
                    </v-icon>
                  </vex-tooltip>
                  <!-- <vex-tooltip v-if="item.blockchainFieldMeta" top tooltip="Form required.">-->
                  <!-- <v-icon small class="text&#45;&#45;disabled">-->
                  <!-- mdi-shield-alert-outline-->
                  <!-- </v-icon>-->
                  <!-- </vex-tooltip>-->

                  <vex-tooltip v-if="item.isSystem" top tooltip="System field">
                    <v-icon small class="text--disabled">
                      mdi-shield-alert-outline
                    </v-icon>
                  </vex-tooltip>
                </ve-stack>
              </template>

              <template #item.actions="{ item }">
                <ve-stack flow="column" :gap="8" class="justify-end">
                  <v-btn
                    icon
                    x-small
                    @click="onClickEdit(item)"
                  >
                    <v-icon
                      small
                    >
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    x-small
                    :disabled="item.isSystem"
                    @click="onClickRemove(item._id)"
                  >
                    <v-icon
                      small
                    >
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </ve-stack>
              </template>
            </v-data-table>
          </template>
        </attributes-list>
      </ve-stack>

    </ve-stack>
  </vex-section>
</template>

<script>
  import { AttributesList } from '@/casimir-framework/modules/attributes';
  import { genColorsPalette } from '@/casimir-framework/all';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle, VexTooltip } from '@/casimir-framework/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'AdminAttributesList',

    components: {
      AttributesList,
      MBtn,
      VeStack,
      VexSection,
      VexSectionTitle,
      VexTooltip
    },

    data() {
      return {
        // TODO: suport this filter on the backend query
        filter: {
          scope: 0,
          title: ""
        }
      };
    },

    computed: {
      /**
       * Get computed attributes list
       */
      filteredAttributes() { // TODO: replace this filter with the backend query
        const filter = this.filter.scope ? { scope: this.filter.scope } : {};
        return this.$store.getters['attributes/list'](filter);
      },
      /**
       * Get computed registry attributes list
       */
      registryAttributes() {
        return this.$store.getters['attributesRegistry/list']();
      },
      /**
       * Get computed registry scopes list
       */
      registryScopes() {
        return this.$store.getters['scopesRegistry/list']();
      },
      /**
       * Get computed scopes selector list
       */
      scopesSelectorList() {
        return [
          { value: 0, text: 'All' },
          ...this.registryScopes.map((s) => ({ text: s.label, value: s.type }))
        ];
      },
      /**
       * Get computed scopes palette
       */
      scopesPalette() {
        return genColorsPalette({
          palette: ['#FFC255', '#FF8863', '#FF5484', '#CD3DA9', '#6846C0'],
          colorsCount: this.registryScopes.length
        }).reduce((acc, color, index) => ({
          ...acc,
          ...{ [this.registryScopes[index].type]: color }
        }), {});
      },
      /**
       * Get computed tableHeaders array
       */
      tableHeaders() {
        return [
          {
            text: 'Scope',
            value: 'scope',
            width: 1
          },
          {
            text: 'Type',
            value: 'type',
            width: 1
          },
          {
            text: 'Title',
            align: 'start',
            sortable: true,
            value: 'title'
          },
          {
            text: 'Short title',
            align: 'start',
            sortable: true,
            value: 'shortTitle'
          },
          {
            align: 'start',
            sortable: false,
            value: 'markers'
          },
          {
            align: 'end',
            sortable: false,
            value: 'actions'
          }
        ];
      }
    },

    methods: {
      /**
       * Get attribute info by attribute type
       *
       * @param {string} attrType
       */
      attrTypeInfo(attrType) {
        return this.$store.getters['attributesRegistry/one'](attrType)
          || { type: attrType, label: attrType };
      },
      /**
       * Get scope info by scope type
       *
       * @param {string} scopeType
       */
      scopeTypeInfo(scopeType) {
        return this.$store.getters['scopesRegistry/one'](scopeType);
      },

      isAttributeInSettings(attributeId) {
        return this.$store.getters['attributes/settings']
          ?.map?.find((setting) => setting.value === attributeId);
      },

      onClickEdit({ _id }) {
        this.$router.push({
          name: 'admin.attributes.edit',
          params: {
            attributeId: _id
          }
        });
      },

      async onClickRemove(attributeId) {
        const message = this.isAttributeInSettings(attributeId)
          ? this.$t('admin.attributes.attribute.removeInSettings')
          : this.$t('admin.attributes.attribute.remove');
        try {
          const isConfirmed = await this.$confirm(message, {
            title:
              this.$t('admin.attributes.attribute.removeTitle')
          });
          if (!isConfirmed) return;
          await this.$store.dispatch('attributes/remove', attributeId);
          this.$notifier.showSuccess(this.$t('admin.attributes.attribute.removeSuccess'));
        } catch (error) {
          console.error(error);
          this.$notifier.showError(this.$t('admin.attributes.attribute.removeError'));
        }
      }
    }
  };
</script>
