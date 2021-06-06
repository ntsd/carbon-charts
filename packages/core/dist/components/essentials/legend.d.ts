import { Component } from '../component';
export declare class Legend extends Component {
    type: string;
    render(): void;
    sortDataGroups(dataGroups: any, legendOrder: any): any;
    addAdditionalItem(additionalItem: any, itemConfig: any, indexOfItem: any): void;
    truncateLegendText(addedLegendItemsText: any): void;
    breakItemsIntoLines(addedLegendItems: any, className: any, itemConfig: any): void;
    setLegendItemPosition(legendItem: any, parentSVGDimension: any, itemConfig: any, itemType: any): void;
    addEventListeners(): void;
}
