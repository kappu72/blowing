
import date from 'date-and-time';
let _format = 'ddd MMM DD HH:mm:ss';
import {broker} from './utils';
import HydroCylinder from './HydroCylinder';


window.DropsFalling = (config, topic ) => { 
  const client = broker(config, topic);
  const rate = document.querySelector("#rate");
  const timestamp = document.querySelector("#updateTimestamp");
  const TenSec = HydroCylinder("hydro10s", "Pioggia Ultimi 10 sec", 2);
  const OneMinute = HydroCylinder("hydro60s", "Pioggia Ultimo minuto", 10, 1);
  if(timestamp) {
    timestamp.innerHTML = "In attesa aggiornamento" 
  }
  if(rate) {
    rate.innerHTML = "0.00 mm/h"
  }


  client.on("message", function (t, payload) {
    if (t === topic) {
      let {inst: [,,,tmp, p10, p60, pRate], time} = JSON.parse(payload);
      const tenTop = TenSec.series[0].points[0]
      const tenVal = TenSec.series[1].points[0]
      p10 = (Math.random() * 2)
      tenVal.update(p10)
      tenTop.update(2-p10)
      const minTop = OneMinute.series[0].points[0]
      const minVal = OneMinute.series[1].points[0]
      p60 = (Math.random() * 10)
      minVal.update(p60)
      minTop.update(10-p60)
      console.log(time)
      if(timestamp) {
        timestamp.innerHTML = date.format(new Date(time), _format, false)
      }
      if(rate) {
        rate.innerHTML =  numberFormat(pRate, 2) + " mm/h"
      }
    }

  })
}

