import { Component } from '../component';
export declare class Treemap extends Component {
    type: string;
    init(): void;
    render(animate?: boolean): void;
    addEventListeners(): void;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: (event: CustomEvent<any>) => void;
}
