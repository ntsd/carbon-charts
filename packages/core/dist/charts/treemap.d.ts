import { Chart } from '../chart';
import { ChartConfig, TreemapChartOptions } from '../interfaces/index';
export declare class TreemapChart extends Chart {
    constructor(holder: Element, chartConfigs: ChartConfig<TreemapChartOptions>);
    getComponents(): any[];
}
