import { Component } from '../component';
export declare class ChartBrush extends Component {
    static DASH_LENGTH: number;
    type: string;
    selectionSelector: string;
    frontSelectionSelector: string;
    render(animate?: boolean): void;
}
