import mqtt from 'mqtt';
import date from 'date-and-time';
import createGauge from './Gauge';
import createWindRose from './WindRose';
import createWindChart from './WindChart';

function initSeries(data = []) {

  return data.slice(0).reverse().reduce(function (acc, values) {
    const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
    const time = values.time;
    const timestamp = new Date(time);
    acc.windChartS0.push([timestamp.getTime(), wind_speed]);
    acc.windChartS1.push([timestamp.getTime(), wind_dir]);
    acc.WindRose.push({ x: wind_dir, y: wind_speed, date: timestamp });
    return acc
  }, { windChartS0: [], windChartS1: [], WindRose: [] });


}


window.WindBlowing = (config, topic, {last = [], max = {}} = {}, maxData = 380) => {


  const initValues = initSeries(last);
  const initSpeed = last.length > 0 ? initValues.WindRose[0].y : 0;
  const initSpeedDir = last.length > 0 ? initValues.WindRose[0].x : 0;
  const initSpeedDate = last.length > 0 ? initValues.WindRose[0].date : 0;

  const Gouge = createGauge([initSpeed]);
  const WindRose = createWindRose(initValues.WindRose);
  const WindChart = createWindChart(initValues.windChartS0, initValues.windChartS1);

  // const dirArrow = SVG('#dir_arrow');
  const dirArrow = document.querySelector('#dir_arrow');
  const windSpeedTxt = document.getElementById("windSpeedTxt");
  const windDirTxt = document.getElementById("windDirTxt");
  const dataTimestamp = document.getElementById("dataTimestamp");
  const maxWindSpeedTxt = document.getElementById("maxWindSpeedTxt");
  const maxWindDirTxt = document.getElementById("maxWindDirTxt");
  const maxDataTimestamp = document.getElementById("maxDataTimestamp");

  const cleanedTopic= topic.replace("\#", '');
  if(last.length > 0) {
    windSpeedTxt.innerHTML = initSpeed.toFixed(2) + " m/s";
    windDirTxt.innerHTML = initSpeedDir.toFixed(2) + "°";
    dataTimestamp.innerHTML = date.format(initSpeedDate, 'ddd MMM DD HH:mm:ss', true);
  }
  if(max.time) {
    maxWindSpeedTxt.innerHTML = max.speed.toFixed(2) + " m/s";
    maxWindDirTxt.innerHTML = max.dir.toFixed(2) + "°";
    const timestamp = new Date(max.time);
    maxDataTimestamp.innerHTML =  date.format(timestamp, 'ddd MMM DD HH:mm:ss', true);
  }

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


  let lastWindDir = 0;
  client.on("message", function (t, payload) {
    console.log("Message Arrived", payload, t);
    if (t === cleanedTopic + "inst") {
      const values = JSON.parse(payload);
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time;
      const point = Gouge.series[0].points[0];
      const timestamp = new Date(time);
      const slice = WindRose.series[0].data.length > maxData;
      WindChart.series[0].addPoint([timestamp.getTime(), wind_speed], true, slice, true);
      WindChart.series[1].addPoint([timestamp.getTime(), wind_dir], true, slice, true);
      WindRose.series[0].addPoint({ x: wind_dir, y: wind_speed, date: timestamp }, true, slice, true);
      point.update(wind_speed);
      // dirArrow.setAttribute("transform", "rotate(" + (wind_dir).toFixed(2) + " 200 200)");
      lastWindDir = wind_dir;
      windSpeedTxt.innerHTML = wind_speed.toFixed(2) + " m/s";
      windDirTxt.innerHTML = wind_dir.toFixed(2) + "°";
      dataTimestamp.innerHTML = date.format(timestamp, 'ddd MMM DD HH:mm:ss', true);
    }else if (t === cleanedTopic + "lasthourmax") {
      const values = JSON.parse(payload);
      const {speed, dir, time, updated} = values;
      maxWindSpeedTxt.innerHTML = !!speed ? speed.toFixed(2) + " m/s" : "";
      maxWindDirTxt.innerHTML = !!dir ? dir.toFixed(2) + "°" : "";
      if(time) {
        const timestamp = new Date(time);
        maxDataTimestamp.innerHTML =  date.format(timestamp, 'ddd MMM DD HH:mm:ss', true);
      }
    }

  })
}
