<template>
  <!--  todo https://github.com/ajaxorg/ace -->
  <q-card class="shadow-0 rounded-borders" style="min-width: 360px">
    <q-card-section>
      <q-banner v-if="ui.errMsg.show" class="bg-warning">
        <div class="flex justify-between items-center">
          <div>{{ ui.errMsg.msg }}</div>
          <q-btn dense flat icon="close" @click="ui.errMsg.show=false"></q-btn>
        </div>
      </q-banner>

      <v-ace-editor
        v-model:value="content"
        :lang="props.lang"
        style="min-height:600px;"
        theme="xcode"
        @change="configContentChanged"
      />
    </q-card-section>
    <q-card-actions align="around" class="q-gutter-md">
      <q-btn color="primary" icon="o_done" label="ok" @click="requestPatchWebsite"></q-btn>

    </q-card-actions>
  </q-card>

</template>

<script>

import {VAceEditor} from "vue3-ace-editor/index";
import 'ace-builds/src-noconflict/mode-nginx';
import 'ace-builds/src-noconflict/theme-xcode';
import {onMounted, onUnmounted, ref} from "vue";
import {patchWebsite} from "src/api/website";
import {errorLoading, hideLoading, showLoading} from "src/utils/loading";
import {useQuasar} from "quasar";


export default {
  name: "WebServerConfig",
  components: {VAceEditor},
  props: {
    pk: {
      type: String,
      default: "-1"
    },
    lang: {
      type: String,
      default: 'nginx'
    },
    data: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const content = ref('')
    const $q = useQuasar()
    const ui = ref({
      errMsg: {
        show: false,
        msg: 'Oops...'
      }
    })
    onMounted(() => {
      content.value = props.data
    })

    onUnmounted(() => {
      content.value = ''
    })

    function requestPatchWebsite() {
      showLoading($q)

      patchWebsite(props.pk, {"id": props.pk, 'valid_web_server_config': content.value}).then(res => {
        content.value = res.valid_web_server_config
      }).catch(err => {
        errorLoading($q, err)
        console.log(err.response.status)
        if (err.response.status === 400) {
          ui.value.errMsg.msg = err.response.data.valid_web_server_config
          ui.value.errMsg.show = true
        }
      }).finally(() => {
        hideLoading($q)
      })
    }

    function configContentChanged(data) {
      console.log(content.value)
    }

    return {props, content, configContentChanged, ui, requestPatchWebsite}
  }
}
</script>

<style scoped>

.rounded-borders {
  border-radius: 8px !important;
}

</style>
