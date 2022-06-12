<!--表格代码规范-->
<template>
  <div>
    <q-table v-model:selected="tableSelected"
             :columns="columns"
             :loading="tableData.pagination.loading"
             :rows="tableData.results"
             class="q-pa-none shadow-0"
             hide-pagination
             row-key="id"
             selection="multiple"
    >
      <template v-slot:top>
        <div class="flex justify-start" style="width: 100%">
          <div>
            <q-input v-model="params.search" :debounce="350" :label="$t('search')"
                     color="dark" dense @update:model-value="onSearch">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
        </div>
      </template>
    </q-table>
    <div v-if="tableData.pagination.total_pages>0" class="row justify-center q-mt-md">
      <q-pagination
        v-model="tableData.pagination.current_page"
        :max="tableData.pagination.total_pages"
        color="grey-8"
        direction-links
        max-pages="10"
        size="md"
        @update:model-value="onUpdatePagination"
      />
    </div>
  </div>
</template>
<script>
import {nextTick, onMounted, ref} from "vue";
import {listResStruct} from "src/utils/struct";
import {listDatabase} from "src/api/database";


export default {
  name: "DatabaseTable",
  setup(props, {emit}) {

    function t(msg) {
      return msg
    }

    const columns = [
      {name: 'name', label: t('name'), align: 'left', field: 'name',},
      {name: 'username', label: t('username'), field: 'username',},
      {name: 'password', label: t('password'), field: 'password',},
      {name: 'database_type_text', label: t('database_type_text'), field: 'database_type_text',},
    ]
    const tableData = ref(listResStruct())
    const params = ref({
      'page': 1,
      'search': null
    })
    const tableSelected = ref([])

    function onSearch(key) {
      params.value.search = key
      requestInstance()
    }

    function onUpdatePagination(page) {
      params.value.page = page
      requestInstance()
    }

    function requestInstance() {
      // 终点改写这里
      tableData.value.pagination.loading = true
      // requestXXXX 替换为实际的函数
      listDatabase(params.value).then(res => {
        tableData.value = res
      }).catch(err => {

      }).finally(() => {
        nextTick(() => {
          tableData.value.pagination.loading = false
        })
      })
    }

    onMounted(() => {
      tableData.value.data = []
      nextTick(() => {
        requestInstance()
      })

    })
    return {
      /* 导出这一行 */
      tableData, params, tableSelected, onSearch, onUpdatePagination, columns,
    }
  }
}
</script>

<style scoped>

</style>
