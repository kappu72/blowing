
import date from 'date-and-time';
let dateL = document.getElementById("dataTimestamp");
let lastH = document.getElementById("idormetroHTLastxt");
let maxH = document.getElementById("maxIdroTxt");
let minH = document.getElementById("minIdroTxt");
let _format = 'ddd MMM DD HH:mm:ss';
const quotaFormatter = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2})
import createIdrometroChart from './IdrometerChart';
import Wind from './WindLabels';
import Theme from  './HighChartStyle';
import {UOM, initSeriesIdrometro, broker, puntiToQuota} from './utils';


window.Idrometro = (config, topic, { last = [] } = {}, uom = "m") => {
  
  const cleanedTopic= topic.replace("\#", '');
  const lastValue = last[0];
  const initValues = initSeriesIdrometro(last);
  
  Theme();
  
  const IdrometroChart = createIdrometroChart(initValues.idrometro || [], uom);
  dateL.innerHTML = date.format(new Date(lastValue.time.replace("+00Z", "Z")), _format, false);
  lastH.innerHTML = quotaFormatter.format(puntiToQuota(lastValue.inst[2]));
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const time= values.time.replace("+00Z", "Z");
      const [alim_v, boh , punti] = values.inst;
      const quota = puntiToQuota(punti); // da mm su livello del mare a quota lago
      const timestamp = new Date(time);
      IdrometroChart.series[0].addPoint([timestamp.getTime(), quota], true, false, true);
      dateL.innerHTML = date.format(new Date(time), _format, false);
      lastH.innerHTML = quotaFormatter.format(quota);
    }else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const {max, min} = values;
      maxH.innerHTML= quotaFormatter.format(puntiToQuota(max.inst[2])) + "<br/><span>" + date.format(new Date(max.time.replace("+00Z", "Z")), _format, false) + "</span>";
      minH.innerHTML= quotaFormatter.format(puntiToQuota(min.inst[2])) + "<br/><span>" + date.format(new Date(min.time.replace("+00Z", "Z")), _format, false) + "</span>";
    }

  })
}