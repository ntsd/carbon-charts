import { Component } from '../component';
export declare class Gauge extends Component {
    type: string;
    arc: any;
    backgroundArc: any;
    init(): void;
    getValue(): number;
    getValueRatio(): number;
    getDelta(): number;
    getArcRatio(): number;
    getArcSize(): number;
    getStartAngle(): number;
    getArrow(delta: any): string;
    render(animate?: boolean): void;
    /**
     * draws the value number associated with the Gauge component in the center
     */
    drawValueNumber(): void;
    /**
     * adds the delta number for the gauge
     */
    drawDelta(): void;
    getInnerRadius(): number;
    addEventListeners(): void;
    protected computeRadius(): number;
}
