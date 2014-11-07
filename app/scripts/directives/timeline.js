'use strict';

/**
 * @ngdoc directive
 * @name phrPrototypeApp.directive:timeline
 * @Takes two inputs, chartData and chartType.
 * # timeline
 */
angular.module('phrPrototypeApp')
    .directive('timeline', function ($window) {
        return {
            restrict: 'EA',
            template: "<svg style='width:100%;'></svg>",
            link: function postLink(scope, element, attrs) {

                var plotHeight = 80;
                var boundaryOffset = 15;
                var boundaryWidth = 5;
                var boundaryLabelOffset = 15;
                var boundaryLabelPadding = 5;

                var plotCircles = [];
                var plotDomain = [];
                var timeScale;
                var timeScaleTicks = [];
                var d3 = $window.d3;
                var rawSvg = element.find("svg")[0];
                var svg = d3.select(rawSvg).attr("height", plotHeight);
                var format = d3.time.format("%m/%d/%Y");

                function gatherData() {
                    var dataToPlot = scope[attrs.chartData];
                    var dataType = attrs.chartType;
                    var tmpDomain = [];

                    if (dataType === 'account') {

                        for (var i in dataToPlot.recordHistory) {
                            var plotDate = format.parse(dataToPlot.recordHistory[i].date);
                            plotCircles.push({
                                "date": plotDate
                            });
                            tmpDomain.push(plotDate);
                        }

                        var minDate = d3.min(tmpDomain);
                        var maxDate = d3.max(tmpDomain);
                        var plotFloor = d3.time.month.floor(d3.time.month.offset(minDate, -1));
                        var plotCeiling = d3.time.month.floor(d3.time.month.offset(maxDate, 1));
                        plotDomain = [plotFloor, plotCeiling];
                    }
                }

                function renderPlot() {

                    var width;

                    function getSVGWidth() {
                        width = parseInt(svg.style('width'), 10);
                    }

                    function buildScale() {
                        timeScale = d3.time.scale()
                            .range([(boundaryOffset + (boundaryWidth / 2)), width - (boundaryOffset - (boundaryWidth / 2))])
                            .domain(plotDomain);
                    }

                    function buildTicks () {

                    	timeScaleTicks = [];
                    	 //TODO:  Configure this for monthly ticks.
                        var tmpTimeScaleTicks = timeScale.ticks(20);
                        
                        for (var i in tmpTimeScaleTicks) {
                        	timeScaleTicks.push({
                        		"x_axis": timeScale(tmpTimeScaleTicks[i]),
                        		"y_axis": (plotHeight - boundaryLabelOffset - boundaryLabelPadding) / 2
                        	});
                        }
                    }

                    function structureData() {
                        for (var i in plotCircles) {
                            plotCircles[i].x_axis = timeScale(plotCircles[i].date);
                            plotCircles[i].y_axis = (plotHeight - boundaryLabelOffset - boundaryLabelPadding) / 2;
                            plotCircles[i].radius = 12;
                            plotCircles[i].color = "#6AA6FF";
                            plotCircles[i].href = "entry" + i;
                        }
                    }

                    function plotData() {
                        svg.selectAll('*').remove();
                        var boundaryData = [{
                            "x": boundaryOffset,
                            "y": 0,
                            "width": boundaryWidth,
                            "height": plotHeight - boundaryLabelOffset - boundaryLabelPadding,
                            "color": "#5bc0de"
                        }, {
                            "x": width - boundaryOffset,
                            "y": 0,
                            "width": boundaryWidth,
                            "height": plotHeight - boundaryLabelOffset - boundaryLabelPadding,
                            "color": "#5bc0de"
                        }];

                        var boundaryDisplayFormat = d3.time.format("%b, %Y");

                        var boundaryLabel = [{
                            "x": 0,
                            "y": plotHeight - boundaryLabelPadding,
                            "anchor": "start",
                            "text": boundaryDisplayFormat(plotDomain[0])
                        }, {
                            "x": width,
                            "y": plotHeight - boundaryLabelPadding,
                            "anchor": "end",
                            "text": boundaryDisplayFormat(plotDomain[1])
                        }];

                        var boundaryLabels = svg.selectAll("text").data(boundaryLabel).enter().append("text");
                        var boundaryLabelAttributes = boundaryLabels
                        	.attr("x", function (d) {
                                return d.x;
                            })
                            .attr("y", function (d) {
                                return d.y;
                            })
                            .text(function (d) {
                                return d.text;
                            })
                            .style("text-anchor", function (d) {
                                return d.anchor;
                            });


                        var boundaries = svg.selectAll("rect").data(boundaryData).enter().append("rect");
                        var boundaryAttributes = boundaries
                            .attr("x", function (d) {
                                return d.x;
                            })
                            .attr("y", function (d) {
                                return d.y;
                            })
                            .attr("width", function (d) {
                                return d.width;
                            })
                            .attr("height", function (d) {
                                return d.height;
                            })
                            .style("fill", function (d) {
                                return d.color;
                            });

                        console.log(timeScaleTicks);

                        var plotLines = svg.selectAll("plotLines").data(timeScaleTicks).enter().append("circle");

                        var plotLineAttributes = plotLines
                        	.attr("cx", function (d) {
                        		console.log(d);
                                return d.x_axis;
                            })
                            .attr("cy", function (d) {
                                return d.y_axis;
                            })
                            .attr("r", 2)
                            .style("fill", "#5bc0de")
                            .attr("class", "plotLines");



                        var circles = svg.selectAll("plotPoint").data(plotCircles).enter().append("circle");
                        var circleAttributes = circles
                            .attr("cx", function (d) {
                                return d.x_axis;
                            })
                            .attr("cy", function (d) {
                                return d.y_axis;
                            })
                            .attr("r", function (d) {
                                return d.radius;
                            })
                            .style("fill", function (d) {
                                return d.color;
                            })
                            .attr("class", "plotPoint")
                            .on("click", function() {
                            	//Stubbed for clicking.
                            });
                    }

                    getSVGWidth();
                    buildScale();
                    buildTicks();
                    structureData();
                    plotData();

                }

                //gatherData only on first run.
                gatherData();
                renderPlot();

                //Re-evaluate scope on resize.
                $window.onresize = function () {
                    scope.$apply();
                    renderPlot();
                };

            }
        };
    });