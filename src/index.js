import mqtt from 'mqtt';
import date from 'date-and-time';
import createGauge from './Gauge';
import createWindRose from './WindRose';
import createWindChart from './WindChart';
import Wind from './WindLabels';
import History from './WindHistory';
import Theme from  './HighChartStyle';

function initSeries(data = [], maxData = 380) {

  return data.slice(0, maxData).reverse().reduce(function (acc, values) {
    const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
    const time = values.time + "Z";
    const timestamp = new Date(time);
    acc.windChartS0.push([(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000)), wind_speed]);
    acc.windChartS1.push([(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000)), wind_dir]);
    acc.WindRose.push({ x: wind_dir, y: wind_speed, date: timestamp });
    return acc
  }, { windChartS0: [], windChartS1: [], WindRose: [] });


}


const broker = (config, topic) => {
  const client = mqtt.connect(config.server, config.options);

  client.on('connect', function () {
    console.log("Connesso al server");
    client.subscribe(topic, function (err) {
      if (!err) {
        console.log("Stazione sottoscritta il vento inizia a soffiare",topic);
      } else {
        console.log("Impossibile connettersi il vento non soffia", err);
      }
    });

  })
  return client;
}

window.WindBlowing = (config, topic, {last = [], max = {}} = {}, maxData = 380) => {

  const cleanedTopic= topic.replace("\#", '');

  const initValues = initSeries(last, maxData);
  const initSpeed = last.length > 0 ? initValues.WindRose[0].y : 0;
  const initSpeedDir = last.length > 0 ? initValues.WindRose[0].x : 0;
  const initSpeedDate = last.length > 0 ? initValues.WindRose[0].date : 0;
  Theme();
  const Gouge = createGauge([initSpeed]);
  const WindRose = createWindRose(initValues.WindRose);
  const WindChart = createWindChart(initValues.windChartS0, initValues.windChartS1);
  
  Wind.update(initSpeed,initSpeedDir, initSpeedDate);

  Wind.updateMax(max.speed, max.dir, new Date(max.time && max.time + "z" || "now"));
  
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      const point = Gouge.series[0].points[0];
      const timestamp = new Date(time);
      const slice = WindRose.series[0].data.length > maxData;
      
      WindChart.series[0].addPoint([timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000), wind_speed], true, slice, true);
      WindChart.series[1].addPoint([timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000), wind_dir], true, slice, true);
      WindRose.series[0].addPoint({ x: wind_dir, y: wind_speed, date: timestamp }, true, slice, true);
      point.update(wind_speed);
      
      Wind.update(wind_speed, wind_dir, timestamp);
      
    }else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const {speed, dir, time} = values;
      Wind.updateMax(speed, dir, time)
      
    }

  })
}

window.WindHistory =  (config, topic, {history = []} = {}) => {
  const cleanedTopic= topic.replace("\#", '');
  Theme();
  History(history, "Pendennis");
  Wind.update();
  const client = broker(config, topic);
  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      Wind.update(wind_speed, wind_dir, time);  
    }
  })


  
}
