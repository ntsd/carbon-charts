import { Component } from '../component';
import { ChartModel } from '../../model';
import Position from '@carbon/utils-position';
export declare class Threshold extends Component {
    type: string;
    label: any;
    positionService: Position;
    constructor(model: ChartModel, services: any);
    render(animate?: boolean): void;
    getFormattedValue(datum: any): any;
    appendThresholdLabel(): void;
    setThresholdLabelPosition(datum: any): void;
    addEventListeners(): void;
}
