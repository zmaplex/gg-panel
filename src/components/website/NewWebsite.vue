<template>


  <q-card v-if="ui.card===0" class="card   shadow-0 bg-grey-1 ">
    <q-card-section v-if="ui.card_0.loading" class="text-center">
      <q-circular-progress
        class="q-ma-md"
        color="blue-grey-2"
        indeterminate
        size="64px"
      />
      <div>Loading ...</div>
    </q-card-section>
    <div v-else>
      <q-card-section class="q-ma-none q-pa-sm  bg-blue-grey-1">
        Select Application
      </q-card-section>

      <q-card-section class="q-gutter-sm">
        <!--suppress JSValidateTypes -->
        <q-option-group
          v-model="ui.card_0.application.model"
          :options="ui.card_0.application.options"
          color="blue-grey"
          inline
          no-caps
          @update:model-value="Public.onApplicationHelp"
        >
          <template v-slot:label="opt">
            <div class="row items-center">
              <span class="text-body2">{{ opt.label }}</span>
              <!--              <q-icon class="q-ml-sm" color="teal" name="help" size="1.5em" @click.stop="()=>{}"/>-->
            </div>
          </template>


        </q-option-group>
        <div class="q-pa-sm text-caption">{{ ui.card_0.description }}</div>
      </q-card-section>


      <q-card-section class="flex q-gutter-md justify-end">
      </q-card-section>
      <q-card-actions class="justify-end">
        <q-btn :disable="ui.card_0.application.model == null" :label="$t('next')" color="blue" icon="done"
               @click="ui.card=1"></q-btn>
      </q-card-actions>
    </div>
  </q-card>

  <q-card v-if="ui.card===1" class="card shadow-0 bg-grey-1 q-pa-sm ">
    <q-card-section class="flex justify-between ">
      <div class="text-body1">{{ $t('Basic') }}</div>

    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <q-input v-model="data.form.domain" :label="$t('domain')" color="dark"></q-input>
      <q-input v-model="data.form.domain" :label="$t('directory')" color="dark" readonly></q-input>


    </q-card-section>
    <q-card-section v-if="ui.card_1.createDatabaseToggle" class="q-gutter-sm">
      <div>Create DataBase</div>
      <q-input v-model="data.form.domain" :label="$t('DB Name')" color="dark"></q-input>
      <q-input v-model="data.form.domain" :label="$t('DB User')" color="dark"></q-input>
      <q-input v-model="data.form.domain" :label="$t('DB Password')" color="dark"></q-input>

    </q-card-section>
    <q-card-section v-if="ui.card_1.sslToggle">
      <div>{{ $t('Enable SSL') }}</div>
      <q-select v-model="ui.card_1.sslOption.model" :label="$t('Providers')" :options="ui.card_1.sslOption.options"
                color="dark"/>
    </q-card-section>
    <q-card-section class="flex q-gutter-md justify-end">
      <q-toggle v-model="ui.card_1.createDatabaseToggle" :label="$t('Create DataBase')" color="dark"
                icon="storage"></q-toggle>
      <q-toggle v-model="ui.card_1.sslToggle" :label="$t('Enable SSL')" color="green" icon="security"></q-toggle>
      <!--      <q-toggle v-model="ui.card_1.enableBackupToggle" color="blue-grey" icon="cloud"-->
      <!--                label="Enable Cloud Backup"></q-toggle>-->
      <q-toggle v-model="ui.card_1.enableBackupToggle" color="grey" icon="cloud_off"
                label="Enable Local Backup"></q-toggle>
    </q-card-section>
    <q-card-actions class="justify-between">
      <q-btn color="grey" icon="arrow_back" label="back" @click="ui.card -=1"></q-btn>
      <q-btn :label="$t('next')" color="blue" icon="done" @click="ui.card+=1"></q-btn>
    </q-card-actions>

  </q-card>

  <q-card v-if="ui.card===2" class="card shadow-0 bg-grey-1 q-pa-sm ">
    <q-card-section class="flex justify-between">

      <div class="text-body1">
        {{ ui.application.name }}
      </div>

    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <div v-for="item in ui.application.app" :key="item.name">
        <q-input v-model="data.applicationForm[item.name]" :hint="item.description.default" :label="item.label.default"
                 color="dark"></q-input>

      </div>


    </q-card-section>
    <q-card-section class="flex q-gutter-md justify-end">
      <!--
          <q-toggle v-model="data.form.sslToggle" label="Enable SSL"></q-toggle>
          <q-toggle v-model="data.form.sslToggle" label="Force SSL"></q-toggle>
      -->
    </q-card-section>
    <q-card-actions class="justify-between">
      <q-btn color="grey" icon="arrow_back" label="back" @click="ui.card-=1"></q-btn>
      <q-btn color="blue" icon="done" label="Commit"></q-btn>

    </q-card-actions>

  </q-card>


</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";
import {listApplication} from "src/api/website";


const _ui = {
  card: 0,
  application: {
    name: "StaticPages",
    app: {},
  },
  card_0: {
    loading: true,
    application: {
      checked: {},
      data: {},
      model: null,
      options: []
    },
    description: ""

  },
  card_1: {
    sslToggle: false,
    createDatabaseToggle: false,
    enableBackupToggle: false,
    sslOption: {
      model: 'Let\'s Encrypt',
      options: ['Let\'s Encrypt']
    }
  }
}
const ui = ref(_ui)


const _data = {
  form: {
    domain: "",
    path: "",

  },
  applicationForm: {}
}

const data = ref(_data)

const Public = {

  onApplicationHelp(name) {
    console.log(name)
    let app = ui.value.card_0.application
    ui.value.card_0.description = app.data[name].info.description
    ui.value.application.name = name
    ui.value.application.app = app.data[name].attr
    console.log(ui.value.application.app)
  },

  requestListApplication() {
    let card = ui.value.card_0
    card.loading = true
    listApplication().then(res => {
      for (let _key in res) {
        let item = res[_key]
        console.log(item)
        card.application.options.push({
          label: item.info.name,
          value: _key
        })
      }
      card.application.data = res

    }).catch(err => {
    }).finally(() => {
      card.loading = false
    })
  }
}


export default {
  name: "NewWebsite",
  setup() {
    onMounted(() => {
      console.log("init NewWebsite component")
      ui.value = JSON.parse(JSON.stringify(_ui))
      data.value = JSON.parse(JSON.stringify(_data))

      Public.requestListApplication()
    })

    onUnmounted(() => {

    })

    return {
      ui, data, Public
    }
  }
}
</script>

<style scoped>
.card {
  width: 98vw;
  max-width: 800px;

}

</style>
