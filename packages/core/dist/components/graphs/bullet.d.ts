import { Component } from '../component';
export declare class Bullet extends Component {
    type: string;
    init(): void;
    render(animate: boolean): void;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: (event: CustomEvent<any>) => void;
    getMatchingRangeIndexForDatapoint(datum: any): any;
    addEventListeners(): void;
    destroy(): void;
}
