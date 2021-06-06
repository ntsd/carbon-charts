import { Component } from '../component';
export declare class WordCloud extends Component {
    type: string;
    init(): void;
    getFontSizeScale(data: any): import("d3-scale").ScaleLinear<number, number>;
    render(animate?: boolean): void;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: (event: CustomEvent<any>) => void;
    addEventListeners(): void;
}
