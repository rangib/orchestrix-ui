'use strict';

var index = require('./index-CPtwo_fA.js');

const uxInputCss = ":host{display:block;width:100%}.input-container{display:flex;flex-direction:column;gap:0.5rem}.input-label{font-size:0.875rem;font-weight:500;color:#374151}.required{color:#ef4444;margin-left:0.25rem}.ux-input{padding:0.75rem 1rem;border:1px solid #d1d5db;border-radius:0.375rem;width:100%;box-sizing:border-box;font-size:1rem;transition:border-color 0.2s, box-shadow 0.2s}.ux-input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37, 99, 235, 0.1)}.ux-input:disabled{background-color:#f3f4f6;color:#9ca3af;cursor:not-allowed}.ux-input::placeholder{color:#9ca3af}";

const UxInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.inputChange = index.createEvent(this, "inputChange");
        this.inputBlur = index.createEvent(this, "inputBlur");
        this.inputFocus = index.createEvent(this, "inputFocus");
        this.placeholder = '';
        this.value = '';
        this.type = 'text';
        this.disabled = false;
        this.required = false;
        this.label = '';
        this.handleInput = (event) => {
            const target = event.target;
            this.inputChange.emit(target.value);
        };
        this.handleBlur = () => {
            this.inputBlur.emit();
        };
        this.handleFocus = () => {
            this.inputFocus.emit();
        };
    }
    render() {
        return (index.h("div", { key: '93dc3dd7ff0bc29489bd6f737dcb8182aa9b6878', class: "input-container" }, this.label && (index.h("label", { key: 'e4e0af12f398c1bee513a5f471f31494bf1533e1', class: "input-label" }, this.label, this.required && index.h("span", { key: '7ddf3d0035ea6ecd0619dfe6d7ab2ba892ce2d49', class: "required" }, "*"))), index.h("input", { key: '2fe0a47ff9e856976fdbf801818329988fd05fe4', class: "ux-input", type: this.type, placeholder: this.placeholder, value: this.value, disabled: this.disabled, required: this.required, onInput: this.handleInput, onBlur: this.handleBlur, onFocus: this.handleFocus })));
    }
};
UxInput.style = uxInputCss;

exports.ux_input = UxInput;
//# sourceMappingURL=ux-input.entry.cjs.js.map
