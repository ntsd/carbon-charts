import { Skeleton } from '../graphs/skeleton';
export declare class SkeletonLines extends Skeleton {
    type: string;
    xScale: any;
    yScale: any;
    backdrop: any;
    render(): void;
    renderSparklineSkeleton(showShimmerEffect: boolean): void;
    drawSparkline(showShimmerEffect: boolean): void;
    updateBackdropStyle(): void;
}
