<template>
  <q-dialog >
    <q-card class="apple-card card ">
      <q-card-section class="q-pa-sm flex justify-between items-center content-center text-body1  bg-warning ">
        <span class="text-capitalize"> {{ $t('oops') }}！</span>
        <q-btn v-close-popup dense flat icon="close"></q-btn>
      </q-card-section>
      <q-card-section>
        <div class="text-capitalize">
          {{ $t('message') }} : {{ data.message }}
        </div>
        <textarea v-model="data.response" class="err_textarea" readonly rows="12">
            </textarea>
      </q-card-section>
      <q-card-actions></q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {useDialogPluginComponent} from 'quasar'
import {ref} from "vue";

export default {
  name: "ErrorDialog",
  props: {
    err: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let data = ref({
      'message': props.err.message,
      'response': JSON.stringify(props.err.response ? props.err.response : {}, null, 2)
    })
    return {
      props, data
    }
  }
}
</script>

<style scoped>

.card {
  min-height: 100px;
  min-width: 300px;
  width: 100%;
  max-width: 40vw;
}

.err_textarea {
  margin-top: 8px;
  background-color: black;
  color: red;
  font-size: 0.75rem;
  outline: none;
  width: 100%;
  max-height: 400px;
  height: 100%;

  resize: none;
  border: solid 1px #ccc;

  -moz-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  box-shadow: inner 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

</style>
