<template>
  <q-dialog v-model="ui.NewWebsiteDialog.show">
    <div class="bg-blue-grey-1" style="min-width: 360px">
      <div class="flex justify-between bg-blue-grey">
        <div class="text-body1 text-white q-pa-md">Add new website</div>
        <q-btn v-close-popup color="white" flat icon="close"></q-btn>
      </div>
      <div class="flex flex-center">
        <NewWebsite></NewWebsite>
      </div>

    </div>

  </q-dialog>
  <div class="flex justify-between">
    <div class="q-gutter-sm">
      <q-btn :label="$t('New website')" color="blue" icon="add" @click="ui.NewWebsiteDialog.show = true"></q-btn>
      <q-btn v-if="ui.StartWebsiteBtn.show" :label="$t('Start')" color="green" icon="play_arrow"></q-btn>
      <q-btn v-if="ui.StartWebsiteBtn.show" :label="$t('ReStart')" color="blue-grey" icon="restart_alt"></q-btn>
      <q-btn v-if="ui.StopWebsiteBtn.show" :label="$t('Stop')" color="grey" icon="stop"></q-btn>
      <q-btn v-if="ui.DeleteWebsiteBtn.show" :label="$t('Delete')" color="red" icon="delete"></q-btn>
    </div>
    <div>
      <q-btn color="white" flat icon="sync" text-color="dark" @click="Public.loadingWebsiteTableData()"></q-btn>
    </div>
  </div>


  <q-table

    v-model:selected="data.websiteTable.selected"
    :columns="columns"
    :loading="ui.websiteTable.loading"
    :row-key="row => row.id"
    :rows="data.websiteTable.rows"
    :rows-per-page-options="[50,100,200,2500]"
    class="shadow-0"
    color="blue-grey"
    flat
    selection="multiple">

    <template v-slot:header-cell="props">
      <q-th class="text-body1 text-purple ">
        <q-td :class="`flex ${Public.formatColumnAlignCss(props.col.align)} no-wrap`" :props="props">
          {{ $t(props.col.label) }}
        </q-td>
      </q-th>
    </template>

    <template v-slot:body-cell-domain="props">
      <q-td :props="props">
        <div class="flex justify-start items-center q-gutter-sm" style="cursor: pointer">
          <div @click="Public.alert(props.value)">{{ props.value }}</div>
          <q-icon color="blue-grey" name="public" @click="Public.alert('settings')"></q-icon>
        </div>

      </q-td>
    </template>

    <template v-slot:body-cell-application="props">
      <q-td :props="props">
        <div class="flex justify-end items-center q-gutter-sm" style="cursor: pointer">
          <div @click="Public.alert(props.value)">{{ props.value }}</div>
          <q-icon color="blue-grey" name="o_settings" @click="Public.alert('settings')"></q-icon>
        </div>

      </q-td>
    </template>

    <template v-slot:body-cell-database="props">
      <q-td :props="props" @click="Public.alert(props.value.id)">
        <div class="flex justify-end items-center q-gutter-sm" style="cursor: pointer">
          <div>{{ props.value.name }}</div>
          <q-icon color="blue-grey" name="o_storage"></q-icon>
        </div>

      </q-td>
    </template>
    <template v-slot:body-cell-path="props">
      <q-td :props="props" @click="Public.alert(props.value.id)">
        <div class="flex justify-end items-center q-gutter-sm" style="cursor: pointer">
          <div>{{ props.value.path }}</div>
          <q-icon color="blue-grey" name="o_folder"></q-icon>
        </div>

      </q-td>
    </template>

    <template v-slot:body-cell-ssl="props">
      <q-td :props="props" @click="Public.alert(props.value)">
        <div class="flex justify-end items-center q-gutter-sm" style="cursor: pointer">
          <q-toggle :model-value="props.row.ssl" checkedIcon="enhanced_encryption"
                    color="green"
                    unchecked-icon="no_encryption"
                    @click="Public.switchSSL(props.row)"></q-toggle>
        </div>

      </q-td>
    </template>

  </q-table>

</template>

<script>
import {onMounted, ref, watchEffect} from "vue";
import {faker} from "@faker-js/faker";
import NewWebsite from "components/website/NewWebsite";
import {useQuasar} from "quasar";

let $q;

const columns = [

  {name: 'domain', label: 'Domain', align: 'left', field: 'name',},
  {name: 'application', label: 'Application', field: 'application', align: 'right'},
  {name: 'database', label: 'Database', field: 'database'},
  {name: 'path', label: 'Path', field: 'path'},
  {name: 'ssl', label: 'SSL', field: 'ssl'},
  {name: 'status', label: 'Status', field: 'status'}
]

const data = ref({
  websiteTable: {
    rows: [],
    selected: []
  }
})

const ui = ref({
  websiteTable: {
    loading: false
  },
  NewWebsiteDialog: {
    show: false
  },
  DeleteWebsiteBtn: {
    show: false
  },
  StopWebsiteBtn: {
    show: false
  },
  StartWebsiteBtn: {
    show: false
  }
})

const sleep = ms => new Promise(r => setTimeout(r, ms));

const Private = {
  _loadingWebsiteTableData: async function () {
    ui.value.websiteTable.loading = true
    let _data = []
    for (let i = 0; i <= 10000; i++) {
      let domain = faker.internet.domainName()
      let _item = {
        id: i,
        name: domain,
        application: faker.internet.domainWord(),
        database: {
          id: i,
          name: domain.replaceAll(".", "_")
        },
        path: {
          id: 1,
          path: '/var/www/' + domain
        },
        ssl: faker.datatype.boolean(),
        status: true
      }
      _data.push(_item)

    }
    await sleep(1000)
    data.value.websiteTable.rows = _data
    ui.value.websiteTable.loading = false
  },

}

const Public = {
  loadingWebsiteTableData: function () {
    Private._loadingWebsiteTableData()

  },
  alert: function (obj) {
    alert(obj)
  },
  formatColumnAlignCss: function (align) {
    if (align === "center") {
      return "justify-center"
    } else if (align === "left") {
      return "justify-start"
    } else {
      return "justify-end"
    }
  },
  switchSSL: function (row) {

    $q.loading.show({
      boxClass: 'apple-card ',
      spinnerColor: 'blue-grey',
      spinnerSize: "64"
    })

    // hiding in 3s
    let timer = setTimeout(() => {
      $q.loading.hide()
      row.ssl = !row.ssl
      timer = void 0
    }, 500)
  }



}

export default {
  name: "WebsiteTable",
  components: {NewWebsite},
  setup() {
    $q = useQuasar()

    watchEffect(() => {
      let _bool = data.value.websiteTable.selected.length === 1
      ui.value.DeleteWebsiteBtn.show = _bool
      ui.value.StopWebsiteBtn.show = _bool
      ui.value.StartWebsiteBtn.show = _bool
    })
    onMounted(() => {
      Public.loadingWebsiteTableData()

    })

    return {
      ui, data, columns, Public
    }
  }
}
</script>

<style scoped>


</style>
