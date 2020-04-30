
import date from 'date-and-time';
import createGauge from './Gauge';
import createWindRose from './WindRose';
import createWindChart from './WindChart';
import Wind from './WindLabels';
import History from './WindHistory';
import Theme from  './HighChartStyle';
import {UOM, initSeries, broker} from './utils';


window.WindBlowing = (config, topic, {last = [], max = {}} = {}, uom = "kt",  maxData = 380) => {
  
  const uomUtils = UOM[uom] || UOM.kt
  const cleanedTopic= topic.replace("\#", '');

  const initValues = initSeries(last, uomUtils, maxData);
  const initSpeed = last.length > 0 ? initValues.WindRose[0].y : 0;
  const initSpeedDir = last.length > 0 ? initValues.WindRose[0].x : 0;
  const initSpeedDate = last.length > 0 ? initValues.WindRose[0].date : 0;
  Theme();
  const Gouge = createGauge([initSpeed],  uomUtils.label);
  const WindRose = createWindRose(initValues.WindRose, uomUtils.label);
  const WindChart = createWindChart(initValues.windChartS0, initValues.windChartS1, uomUtils.label);
  
  Wind.update(initSpeed,initSpeedDir, uomUtils.label, initSpeedDate);

  Wind.updateMax(uomUtils.convert(max.speed), max.dir,  uomUtils.label, new Date(max.time && max.time + "z" || "now"));
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      const point = Gouge.series[0].points[0];
      const timestamp = new Date(time);
      const slice = WindRose.series[0].data.length > maxData;
      const speedC = uomUtils.convert(wind_speed);
      WindChart.series[0].addPoint([timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000), speedC], true, slice, true);
      WindChart.series[1].addPoint([timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000), wind_dir], true, slice, true);
      WindRose.series[0].addPoint({ x: wind_dir, y: wind_speed, date: timestamp }, true, slice, true);
      point.update(speedC);
      
      Wind.update(speedC, wind_dir,  uomUtils.label, timestamp);
      
    }else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const {speed, dir, time} = values;
      Wind.updateMax(uomUtils.convert(speed), dir,  uomUtils.label, time)
      
    }

  })
}

window.WindHistory =  (config, topic, {history = []} = {}, uom = "kt") => {
  const uomUtils = UOM[uom] || UOM.kt
  const cleanedTopic= topic.replace("\#", '');
  Theme();
  History(history.map(({speed, ...rest}) => ({...rest, speed: uomUtils.convert(speed)})),uomUtils.label);
  Wind.update();
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      Wind.update(uomUtils.convert(wind_speed), wind_dir, time);  
    }
  })


  
}


window.WindBlowingHarbour = (config, topic, {last = [], max = {}} = {}, uom = "kt", maxData = 380) => {
  const uomUtils = UOM[uom] || UOM.kt
  const cleanedTopic= topic.replace("\#", '');

  const initValues = initSeries(last, uomUtils, maxData);
  const initSpeed = last.length > 0 ? initValues.WindRose[0].y : 0;
  const initSpeedDir = last.length > 0 ? initValues.WindRose[0].x : 0;
  const initSpeedDate = last.length > 0 ? initValues.WindRose[0].date : 0;
  Theme();
  const Gouge = createGauge([initSpeed],  uomUtils.label);
  const WindRose = createWindRose(initValues.WindRose, uomUtils.label);
  
  Wind.update(initSpeed,initSpeedDir, uomUtils.label, initSpeedDate);

  Wind.updateMax(uomUtils.convert(max.speed), max.dir,  uomUtils.label, new Date(max.time && max.time + "z" || "now"));
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      const point = Gouge.series[0].points[0];
      const timestamp = new Date(time);
      const slice = WindRose.series[0].data.length > maxData;
      const speedC = uomUtils.convert(wind_speed);
      WindRose.series[0].addPoint({ x: wind_dir, y: speedC, date: timestamp }, true, slice, true);
      point.update(speedC);
      
      Wind.update(speedC, wind_dir, uomUtils.label, timestamp);
      
    }else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const {speed, dir, time} = values;
      Wind.updateMax(uomUtils.convert(speed), dir,  uomUtils.label, time)  
    }

  })
}