import { Scatter } from './scatter';
export declare class Lollipop extends Scatter {
    type: string;
    init(): void;
    render(animate: boolean): void;
    addScatterPointEventListeners(): void;
    handleScatterOnHover: (event: CustomEvent<any>) => void;
    handleScatterOnMouseOut: (event: CustomEvent<any>) => void;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: (event: CustomEvent<any>) => void;
    destroy(): void;
}
