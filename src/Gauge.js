const Highcharts = window.Highcharts;


export default  (data = [0], uom = "kts") => {
    return Highcharts.chart('windSpeedContainer', {
    chart: {
        type: 'gauge',
        backgroundColor: 'rgba(0,0,0,0)',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: 'rgba(0,0,0,1)'
            }
        }},
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 52,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto',
            style: {
                    color: "#000000"
            },
        },
        title: {
            text: uom
        },
        plotBands: [{
            from: 0,
            to: 21,
            color: '#55BF3B' // green
        }, {
            from: 21,
            to: 28,
            color: '#DDDF0D' // yellow
        }, {
            from: 28,
            to: 40,
            color: '#DF5353' // red
        },{
            from: 40,
            to: 52,
            color: '#9933CC' // purple
        }
    ]
    },

    series: [{
        name: 'Speed',
        data,
        tooltip: {
            valueSuffix: ' ' + uom,
            valueDecimals: 2,
        }, 
        dataLabels: {
           formatter: function() {
               return Highcharts.numberFormat(this.y, 2) + " " + uom
           }
        }
    }]

});
};