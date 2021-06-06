import { Scatter } from './scatter';
export declare class StackedScatter extends Scatter {
    type: string;
    render(animate: boolean): void;
    getTooltipData(hoveredX: any, hoveredY: any): any;
}
