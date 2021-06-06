import { ChartModel } from '../model';
export declare class Component {
    type: string;
    id: string;
    protected parent: any;
    protected configs: any;
    protected model: any;
    protected services: any;
    constructor(model: ChartModel, services: any, configs?: any);
    init(): void;
    render(animate?: boolean): void;
    destroy(): void;
    setModel(newObj: any): void;
    setServices(newObj: any): void;
    setParent(parent: any): void;
    getParent(): any;
    getContainerSVG(configs?: {
        withinChartClip: boolean;
    }): any;
    /**
     * graphs used in combo charts share a model with global options but can receive their own local options.
     * this function retrieves the global options and merges it with any options passed into this
     * component's config.options object.
     */
    getOptions(): any;
}
