
import date from 'date-and-time';
let dateL = document.getElementById("dataTimestamp");
let _format = 'ddd MMM DD HH:mm:ss';

import createIdrometroChart from './IdrometerChart';
import Wind from './WindLabels';
import Theme from  './HighChartStyle';
import {UOM, initSeries, broker} from './utils';


window.Idrometro = (config, topic, uom = "m") => {
  
  const cleanedTopic= topic.replace("\#", '');


  Theme();
  
  const IdrometroChart = createIdrometroChart([], uom);
  
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const time= values.time.replace("+00Z", "Z");
      const [alim_v, boh , punti] = values.inst;
      const quota = (punti / 1000) + 184.17; // da mm su livello del mare a quota lago
      const timestamp = new Date(time);
      IdrometroChart.series[0].addPoint([timestamp.getTime(), quota], true, false, true);
      dateL.innerHTML = date.format(new Date(time), _format, false);
    }

  })
}