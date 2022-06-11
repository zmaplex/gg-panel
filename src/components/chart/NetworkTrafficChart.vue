<template>
  <q-card class="shadow-0">
    <q-card-section>
      <div class="flex justify-end q-pa-md">
        <q-input v-model="ui.interval" color="dark" dense filled style="max-width: 100px" suffix="sec"
                 type="number"></q-input>
      </div>
    </q-card-section>
    <q-card-section>
      <v-chart :option="ui.option" class="chart"/>
    </q-card-section>
  </q-card>
</template>

<script>

import {use} from "echarts/core";
import {CanvasRenderer} from 'echarts/renderers';

import {LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {format} from 'quasar'
// destructuring to keep only what is needed
const { humanStorageSize} = format
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components';

import VChart, {THEME_KEY} from "vue-echarts";

import {onBeforeUnmount, onMounted, ref} from "vue";
import {faker} from "@faker-js/faker";

use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const __option = {

  tooltip: {
    trigger: 'axis',
    // formatter: (data) => {
    //   console.log(data)
    //   let IN = data[0]
    //   let OUT = data[1]
    //   let inLabel = IN.seriesName + " :" + humanStorageSize(IN.data[1]) + "/sec"
    //   let outLabel = OUT.seriesName + ":" + humanStorageSize(OUT.data[1]) + "/sec"
    //   return inLabel + '<br>' + outLabel
    // },
    valueFormatter: (val) => {
      return humanStorageSize(val) + '/sec'
    }
  },
  legend: {
    data: ['IN', 'OUT']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },

  xAxis: {
    type: 'time',
    boundaryGap: true,
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (val) => {
        return `${humanStorageSize(val)}/sec`
      }
    }
  },
  series: [
    {
      name: 'IN',
      type: 'line',
      smooth: true,
      data: []
    },
    {
      name: 'OUT',
      type: 'line',
      smooth: true,
      data: []
    }
  ]
}

const ui = ref(
  {
    option: __option,
    interval: 120
  }
)

const data = ref({
  // {"id":0,"mark":""}
  intervalID: []
})

const Private = {
  _loadingNetChartData: () => {
    let xData = ui.value.option.xAxis.data
    let INData = ui.value.option.series[0].data
    let OUTData = ui.value.option.series[1].data
    let _time = Date.now()
    xData.push(_time)
    INData.push([_time, faker.datatype.number({min: 100, max: 150000000})])
    OUTData.push([_time, faker.datatype.number({min: 100, max: 150000000 / 2})])
  }
}


export default {
  name: "NetworkTrafficChart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: ""
  },
  setup() {

    onBeforeUnmount(() => {

      for (let item of data.value.intervalID) {
        console.debug(`onBeforeUnmount clear job [${item.mark}] interval id:${item.id} `)
        clearInterval(item.id)
      }

    })

    onMounted(() => {
      let i = setInterval(Private._loadingNetChartData, 1000)
      data.value.intervalID.push({id: i, mark: "_loadingNetChartData"})
    })

    return {
      ui
    }
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
