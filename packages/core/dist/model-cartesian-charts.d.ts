import { ChartModel } from './model';
/**
 * This supports adding X and Y Cartesian[2D] zoom data to a ChartModel
 * */
export declare class ChartModelCartesian extends ChartModel {
    constructor(services: any);
    setData(newData: any): any;
    /**
     * @param zoomBarData any special zoom bar data to use instead of the model data
     */
    setZoomBarData(newZoomBarData?: any): void;
    getZoomBarData(): any;
    protected sanitizeDateValues(data: any): any;
    protected sanitize(data: any): any;
}
