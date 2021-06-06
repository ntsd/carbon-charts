import { ChartModel } from './model';
import { LegendItemType } from './interfaces/enums';
/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export declare class CirclePackChartModel extends ChartModel {
    parentNode: boolean;
    constructor(services: any);
    setData(newData: any): void;
    setOptions(newOptions: any): void;
    getZoomOptions(options?: any): {
        legend?: undefined;
    } | {
        legend: {
            additionalItems: {
                type: LegendItemType;
                name: string;
            }[];
        };
    };
    setZoom(options?: any): void;
    updateHierarchyLevel(depth: number): void;
    getHierarchyLevel(): any;
    hasParentNode(): boolean;
    setDataGroups(): void;
    protected setChildrenDataGroup(node: any, name: any): any;
}
