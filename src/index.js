import mqtt from 'mqtt';
import date from 'date-and-time';
import createGauge from './Gauge';
import createWindRose from './WindRose';
import createWindChart from './WindChart';

function initSeries (data= [] ) {

return data.slice(0).reverse().reduce(function (acc, values) {
    const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
    const time = values.time;
    const timestamp = new Date(time);
    acc.windChartS0.push([timestamp.getTime(), wind_speed]);
    acc.windChartS1.push([timestamp.getTime(), wind_dir]);
    acc.WindRose.push({ x: wind_dir, y: wind_speed, date: timestamp });
    return acc
}, {windChartS0: [], windChartS1: [], WindRose: []});  


}


window.WindBlowing =  (config, topic, initData = [], maxData = 300) =>
  {

    
    const initValues = initSeries(initData);
    const initSpeed = initData.length > 0 ? initValues.windChartS0[0][1] : 0;
    const Gouge = createGauge([initSpeed]);
    const WindRose = createWindRose(initValues.WindRose);
    const WindChart = createWindChart(initValues.windChartS0, initValues.windChartS1);

    // const dirArrow = SVG('#dir_arrow');
    const dirArrow = document.querySelector('#dir_arrow');
    const windSpeedTxt = document.getElementById("windSpeedTxt");
    const windDirTxt = document.getElementById("windDirTxt");
    const dataTimestamp = document.getElementById("dataTimestamp");



    console.log(config, topic, maxData);
    const client = mqtt.connect(config.server, config.options);
    
    client.on('connect', function () {
      console.log("Connesso al server");
      client.subscribe(topic, function (err) {
        if (!err) {
          console.log("Stazione sottoscritta il vento inizia a soffiare");
        }else {
          console.log("Impossibile connettersi il vento non soffia", err);
        }
      });

    })


    let lastWindDir = 0;
    client.on("message", function (t, payload) {
      console.log("Message Arrived");
      if (t === topic) {
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
      }

    })
  }
