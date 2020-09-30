
import date from 'date-and-time';
let _format = 'ddd MMM DD HH:mm:ss';
import {broker} from './utils';
import HydroCylinder from './HydroCylinder';
const colors = ["#00FF00", "#FFFC47", "#FD912A", "#FC0011"];

window.DropsFalling = (config, stationConfig ) => {
  const {topic, soglie} = stationConfig || {};
  const cleanedTopic= topic.replace("\#", ''); 
  console.log(topic, cleanedTopic);
  const client = broker(config, topic);
  const updateAlert = !!soglie;
  const timestamp = document.querySelector("#updateTimestamp");
  const TenSec = HydroCylinder("hydro10s", "Pioggia Ultimi 10 sec", 2);
  // const OneMinute = HydroCylinder("hydro60s", "Pioggia Ultimo minuto", 10, 1);
  
  const hydros = {
    m1 : {id: "hydro1m", el: HydroCylinder("hydro1m", "Pioggia Ultimo 1m", 10, 1), max: 10},
    m5 : {id: "hydro5m", el: HydroCylinder("hydro5m", "Pioggia Ultimi 5m", 20, 2), max: 20},
    m10: {id: "hydro10m", el: HydroCylinder("hydro10m", "Pioggia Ultimi 10m", 50, 5), max: 50},
    m30: {id: "hydro30m", el: HydroCylinder("hydro30m", "Pioggia Ultimi 30m", 100, 10), max: 100},
    h1:  {id: "hydro1h", el: HydroCylinder("hydro1h", "Pioggia Ultima ora", 200, 20), max: 200},
    h24: {id: "#hydro24h", el: document.querySelector("#hydro24h")}
  }
window.hydros = hydros;
  if(timestamp) {
    timestamp.innerHTML = "In attesa aggiornamento" 
  }
  if(hydros.h24.el) {
    hydros.h24.el.innerHTML = "NA"
  }


  client.on("message", function (t, payload) {
    if (t === cleanedTopic + "inst") {
      let {inst: [,,,tmp, p10, p60, pRate], time} = JSON.parse(payload);
      
      if(TenSec !== null) {
        const tenTop = TenSec.series[0].points[0]
        const tenVal = TenSec.series[1].points[0]
        tenVal.update(p10)
        tenTop.update(2-p10)
      }
      
      if(timestamp) {
        timestamp.innerHTML = date.format(new Date(time), _format, false)
      }
    } else if(t === cleanedTopic + "rainagg") {
      let {stats:values, time} = JSON.parse(payload);
      
      values.map(({res: {sum, count}, type, time}) => {
        
        const {el, max} = hydros[type] || {};
        if(el && updateAlert) {
          updateColor(type, sum);
        }
        if(type == "h24" && el) {
          el.innerHTML =  Number(sum).toFixed(2) + " mm"
        }
        else if(el) {
          el.series[0].points[0].update(max-sum);
          el.series[1].points[0].update(sum);
        }

      })
    }
  })
  function getColor(s, value) {
    if(s[0]>= value){
      return colors[0];
    }
    for(let i= 1; i<s.length; i++) {
      if(value > s[i-1] && value <= s[i]){
          return colors[i];
      }
    }
    return colors[3];
  }
  function updateColor(type, value) {
    const s = soglie[type];
    if(s) {
      const color = getColor(s,value);
      document.querySelector(`#${hydros[type].id} .highcharts-series-1>.highcharts-point`).style.fill = color;
    }
  }
  window.updateColor = updateColor;
}

