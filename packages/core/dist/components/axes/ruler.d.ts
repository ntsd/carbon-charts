import { Component } from '../component';
import { Selection } from 'd3-selection';
declare type GenericSvgSelection = Selection<SVGElement, any, SVGElement, any>;
export declare class Ruler extends Component {
    type: string;
    backdrop: GenericSvgSelection;
    elementsToHighlight: GenericSvgSelection;
    pointsWithinLine: {
        domainValue: number;
        originalData: any;
    }[];
    isXGridEnabled: any;
    isYGridEnabled: any;
    isEventListenerAdded: boolean;
    render(): void;
    removeBackdropEventListeners(): void;
    formatTooltipData(tooltipData: any): any;
    showRuler([x, y]: [number, number]): any;
    hideRuler(): void;
    /**
     * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
     */
    addBackdropEventListeners(): void;
    drawBackdrop(): void;
}
export {};
