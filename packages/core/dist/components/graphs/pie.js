var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';
import { CalloutDirections, Roles, Events, Alignments, ColorClassNameTypes, } from '../../interfaces';
import * as Configuration from '../../configuration';
// D3 Imports
import { select } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
// Pie slice tween function
function arcTween(a, arcFunc) {
    var _this = this;
    var i = interpolate(this._current, a);
    return function (t) {
        _this._current = i(t);
        return arcFunc(_this._current);
    };
}
var Pie = /** @class */ (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'pie';
        // Highlight elements that match the hovered legend item
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            var groupMapsTo = _this.getOptions().data.groupMapsTo;
            _this.parent
                .selectAll('path.slice')
                .transition(_this.services.transitions.getTransition('legend-hover-bar'))
                .attr('opacity', function (d) {
                return d.data[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1;
            });
        };
        // Un-highlight all elements
        _this.handleLegendMouseOut = function (event) {
            _this.parent
                .selectAll('path.slice')
                .transition(_this.services.transitions.getTransition('legend-mouseout-bar'))
                .attr('opacity', 1);
        };
        return _this;
    }
    Pie.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
    };
    Pie.prototype.getInnerRadius = function () {
        return Configuration.pie.innerRadius;
    };
    Pie.prototype.render = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var _a, _b;
        var self = this;
        var svg = this.getContainerSVG();
        // remove any slices that are valued at 0 because they dont need to be rendered and will create extra padding
        var displayData = this.model
            .getDisplayData()
            .filter(function (data) { return data.value > 0; });
        var options = this.getOptions();
        var groupMapsTo = options.data.groupMapsTo;
        // Compute the outer radius needed
        var radius = this.computeRadius();
        this.arc = arc().innerRadius(this.getInnerRadius()).outerRadius(radius);
        // Set the hover arc radius
        this.hoverArc = arc()
            .innerRadius(this.getInnerRadius())
            .outerRadius(radius + Configuration.pie.hoverArc.outerRadiusOffset);
        // Setup the pie layout
        var pieLayout = pie()
            .value(function (d) { return d.value; })
            .sort(null)
            .padAngle(Configuration.pie.padAngle);
        // set sort function from options
        var sortFunction = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.pie) === null || _b === void 0 ? void 0 : _b.sortFunction;
        if (sortFunction) {
            pieLayout.sort(sortFunction);
        }
        // Sort pie layout data based off of the indecies the layout creates
        var pieLayoutData = pieLayout(displayData).sort(function (a, b) { return a.index - b.index; });
        // Update data on all slices
        var slicesGroup = DOMUtils.appendOrSelect(svg, 'g.slices')
            .attr('role', Roles.GROUP)
            .attr('data-name', 'slices');
        var paths = slicesGroup
            .selectAll('path.slice')
            .data(pieLayoutData, function (d) { return d.data[groupMapsTo]; });
        // Remove slices that need to be exited
        paths.exit().attr('opacity', 0).remove();
        // Add new slices that are being introduced
        var enteringPaths = paths
            .enter()
            .append('path')
            .classed('slice', true)
            .attr('opacity', 0);
        // Update styles & position on existing and entering slices
        enteringPaths
            .merge(paths)
            .attr('class', function (d) {
            return _this.model.getColorClassName({
                classNameTypes: [ColorClassNameTypes.FILL],
                dataGroupName: d.data[groupMapsTo],
                originalClassName: 'slice',
            });
        })
            .style('fill', function (d) { return self.model.getFillColor(d.data[groupMapsTo]); })
            .attr('d', this.arc)
            .transition(this.services.transitions.getTransition('pie-slice-enter-update', animate))
            .attr('opacity', 1)
            // a11y
            .attr('role', Roles.GRAPHICS_SYMBOL)
            .attr('aria-roledescription', 'slice')
            .attr('aria-label', function (d) {
            return d.value + ", " + (Tools.convertValueToPercentage(d.data.value, displayData) + '%');
        })
            // Tween
            .attrTween('d', function (a) {
            return arcTween.bind(this)(a, self.arc);
        });
        // Draw the slice labels
        var renderLabels = options.pie.labels.enabled;
        var labelData = renderLabels
            ? pieLayoutData.filter(function (x) { return x.value > 0; })
            : [];
        var labelsGroup = DOMUtils.appendOrSelect(svg, 'g.labels')
            .attr('role', Roles.GROUP)
            .attr('data-name', 'labels');
        var labels = labelsGroup
            .selectAll('text.pie-label')
            .data(labelData, function (d) { return d.data[groupMapsTo]; });
        // Remove labels that are existing
        labels.exit().attr('opacity', 0).remove();
        // Add labels that are being introduced
        var enteringLabels = labels
            .enter()
            .append('text')
            .classed('pie-label', true);
        // Update styles & position on existing & entering labels
        var calloutData = [];
        enteringLabels
            .merge(labels)
            .style('text-anchor', 'middle')
            .text(function (d) {
            if (options.pie.labels.formatter) {
                return options.pie.labels.formatter(d);
            }
            return (Tools.convertValueToPercentage(d.data.value, displayData) +
                '%');
        })
            // Calculate dimensions in order to transform
            .datum(function (d) {
            var marginedRadius = radius + 7;
            var theta = (d.endAngle - d.startAngle) / 2 + d.startAngle;
            var deg = (theta / Math.PI) * 180;
            var textLength = this.getComputedTextLength();
            d.textOffsetX = textLength / 2;
            d.textOffsetY = deg > 90 && deg < 270 ? 10 : 0;
            d.xPosition =
                (d.textOffsetX + marginedRadius) * Math.sin(theta);
            d.yPosition =
                (d.textOffsetY + marginedRadius) * -Math.cos(theta);
            return d;
        })
            .attr('transform', function (d, i) {
            var totalSlices = labelData.length;
            var sliceAngleDeg = (d.endAngle - d.startAngle) * (180 / Math.PI);
            // check if last 2 slices (or just last) are < the threshold
            if (i >= totalSlices - 2) {
                if (sliceAngleDeg < Configuration.pie.callout.minSliceDegree) {
                    var labelTranslateX = void 0, labelTranslateY = void 0;
                    if (d.index === totalSlices - 1) {
                        labelTranslateX =
                            d.xPosition +
                                Configuration.pie.callout.offsetX +
                                Configuration.pie.callout.textMargin +
                                d.textOffsetX;
                        labelTranslateY =
                            d.yPosition - Configuration.pie.callout.offsetY;
                        // Set direction of callout
                        d.direction = CalloutDirections.RIGHT;
                        calloutData.push(d);
                    }
                    else {
                        labelTranslateX =
                            d.xPosition -
                                Configuration.pie.callout.offsetX -
                                d.textOffsetX -
                                Configuration.pie.callout.textMargin;
                        labelTranslateY =
                            d.yPosition - Configuration.pie.callout.offsetY;
                        // Set direction of callout
                        d.direction = CalloutDirections.LEFT;
                        calloutData.push(d);
                    }
                    return "translate(" + labelTranslateX + ", " + labelTranslateY + ")";
                }
            }
            return "translate(" + d.xPosition + ", " + d.yPosition + ")";
        });
        // Render pie label callouts
        this.renderCallouts(calloutData);
        var optionName = Tools.getProperty(options, 'donut')
            ? 'donut'
            : 'pie';
        var alignment = Tools.getProperty(options, optionName, 'alignment');
        var width = DOMUtils.getSVGElementSize(this.getParent(), {
            useAttr: true,
        }).width;
        // don't add padding for labels & callouts if they are disabled
        var xOffset = renderLabels ? Configuration.pie.xOffset : 0;
        var yOffset = renderLabels ? Configuration.pie.yOffset : 0;
        // Position Pie
        var pieTranslateX = radius + xOffset;
        if (alignment === Alignments.CENTER) {
            pieTranslateX = width / 2;
        }
        else if (alignment === Alignments.RIGHT) {
            pieTranslateX = width - radius - Configuration.pie.xOffset;
        }
        var pieTranslateY = radius + yOffset;
        if (calloutData.length > 0) {
            pieTranslateY += Configuration.pie.yOffsetCallout;
        }
        svg.attr('transform', "translate(" + pieTranslateX + ", " + pieTranslateY + ")");
        // Add event listeners
        this.addEventListeners();
    };
    Pie.prototype.renderCallouts = function (calloutData) {
        var svg = DOMUtils.appendOrSelect(this.getContainerSVG(), 'g.callouts')
            .attr('role', Roles.GROUP)
            .attr('data-name', 'callouts');
        // Update data on callouts
        var callouts = svg.selectAll('g.callout').data(calloutData);
        callouts.exit().remove();
        var enteringCallouts = callouts
            .enter()
            .append('g')
            .classed('callout', true)
            // a11y
            .attr('role', Roles.GRAPHICS_SYMBOL + " " + Roles.GROUP)
            .attr('aria-roledescription', 'label callout');
        // Update data values for each callout
        // For the horizontal and vertical lines to use
        enteringCallouts.merge(callouts).datum(function (d) {
            var xPosition = d.xPosition, yPosition = d.yPosition, direction = d.direction;
            if (direction === CalloutDirections.RIGHT) {
                d.startPos = {
                    x: xPosition,
                    y: yPosition + d.textOffsetY,
                };
                // end position for the callout line
                d.endPos = {
                    x: xPosition + Configuration.pie.callout.offsetX,
                    y: yPosition -
                        Configuration.pie.callout.offsetY +
                        d.textOffsetY,
                };
                // the intersection point of the vertical and horizontal line
                d.intersectPointX =
                    d.endPos.x - Configuration.pie.callout.horizontalLineLength;
            }
            else {
                // start position for the callout line
                d.startPos = {
                    x: xPosition,
                    y: yPosition + d.textOffsetY,
                };
                // end position for the callout line should be bottom aligned to the title
                d.endPos = {
                    x: xPosition - Configuration.pie.callout.offsetX,
                    y: yPosition -
                        Configuration.pie.callout.offsetY +
                        d.textOffsetY,
                };
                // the intersection point of the vertical and horizontal line
                d.intersectPointX =
                    d.endPos.x + Configuration.pie.callout.horizontalLineLength;
            }
            // Store the necessary data in the DOM element
            return d;
        });
        // draw vertical line
        var enteringVerticalLines = enteringCallouts
            .append('line')
            .classed('vertical-line', true);
        enteringVerticalLines
            .merge(svg.selectAll('line.vertical-line'))
            .datum(function (d) {
            return select(this.parentNode).datum();
        })
            .style('stroke-width', '1px')
            .attr('x1', function (d) { return d.startPos.x; })
            .attr('y1', function (d) { return d.startPos.y; })
            .attr('x2', function (d) { return d.intersectPointX; })
            .attr('y2', function (d) { return d.endPos.y; });
        // draw horizontal line
        var enteringHorizontalLines = enteringCallouts
            .append('line')
            .classed('horizontal-line', true);
        enteringHorizontalLines
            .merge(svg.selectAll('line.horizontal-line'))
            .datum(function (d) {
            return select(this.parentNode).datum();
        })
            .style('stroke-width', '1px')
            .attr('x1', function (d) { return d.intersectPointX; })
            .attr('y1', function (d) { return d.endPos.y; })
            .attr('x2', function (d) { return d.endPos.x; })
            .attr('y2', function (d) { return d.endPos.y; });
    };
    Pie.prototype.addEventListeners = function () {
        var self = this;
        this.parent
            .selectAll('path.slice')
            .on('mouseover', function (datum) {
            var hoveredElement = select(this);
            hoveredElement
                .classed('hovered', true)
                .transition(self.services.transitions.getTransition('pie_slice_mouseover'))
                .attr('d', self.hoverArc);
            // Dispatch mouse event
            self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOVER, {
                element: select(this),
                datum: datum,
            });
            var groupMapsTo = self.getOptions().data.groupMapsTo;
            // Show tooltip
            self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
                hoveredElement: hoveredElement,
                items: [
                    {
                        label: datum.data[groupMapsTo],
                        value: datum.data.value,
                    },
                ],
            });
        })
            .on('mousemove', function (datum) {
            var hoveredElement = select(this);
            // Dispatch mouse event
            self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEMOVE, {
                element: hoveredElement,
                datum: datum,
            });
            // Show tooltip
            self.services.events.dispatchEvent(Events.Tooltip.MOVE);
        })
            .on('click', function (datum) {
            // Dispatch mouse event
            self.services.events.dispatchEvent(Events.Pie.SLICE_CLICK, {
                element: select(this),
                datum: datum,
            });
        })
            .on('mouseout', function (datum) {
            var hoveredElement = select(this);
            hoveredElement
                .classed('hovered', false)
                .transition(self.services.transitions.getTransition('pie_slice_mouseover'))
                .attr('d', self.arc);
            // Dispatch mouse event
            self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOUT, {
                element: hoveredElement,
                datum: datum,
            });
            // Hide tooltip
            self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
                hoveredElement: hoveredElement,
            });
        });
    };
    // Helper functions
    Pie.prototype.computeRadius = function () {
        var _a = DOMUtils.getSVGElementSize(this.parent, {
            useAttrs: true,
        }), width = _a.width, height = _a.height;
        var options = this.getOptions();
        var radius = Math.min(width, height) / 2;
        var renderLabels = options.pie.labels.enabled;
        return renderLabels ? radius + Configuration.pie.radiusOffset : radius;
    };
    return Pie;
}(Component));
export { Pie };
//# sourceMappingURL=../../../src/components/graphs/pie.js.map