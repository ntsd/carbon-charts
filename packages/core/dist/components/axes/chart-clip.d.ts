import { Component } from '../component';
import { ChartModel } from '../../model';
export declare class ChartClip extends Component {
    type: string;
    chartClipId: string;
    chartClipPath: any;
    constructor(model: ChartModel, services: any, configs?: any);
    init(): void;
    render(animate?: boolean): void;
    createClipPath(): void;
}
