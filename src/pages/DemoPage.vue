<template>
  <q-page class="flex flex-center bg-blue-grey-1">
    <q-card class="flex flex-center card-size apple-card">
      <q-card-section >
        <div id="terminal" ></div>

      </q-card-section>
    </q-card>
    <q-footer>
      <link rel="stylesheet" href="/static/css/xterm.css"/>
    </q-footer>
  </q-page>

</template>

<script>
import {Terminal} from 'xterm';
import {onMounted} from "vue";
import {WebLinksAddon} from 'xterm-addon-web-links';
import {FitAddon} from 'xterm-addon-fit';

const term = new Terminal();
term.loadAddon(new WebLinksAddon());
term.loadAddon(new FitAddon());
const terminalSocket = new WebSocket(
  'ws://'
  + "127.0.0.1:8000"
  + '/ws/terminal/?token=12761ce542d6e9206c2be76f4614244c5881b50d'
);

function initTerminal() {
  let element = document.getElementById('terminal')
  term.open(element);
  term.writeln('try connecting remote server...')
  terminalSocket.onopen = function (e) {
    console.log(e)

  }
  terminalSocket.onclose = function (e) {
    //term.writeln("连接被远程主机强制关闭")
  }
  terminalSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data)
    if(data.code===201){
      term.clear()
    }
    term.write(data.message);
  };
  //获取从ssh通道获取的outdata

  //输入shelldata并发送到后台
  term.onData(data => {
    terminalSocket.send(JSON.stringify({
      'message': data
    }));
  })
  window.terminalSocket = terminalSocket;
}

export default {
  name: "DemoPage",
  setup() {
    onMounted(() => {
      initTerminal()
    })
    return {}
  }
}
</script>

<style scoped>

.card-size {
  padding: 16px;
  min-height: 360px;
  min-width: 360px;
}


</style>
