export default (id = "hydro10s", title = "Pioggia Ultimi 10 sec", capacity =  2, tickInterval= 0.2) => {
    return Highcharts.chart(id, {
        chart: {
            type: 'cylinder',
            styledMode: true,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 90,
                viewDistance: 10
            }
            
        },
        exporting : {enabled:false},
        title: {
                text: "",
                
            },
        yAxis: {
        tickInterval,
        max: capacity,
        min: 0, 
        title: {
            text: "(mm)",
            align: 'low',
            offset: 60,
            rotation: 0,
            y: 25
        
        }
        },
        xAxis: {
            categories: [title],
        },
        tooltip: {enabled: false},
        plotOptions: {
                cylinder: {
                    enableMouseTracking: false,
            depth:300
            },
            series: {
            stacking: 'normal',
            }
        },
        series: [{
            data: [capacity],
            name: 'Top',
            showInLegend: false,
            colorIndex: 99
            
    
        },{
            data: [0],
            name: 'Bottom',
            dataLabels: {
                enabled: true,
                borderRadius: 2,
                y: -10,
                shape: 'callout',
                format: "{point.y:.2f} mm"
            },
            showInLegend: false,
                    colorIndex: 98
        },
        ]
    });

}
