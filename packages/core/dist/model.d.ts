import { ColorClassNameTypes } from './interfaces';
/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export declare class ChartModel {
    protected services: any;
    protected state: any;
    /**
     * A list of all the data groups that have existed within the lifetime of the chart
     * @type string[]
     */
    protected allDataGroups: string[];
    protected colorScale: any;
    protected colorClassNames: any;
    constructor(services: any);
    getAllDataFromDomain(groups?: any): any;
    /**
     * Charts that have group configs passed into them, only want to retrieve the display data relevant to that chart
     * @param groups the included datasets for the particular chart
     */
    getDisplayData(groups?: any): any;
    getData(): any;
    isDataEmpty(): boolean;
    /**
     *
     * @param newData The new raw data to be set
     */
    setData(newData: any): any;
    getDataGroups(groups?: any): any;
    getActiveDataGroups(groups?: any): any;
    getDataGroupNames(groups?: any): any;
    getActiveDataGroupNames(groups?: any): any;
    getGroupedData(groups?: any): {
        name: string;
        data: any;
    }[];
    getDataValuesGroupedByKeys(groups?: any): any;
    getStackedData({ percentage, groups }: {
        percentage?: boolean;
        groups?: any;
    }): any[][];
    /**
     * @return {Object} The chart's options
     */
    getOptions(): any;
    set(newState: any, configs?: any): void;
    get(property?: string): any;
    /**
     *
     * @param newOptions New options to be set
     */
    setOptions(newOptions: any): void;
    /**
     *
     * Updates miscellanous information within the model
     * such as the color scales, or the legend data labels
     */
    update(animate?: boolean): void;
    toggleDataLabel(changedLabel: string): void;
    /**
     * Should the data point be filled?
     * @param group
     * @param key
     * @param value
     * @param defaultFilled the default for this chart
     */
    getIsFilled(group: any, key?: any, data?: any, defaultFilled?: boolean): any;
    getFillColor(group: any, key?: any, data?: any): any;
    getStrokeColor(group: any, key?: any, data?: any): any;
    isUserProvidedColorScaleValid(): any;
    getColorClassName(configs: {
        classNameTypes: ColorClassNameTypes[];
        dataGroupName?: string;
        originalClassName?: string;
    }): string;
    /**
     * For charts that might hold an associated status for their dataset
     */
    getStatus(): any;
    getAllDataGroupsNames(): string[];
    /**
     * Converts data provided in the older format to tabular
     *
     */
    protected transformToTabularData(data: any): any[];
    protected getTabularData(data: any): any[];
    protected sanitize(data: any): any;
    protected updateAllDataGroups(): void;
    protected generateDataGroups(data: any): {
        name: string;
        status: number;
    }[];
    protected setCustomColorScale(): void;
    protected setColorClassNames(): void;
}
