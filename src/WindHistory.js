/**
 * Inspired From https://www.portwind.no/
 * @param {*} stationid 
 * @param {*} render 
 */
const Highcharts = window.Highcharts;


const prepareData =  (data=[]) => {
   return data.reduce((acc, val) =>{
        const {_id:time, speed, dir} = val;
        const timestamp = new Date(time).getTime();
        acc.speedS.push([timestamp, speed,]);
        acc.dirS.push([ timestamp, dir]);
        return acc;
    },
    {speedS:[], dirS:[]});
}

 export default ( data = [], uom = "kts") => {


    const {speedS = [], dirS = []} = prepareData(data);


    // create the WindChart
    return  Highcharts.stockChart("windHistoryChartContainer", {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            animation: {
                duration: 200
            },
            defaultSeriesType: "spline"
        },
        title: {
            text: "",
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'Wind speed & Wind direction'
        },
        legend: {
            enabled: true
        },
        rangeSelector: {
            buttonPosition: {
                align: 'left',
                x: -31,
                y: -5
            }
        },
        tooltip: {
            crosshairs: [true, true],
            shared: true,
            split: false,
            xDateFormat: '%d.%m.%Y %H:%M'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [{
            title: {
                text: 'Wind speed'
            },
            labels: {
                format: '{value} ' + uom
            },
            allowDecimals: true,
            opposite: true
        }, {
            // title: {text: 'Wind speed max'},
            labels: {
                format: '{value} '+ uom
            },
            allowDecimals: true,
            opposite: false
        }, {
            title: {
                text: 'Wind direction'
            },
            allowDecimals: false,
            min: 0,
            max: 360,
            tickAmount: 13,
            tickInterval: 30,
            alignTicks: false,
            showLastLabel: true,
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            },
            gridLineWidth: 0,
            opposite: false
        }],
        plotOptions: {
            series: {
                marker: {
                    symbol: 'circle',
                    enabled: false
                }
            }
        },
        series: [{
            yAxis: 0,
            zIndex: 1,
            data:speedS,
            name: 'Wind speed',
            tooltip: {
                valueDecimals: 1,
                valueSuffix: ' ' + uom
            },
            color: '#00acec'
        }, {
            yAxis: 2,
            zIndex: 0,
            data:dirS,
            name: 'Wind direction',
            type: 'line',
            tooltip: {
                step: true,
                valueDecimals: 0,
                valueSuffix: '°'
            },
            color: '#fefe00'
        }],
        exporting: {
            filename: "wind speed and wind direction",
            buttons: {
                contextButton: {
                    menuItems: [
                        // "printChart",
                        // "separator",
                        "downloadJPEG",
                        "downloadPNG",
                        "downloadPDF",
                        // "downloadSVG",
                        // "separator",
                        "downloadCSV",
                        "downloadXLS"
                        // "viewData",
                        // "openInCloud"
                    ]
                }
            },
            chartOptions: {
                chart: {
                    backgroundColor: '#000000'
                }
            },
            scale: 1
        }
    });
   
}

