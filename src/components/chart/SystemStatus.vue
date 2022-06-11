<template>


  <q-card class="shadow-0 ">
    <q-card-section class="text-uppercase ">
      {{ $t("status") }}
    </q-card-section>
    <q-card-section>
      <div class="flex q-gutter-sm justify-around">
        <div class="text-center">
          <q-circular-progress

            :class="`text-${Public.getSystemStatusColor(ui.systemStatus.cpu.total)} q-ma-md`"
            :color="Public.getSystemStatusColor(ui.systemStatus.cpu.total)"
            :value="ui.systemStatus.cpu.total"
            font-size="16px"
            show-value
            size="60px"
            track-color="grey-3"
          >
            {{ ui.systemStatus.cpu.total }}%
          </q-circular-progress>
          <div class="text-uppercase">{{ $t('cpu') }}</div>
        </div>
        <div class="text-center">
          <q-circular-progress

            :class="`text-${Public.getSystemStatusColor(ui.systemStatus.ram.total)} q-ma-md`"
            :color="Public.getSystemStatusColor(ui.systemStatus.ram.total)"
            :value="ui.systemStatus.ram.total"

            font-size="16px"
            show-value
            size="60px"
            track-color="grey-3"
          >
            {{ ui.systemStatus.ram.total }}%
          </q-circular-progress>
          <div class="text-uppercase"> {{ $t('ram') }}</div>
        </div>
        <div class="text-center">
          <q-circular-progress

            :class="`text-${Public.getSystemStatusColor(ui.systemStatus.ens.total)} q-ma-md`"
            :color="Public.getSystemStatusColor(ui.systemStatus.ens.total)"
            :value="ui.systemStatus.ens.total"

            font-size="16px"
            show-value
            size="60px"
            track-color="grey-3"
          >
            {{ ui.systemStatus.ens.total }}%
          </q-circular-progress>
          <div class="text-uppercase"> {{ $t('ens') }}</div>
        </div>


      </div>
    </q-card-section>
  </q-card>

</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {faker} from "@faker-js/faker";


const ui = ref({
  systemStatus: {
    cpu: {
      total: 45
    },
    ram: {
      total: 45
    },
    ens: {
      total: 45
    },
  }
})

const data = ref({

  intervalID: [
    //  {id:0,mark:""}
  ]
})

const Private = {
  _loadingSystemStatusData: () => {
    ui.value.systemStatus.ram.total = faker.datatype.number({min: 0, max: 100})
    ui.value.systemStatus.cpu.total = faker.datatype.number({min: 0, max: 100})
    ui.value.systemStatus.ens.total = faker.datatype.number({min: 0, max: 100})
  }
}

const Public = {
  getSystemStatusColor: (val) => {
    if (val < 33) {
      return 'positive'
    } else if (val >= 33 && val < 66) {
      return 'warning'
    } else {
      return 'negative'
    }
  }
}


export default {
  name: "SystemStatus",
  components: {},
  setup() {
    onBeforeUnmount(() => {
      for (let item of data.value.intervalID) {
        console.debug(`onBeforeUnmount clear job [${item.mark}] interval id:${item.id} `)
        clearInterval(item.id)
      }
    })

    onMounted(() => {
      let id = setInterval(Private._loadingSystemStatusData, 1500)
      data.value.intervalID.push({id: id, mark: '_loadingSystemStatusData'})
    })
    return {ui, data, Public}
  }
}
</script>

<style scoped>

</style>
