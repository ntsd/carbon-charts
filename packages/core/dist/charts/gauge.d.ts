import { Chart } from '../chart';
import { ChartConfig, GaugeChartOptions } from '../interfaces/index';
import { GaugeChartModel } from './../model-gauge';
export declare class GaugeChart extends Chart {
    model: GaugeChartModel;
    constructor(holder: Element, chartConfigs: ChartConfig<GaugeChartOptions>);
    getComponents(): any[];
}
