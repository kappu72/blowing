export default (id = "hydro10s", title = "Pioggia Ultimi 10 sec", capacity =  2, tickInterval= 0.2) => {
    return Highcharts.chart(id, {
        
        chart: {
            
            height: "80%",
            type: 'cylinder',
            styledMode: true,
            options3d: {
                enabled: true,
                alpha: 20,
                beta: 50,
                depth: 80,
                viewDistance: 100
            }
            
        },
        exporting : {enabled:false},
        title: {
                text: ""
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
            y: 30
        
        }
        },
        xAxis: {
            categories: [title],
            labels: {
                y: 30,
                x: 150,
                position3d: "flap"
            }
            

        },
        tooltip: {enabled: false},
        plotOptions: {
                cylinder: {
                    enableMouseTracking: false,
            depth:250
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
