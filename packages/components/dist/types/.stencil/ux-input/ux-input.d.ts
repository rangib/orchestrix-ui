import { EventEmitter } from '../../stencil-public-runtime';
export declare class UxInput {
    placeholder: string;
    value: string;
    type: 'text' | 'email' | 'password' | 'number';
    disabled: boolean;
    required: boolean;
    label: string;
    inputChange: EventEmitter<string>;
    inputBlur: EventEmitter<void>;
    inputFocus: EventEmitter<void>;
    private handleInput;
    private handleBlur;
    private handleFocus;
    render(): any;
}
