const Highcharts = window.Highcharts;


export default  (data = [0]) => {
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
        max: 30,

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
            text: 'kn'
        },
        plotBands: [{
            from: 0,
            to: 8,
            color: '#55BF3B' // green
        }, {
            from: 8,
            to: 14,
            color: '#DDDF0D' // yellow
        }, {
            from: 14,
            to: 20,
            color: '#DF5353' // red
        },{
            from: 20,
            to: 30,
            color: '#9933CC' // purple
        }
    ]
    },

    series: [{
        name: 'Speed',
        data,
        tooltip: {
            valueSuffix: ' kn',
            valueDecimals: 2,
        }, 
        dataLabels: {
           formatter: function() {
               return Highcharts.numberFormat(this.y, 2) + " kn"
           }
        }
    }]

});
};