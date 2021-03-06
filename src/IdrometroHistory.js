/**
 * Inspired From https://www.portwind.no/
 * @param {*} stationid 
 * @param {*} render 
 */
const Highcharts = window.Highcharts;


 export default ( { serie: { data = [], name = 'Altezza', axisTitle = 'Altezza Idrometro', plotLines = [], max, min}, uom = "m", quotaFormatter} ) => {

    // create the IdroChart
    return  Highcharts.stockChart("windHistoryChartContainer", {
        global: {
            //useUTC: false
        },
        chart: {
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
            text: name
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
            plotLines,
            max,
            min,
            title: {
                text: axisTitle
            },
            labels: {
                formatter: function () {
                    return quotaFormatter.format(this.value) + " " + uom;
                }
            },
            allowDecimals: true,
            opposite: false,
            showLastLabel: true
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
            data: data.avg,
            name: 'Media',
            tooltip: {
                valueDecimals: 3,
                valueSuffix: ' ' + uom
            },
        }, {
            yAxis: 0,
            zIndex: 1,
            data: data.max,
            name: 'Max',
            tooltip: {
                valueDecimals: 3,
                valueSuffix: ' ' + uom
            },
        },
        {
            yAxis: 0,
            zIndex: 1,
            data: data.min,
            name: 'min',
            tooltip: {
                valueDecimals: 3,
                valueSuffix: ' ' + uom
            },
        }],
        exporting: {
            filename: "altezza-idrometrica",
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

