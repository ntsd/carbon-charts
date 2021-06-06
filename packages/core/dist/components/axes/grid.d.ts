import { Component } from '../component';
export declare class Grid extends Component {
    type: string;
    backdrop: any;
    render(animate?: boolean): void;
    drawXGrid(animate: boolean): void;
    drawYGrid(animate: boolean): void;
    /**
     * Returns the threshold for the gridline tooltips based on the mouse location.
     * Calculated based on the mouse position between the two closest gridlines or edges of chart.
     */
    getGridlineThreshold(mousePos: any): number;
    /**
     * Returns the active gridlines based on the gridline threshold and mouse position.
     * @param position mouse positon
     */
    getActiveGridline(position: any): any;
    drawBackdrop(isXGridEnabled: any, isYGridEnabled: any): void;
    cleanGrid(g: any): void;
}
