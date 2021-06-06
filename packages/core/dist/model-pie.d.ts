import { ChartModel } from './model';
/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export declare class PieChartModel extends ChartModel {
    constructor(services: any);
    getTabularData(data: any): any[];
    sanitize(data: any): any[];
}
