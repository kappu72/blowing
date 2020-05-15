import mqtt from 'mqtt';
export const UOM = {
    kt: {label: "kts", convert: (kt) => kt, toBeaufort: (knt) => beaufortFromKnt(knt)},
    mph: {label: "mph", convert: (kt) =>  kt * 1.15078, toBeaufort: (mph) => {
      return beaufortFromKnt(mph/1.15078);
    }
  },
    ms: {label: "ms", convert: (kt) => kt * 0.514444,
    toBeaufort: (ms) => {
      return beaufortFromKnt(ms/0.514444);
    } }
} 
const kntLimits = [1,4,7,11,17,22,28,34,41,48,56,63];

const beaufortFromKnt = function(knt) {
  // undefined for negative values...
  if(knt < 0 || knt == undefined) return undefined;

  var beauNum = kntLimits.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + (knt > currentValue ? 1 : 0);
  },0);

  return beauNum;
}
export function initSeries(data = [],uomUtils, maxData = 380) {

    return data.slice(0, maxData).reverse().reduce(function (acc, values) {
      const [t, hPA, alim_V, alim_T, wind_speed, wind_dir, log_V] = values.inst;
      const time = values.time + "Z";
      const timestamp = new Date(time);
      acc.windChartS0.push([(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000)), uomUtils.convert(wind_speed)]);
      acc.windChartS1.push([(timestamp.getTime() - (timestamp.getTimezoneOffset() * 60000)), wind_dir]);
      acc.WindRose.push({ x: wind_dir, y: wind_speed, date: timestamp });
      return acc
    }, { windChartS0: [], windChartS1: [], WindRose: [] });
  
  
  }
  export function broker(config, topic){
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