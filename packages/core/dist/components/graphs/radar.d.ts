import { Component } from '../component';
export declare class Radar extends Component {
    type: string;
    svg: SVGElement;
    groupMapsTo: string;
    uniqueKeys: string[];
    uniqueGroups: string[];
    displayDataNormalized: any;
    groupedDataNormalized: any;
    init(): void;
    render(animate?: boolean): void;
    getLabelDimensions: (label: string) => {
        width: any;
        height: any;
    };
    normalizeFlatData: (dataset: any) => any;
    normalizeGroupedData: (dataset: any) => any;
    handleLegendOnHover: (event: CustomEvent<any>) => void;
    handleLegendMouseOut: (event: CustomEvent<any>) => void;
    destroy(): void;
    addEventListeners(): void;
}
