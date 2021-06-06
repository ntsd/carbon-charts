import { Chart } from '../chart';
import { ChartConfig, RadarChartOptions } from '../interfaces/index';
export declare class RadarChart extends Chart {
    constructor(holder: Element, chartConfigs: ChartConfig<RadarChartOptions>, extending?: boolean);
    getComponents(): any[];
}
