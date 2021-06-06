import { Service } from '../service';
import { Selection } from 'd3-selection';
export declare class DOMUtils extends Service {
    static getSVGElementSize(svgSelector: Selection<any, any, any, any>, options?: any): any;
    static appendOrSelect(parent: any, query: any): any;
    static getAlignmentOffset(alignment: any, svg: any, parent: any): number;
    protected svg: Element;
    protected width: string;
    protected height: string;
    init(): void;
    update(): void;
    styleHolderElement(): void;
    getHolder(): any;
    addSVGElement(): void;
    verifyCSSStylesBeingApplied(): void;
    setSVGMaxHeight(): void;
    getMainSVG(): Element;
    addHolderListeners(): void;
    addResizeListener(): void;
}
