import { EventEmitter } from '../../stencil-public-runtime';
export declare class UxButton {
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    size: 'sm' | 'md' | 'lg';
    disabled: boolean;
    loading: boolean;
    buttonClick: EventEmitter<void>;
    private handleClick;
    render(): any;
}
