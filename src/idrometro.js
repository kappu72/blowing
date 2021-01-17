
import date from 'date-and-time';
let dateL = document.getElementById("dataTimestamp");
let lastH = document.getElementById("idormetroHTLastxt");
let maxH = document.getElementById("maxIdroTxt");
let minH = document.getElementById("minIdroTxt");
let _format = 'ddd MMM DD HH:mm:ss';
import createIdrometroChart from './IdrometerChart';
import createHistoryChart from './IdrometroHistory';
import Theme from './HighChartStyle';

import { quotaFormatter, initSeriesIdrometro, broker, puntiToQuota } from './utils';


window.Idrometro = (config, topic, { last = [] } = {}, uom = "m") => {

  const cleanedTopic = topic.replace("\#", '');
  const lastValue = last[0];
  const initValues = initSeriesIdrometro(last);

  Theme();

  const IdrometroChart = createIdrometroChart(initValues.idrometro || [], uom, quotaFormatter);
  if (!!lastValue) {
    dateL.innerHTML = date.format(new Date(lastValue.time.replace("+00Z", "Z")), _format, false);
    lastH.innerHTML = quotaFormatter.format(puntiToQuota(lastValue.inst[2]));
  }

  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const time = values.time.replace("+00Z", "Z");
      const [alim_v, boh, punti] = values.inst;
      const quota = puntiToQuota(punti); // da mm su livello del mare a quota lago
      const timestamp = new Date(time);
      IdrometroChart.series[0].addPoint([(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000)), quota], true, false, true);
      dateL.innerHTML = date.format(new Date(time), _format, false);
      lastH.innerHTML = quotaFormatter.format(quota);
    } else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const { max, min } = values;
      if (!!max) {
        maxH.innerHTML = quotaFormatter.format(puntiToQuota(max.inst[2])) + "<br/><span>" + date.format(new Date(max.time.replace("+00Z", "Z")), _format, false) + "</span>";
      } if(!!min) {
      minH.innerHTML = quotaFormatter.format(puntiToQuota(min.inst[2])) + "<br/><span>" + date.format(new Date(min.time.replace("+00Z", "Z")), _format, false) + "</span>";
    }
  }

  })
}

window.IdrometroHistory =  (config, topic, {history = []} = {}, uom = "m") => {
  
  const cleanedTopic= topic.replace("\#", '');
  
  const data = history.filter(v => !!v).reduce( (a, values) => {
    const {_id, count, avg, max, min} = values
    
    const timestamp = new Date(_id);
    const time = (timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000));
    a.max.push([time, puntiToQuota(max)])
    a.min.push([time, puntiToQuota(min)])    
    a.avg.push([time, puntiToQuota(avg), count])    
    return a;
  }, { avg: [], min: [], max: []}) 
  
  const lastValue= data[data.length -1];
  if (!!lastValue) {
    dateL.innerHTML = date.format(new Date(lastValue.avg[0], _format, false));
    lastH.innerHTML = quotaFormatter.format(puntiToQuota(lastValue.avg[1]));
  }
  Theme();
  createHistoryChart(data, uom, quotaFormatter);
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload)
      const time = values.time.replace("+00Z", "Z");
      const [alim_v, boh, punti] = values.inst;
      const quota = puntiToQuota(punti); // da mm su livello del mare a quota lago
      dateL.innerHTML = date.format(new Date(time), _format, false);
      lastH.innerHTML = quotaFormatter.format(quota);
    }
  })


  
}