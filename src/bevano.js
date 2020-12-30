
import date from 'date-and-time';
let dateL = document.getElementById("dataTimestamp");
let _format = 'ddd MMM DD HH:mm:ss';

import createIdrometroChart from './IdrometerChart';
import Wind from './WindLabels';
import Theme from  './HighChartStyle';
import {UOM, initSeries, broker} from './utils';


window.Idrometro = (config, topic, uom = "volt") => {
  
  const cleanedTopic= topic.replace("\#", '');


  Theme();
  
  const IdrometroChart = createIdrometroChart([], uom);
  
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      console.log(values)
      const time=values.time.replace("Z", ":00");
      const [alim_v, boh , punti] = values.inst;
      const volt = (punti*0.0000047683761295091) - 0.6337;
      const timestamp = new Date(time);
      console.log(time, timestamp)
      IdrometroChart.series[0].addPoint([timestamp.getTime(), volt], true, false, true);
      dateL.innerHTML = date.format(new Date(time), _format, false);
      
    }

  })
}