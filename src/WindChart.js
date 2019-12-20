
 const tickInterval = 30;
 const tickAmount = 13;
 let seconds = 600;
let minutesText;
    let minutes = seconds / 60;
export default (speedData = [], dirData = []) => {
    return Highcharts.chart('windChartContainer', {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            animation: {
                duration: 200
            },
            defaultSeriesType: "spline"
        },
        title: {
            text: "Wind Chart",
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
                text: "Wind speed"
            },
            labels: {
                format: "{value} kts"
            },
            allowDecimals: true,
            opposite: true
        }, { // secondary axis
            title: {
                text: "Wind direction"
            },
            min: 0,
            max: 360,
            tickAmount: tickAmount,
            tickInterval: tickInterval,
            alignTicks: false,
            gridLineWidth: 0,
            opposite: false
        }],
        plotOptions: {
            series: {
                turboThreshold: seconds
            }
        },
        series: [{
            name: "Wind Speed",
            tooltip: {
                valueSuffix: " kts",
                valueDecimals: 2,
            },
            data: speedData,
            zIndex: 1,
            color: '#00acec'
        }, {
            name: "Wind direction",
            tooltip: {
                useHTML: true,
              //  valueSuffix: "&deg;", 
			     valueSuffix: "°",     
                valueDecimals: 2,
            },
            data: dirData,
            yAxis: 1,
            marker: {
                enabled: true, // makes series a path when disabled
                radius: 2
            },
            lineWidth: 0, // makes series a path when not 0
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            },
            color: '#fefe00'
        }]
        
    });

}