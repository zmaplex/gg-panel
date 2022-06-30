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
      <q-btn color="primary" icon="o_done" label="ok"></q-btn>
      <q-btn color="blue-grey-2" icon="o_cancel" label="cancel" text-color="dark"></q-btn>
    </q-card-actions>
  </q-card>

</template>

<script>

import {VAceEditor} from "vue3-ace-editor/index";
import 'ace-builds/src-noconflict/mode-nginx';
import 'ace-builds/src-noconflict/theme-xcode';
import {onMounted, onUnmounted, ref} from "vue";


export default {
  name: "WebServerConfig",
  components: {VAceEditor},
  props: {
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

    function configContentChanged(data) {
      console.log(content.value)
    }

    return {props, content, configContentChanged, ui}
  }
}
</script>

<style scoped>

.rounded-borders {
  border-radius: 8px !important;
}

</style>
