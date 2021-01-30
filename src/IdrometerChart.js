
 const tickInterval = 30;
 const tickAmount = 13;
 let seconds = 600;
let minutesText;
    let minutes = seconds / 60;
    
export default ( { serie: { data = [], name = 'Altezza', axisTitle = 'Altezza Idrometro' }, uom = "m", quotaFormatter }) => {
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
                text: axisTitle
            },
            labels: {
                formatter: function () {
                    return  quotaFormatter.format(this.value) + " " + uom;
                }            
                
            },
            opposite: true
        }],
        plotOptions: {
            series: {
                turboThreshold: seconds
            }
        },
        series: [{
            name,
            tooltip: {
                valueSuffix: " " + uom,
                valueDecimals: 3,
            },
            data,
            zIndex: 1,
            color: '#00acec'
        }]
        
    });

}