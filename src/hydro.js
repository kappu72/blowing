
import date from 'date-and-time';
let _format = 'ddd MMM DD HH:mm:ss';
import {broker} from './utils';
import HydroCylinder from './HydroCylinder';


window.DropsFalling = (config, topic ) => {
  const cleanedTopic= topic.replace("\#", ''); 
  console.log(topic, cleanedTopic);
  const client = broker(config, topic);
  const rate = document.querySelector("#rate");
  const timestamp = document.querySelector("#updateTimestamp");
  const TenSec = HydroCylinder("hydro10s", "Pioggia Ultimi 10 sec", 2);
  // const OneMinute = HydroCylinder("hydro60s", "Pioggia Ultimo minuto", 10, 1);
  
  const hydros = {
    m1 : {el: HydroCylinder("hydro1m", "Pioggia Ultimo 1m", 10, 1), max: 10},
    m5 : {el: HydroCylinder("hydro5m", "Pioggia Ultimi 5m", 20, 2), max: 20},
    m10: {el: HydroCylinder("hydro10m", "Pioggia Ultimi 10m", 50, 5), max: 50},
    m30: {el: HydroCylinder("hydro30m", "Pioggia Ultimi 30m", 100, 10), max: 100},
    h1:  {el: HydroCylinder("hydro1h", "Pioggia Ultima ora", 200, 20), max: 200},
    h24: {el: HydroCylinder("hydro24h", "Pioggia Ultimo giorno", 1000, 100), max: 1000},
  }

  if(timestamp) {
    timestamp.innerHTML = "In attesa aggiornamento" 
  }
  if(rate) {
    rate.innerHTML = "0.00 mm/h"
  }


  client.on("message", function (t, payload) {
    console.log(t);
    if (t === cleanedTopic + "inst") {
      let {inst: [,,,tmp, p10, p60, pRate], time} = JSON.parse(payload);
      const tenTop = TenSec.series[0].points[0]
      const tenVal = TenSec.series[1].points[0]
      tenVal.update(p10)
      tenTop.update(2-p10)
      // const minTop = OneMinute.series[0].points[0]
      // const minVal = OneMinute.series[1].points[0]
      // minVal.update(p60)
      // minTop.update(10-p60)
      console.log(time)
      if(timestamp) {
        timestamp.innerHTML = date.format(new Date(time), _format, false)
      }
      if(rate) {
        rate.innerHTML =  Number(pRate).toFixed(2) + " mm/h"
      }
    } else if(t === cleanedTopic + "rainagg") {
      let {stats:values, time} = JSON.parse(payload);
      console.table(values);
      values.map(({res: {sum, count}, type, time}) => {
        console.log(type);
        const {el, max} = hydros[type] || {};
        if(el) {
          el.series[0].points[0].update(max-sum);
          el.series[1].points[0].update(sum);
        }
      })
    }
  })
}

