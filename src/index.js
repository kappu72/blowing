import mqtt from 'mqtt';
import date from 'date-and-time';
// import createGauge from './Gauge';
// import createWindRose from './WindRose';
// import createWindChart from './WindChart';


window.WindBlowing =  function (config, topic, maxData = 300) 
  {
    // const Gouge = createGauge();
    // const WindRose = createWindRose();
    // const WindChart = createWindChart();

    // const dirArrow = SVG('#dir_arrow');
    const dirArrow = document.querySelector('#dir_arrow');
    const windSpeedTxt = document.getElementById("windSpeedTxt");
    const windDirTxt = document.getElementById("windDirTxt");
    const dataTimestamp = document.getElementById("dataTimestamp");

    // console.log(config, topic, maxData);
    const client = mqtt.connect(config.server, config.options);
    
    client.on('connect', function () {
      // console.log("Connesso al server");
      client.subscribe(topic, function (err) {
        if (!err) {
          // console.log("Stazione sottoscritta il vento inizia a soffiare");
        }else {
          // console.log("Impossibile connettersi il vento non soffia", err);
        }
      });

    })


    let lastWindDir = 0;
    client.on("message", function (t, payload) {
      // console.log("Message Arrived");
      if (t === topic) {
        const values = JSON.parse(payload);
        // const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
        const wind_speed = values.inst[4];
        const wind_dir = values.inst[5];
        const time = values.time;
        // const point = Gouge.series[0].points[0];
        const timestamp = new Date(time);
        // const slice = WindRose.series[0].data.length > maxData;
        // WindChart.series[0].addPoint([timestamp.getTime(), wind_speed], true, slice, true);
        // WindChart.series[1].addPoint([timestamp.getTime(), wind_dir], true, slice, true);
        // WindRose.series[0].addPoint({ x: wind_dir, y: wind_speed, date: timestamp }, true, slice, true);
        // point.update(wind_speed);
        dirArrow.setAttribute("transform", "rotate(" + (wind_dir).toFixed(2) + " 200 200)");
        lastWindDir = wind_dir;
        windSpeedTxt.innerHTML = wind_speed.toFixed(2) + " m/s";
        windDirTxt.innerHTML = wind_dir.toFixed(2) + "°";
        dataTimestamp.innerHTML = date.format(timestamp, 'ddd MMM DD HH:mm:ss', true);
      }

    })
  }
