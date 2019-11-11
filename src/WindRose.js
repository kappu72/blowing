const Highcharts = window.Highcharts;

export default () => {
    return Highcharts.chart('windRoseContainer', {

        chart: {
            polar: true,
            type: 'scatter',
            backgroundColor: 'rgba(0,0,0,0)',
            labels: {
                style: {color: '#ffffff'}
            }
     },

        title: {
            text: ''
        },

        pane: {
        },
        legend: {
            enabled:false
        },

        tooltip: {
            shared: false,
            useHTML: true,
            headerFormat: "<small>{point.point.date:%d-%m-%Y %H:%M:%S}</small><br>",
            pointFormatter: function () {
                return "Wind speed: <b>" + Highcharts.numberFormat(this.y, 2) + " m/s</b><br>"
                    + "Wind direction: <b>" + Highcharts.numberFormat(this.x, 2) + "&deg;</b>";
            }
        },
    xAxis: {
        tickmarkPlacement: 'on',
        min:0,
        max: 360,
        tickInterval:22.5,
        tickWidth: 1,
        tickPosition: 'inside',
        
        tickColor: 'rgb(255,255,255)',
        labels: {
            formatter: function() {
                switch (this.value) {
                    case 0:
                        return "N";
                    case 22.5:
                        return "NNE";
                    case 45:
                        return "NE";
                    case 67.5:
                        return  "ENE"
                    case 90:
                        return "E";
                    case 112.5:
                        return "ESE";
                    case 135:
                        return "SE";
                    case 157.5:
                        return "SSE";
                    case 180:
                        return "S";
                    case 202.5:
                        return "SSW";
                    case 225:
                        return "SW";
                    case 247.5:
                        return "WSW";
                    case 270:
                        return "W";
                    case 292.5:
                        return "WNW";
                    case 315:
                        return "NW";
                    case 337.5:
                        return "NNW";
                    case 360:
                        return "N";
                    default:
                        break;
                }
            }
        },
        lineColor: '#ffffff',
        lineWidth: 2
        
    },

    yAxis: {
        lineColor: '#ffffff',
        lineWidth: 2,
        min: 0,
        ceiling: 30,
        tickInterval:5,
        tickWidth: 1,
        tickPosition: 'inside',
        
        tickColor: 'ffffff',
        endOnTick: false,
        showLastLabel: true,
        labels: {
            formatter: function () {
                return Highcharts.numberFormat(this.value,0) + " m/s";
            }
        },
        reversedStacks: false
    },
    series: [{
        // specific options for this series instance
        type: 'scatter',
        data: [],
        tooltip: {
            valueSuffix: ' m/s'
        }
    }],


    plotOptions: {
                animation: {
                    duration: 250
                },
        series: {
            pointPlacement: 'on',
            turboThreshold: 600,
            pointPlacement: "on",
            marker: {
                        radius: 2
                    }
            }
    }
});
}

