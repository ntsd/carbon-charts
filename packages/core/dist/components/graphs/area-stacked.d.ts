import { Component } from '../component';
export declare class StackedArea extends Component {
    type: string;
    areaGenerator: any;
    init(): void;
    render(animate?: boolean): void;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: () => void;
    destroy(): void;
}
