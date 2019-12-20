export default () => {Highcharts.setOptions({
    lang: {
        thousandsSep: ''
    },
    global: {
        useUTC: false,
        /**
         * Use moment-timezone-with-data.js to return the timezone offset for individual
         * timestamps, used in the X axis labels and the tooltip header.
         */
        getTimezoneOffset: function (timestamp) {
            const zone = 'Europe/Oslo';
            return -moment.tz(timestamp, zone).utcOffset();
        }
    },
    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 6,
            text: '6h',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(0);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 6);
                        }
                    });
                }
            }
        }, {
            type: 'hour',
            count: 24,
            text: '24h',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(1);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 24);
                        }
                    });
                }
            }
        }, {
            type: 'month',
            count: 1,
            text: '1m',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(2);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 730);
                        }
                    });
                }
            }
        }, {
            type: 'month',
            count: 6,
            text: '6m',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(3);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 730 * 6);
                        }
                    });
                }
            }
        }, {
            type: 'year',
            count: 1,
            text: '1y',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(4);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 8760);
                        }
                    });
                }
            }
        }, {
            type: 'year',
            count: 2,
            text: '2y',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(5);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 8760 * 2);
                        }
                    });
                }
            }
        }, {
            type: 'year',
            count: 3,
            text: '3y',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(6);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 8760 * 3);
                        }
                    });
                }
            }
        }, {
            type: 'all',
            text: 'All',
            events: {
                click: function () {
                    Highcharts.each(Highcharts.charts, function (c) {
                        if (c !== undefined) {
                            c.rangeSelector.setSelected(7);
                            c.rangeSelector.datePicked = false;
                            newRange(c, 1000 * 60 * 60 * 8760 * 4);
                        }
                    });
                }
            }
        }],
        selected: 1,
        inputDateFormat: '%d-%m-%Y',
        inputEditDateFormat: '%d-%m-%Y'
    },
    plotOptions: {
        series: {
            animation: {
                duration: 250
            }
        }
    },
    credits: {
        enabled: false
    }
});
}

// function for setting a new range on the button click event
function newRange(chart, interval) {
    let xAxis = chart.xAxis[0],
        max = xAxis.getExtremes().max,
        min = max - interval;

    xAxis.setExtremes(min, max);
}