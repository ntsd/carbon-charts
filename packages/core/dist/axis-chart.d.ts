import { Chart } from './chart';
import { ChartModelCartesian } from './model-cartesian-charts';
import { ChartConfig, AxisChartOptions } from './interfaces';
import { LayoutComponent, AxisChartsTooltip } from './components';
export declare class AxisChart extends Chart {
    services: any;
    model: ChartModelCartesian;
    constructor(holder: Element, chartConfigs: ChartConfig<AxisChartOptions>);
    protected getAxisChartComponents(graphFrameComponents: any[], configs?: object): (LayoutComponent | AxisChartsTooltip)[];
}
