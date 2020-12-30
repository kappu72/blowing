
 const tickInterval = 30;
 const tickAmount = 13;
 let seconds = 600;
let minutesText;
    let minutes = seconds / 60;
export default (idrometroData = [], uom = "mm") => {
    return Highcharts.chart('idrometroChartContainer', {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            animation: {
                duration: 200
            },
            defaultSeriesType: "spline"
        },
        title: {
            text: "Idrometro",
            style: {
                display: 'none'
            }
        },
        tooltip: {
            crosshairs: [true, true],
            shared: true,
            xDateFormat: "%d.%m.%Y %H:%M:%S"    
        },
        xAxis: {
            type: "datetime"
        },
        yAxis: [{ // first axis
            title: {
                text: "Altezza"
            },
            labels: {
                format: "{value} " + uom
            },
            allowDecimals: true,
            opposite: false
        }],
        plotOptions: {
            series: {
                turboThreshold: seconds
            }
        },
        series: [{
            name: "Altezza Idrometro",
            tooltip: {
                valueSuffix: " " + uom,
                valueDecimals: 2,
            },
            data: idrometroData,
            zIndex: 1,
            color: '#00acec'
        }]
        
    });

}