import { h } from "@stencil/core";
export class UxButton {
    constructor() {
        this.variant = 'primary';
        this.size = 'md';
        this.disabled = false;
        this.loading = false;
        this.handleClick = (event) => {
            if (!this.disabled && !this.loading) {
                this.buttonClick.emit();
            }
            event.preventDefault();
        };
    }
    render() {
        const classes = `btn ${this.variant} ${this.size} ${this.loading ? 'loading' : ''}`;
        return (h("button", { key: 'd1b71a014f25295502781635a8fc2107889fe47a', class: classes, disabled: this.disabled || this.loading, onClick: this.handleClick }, this.loading && h("span", { key: 'e4ea6511e2df5b6f7349d1acb0bde3d19d2c179b', class: "spinner" }), h("span", { key: '11a6287560a1a9c2918b8e7681cd5adf7f45eea4', class: "button-content" }, h("slot", { key: '272db15e7085d1f60e475cdbed61f32bab30eb7c' }))));
    }
    static get is() { return "ux-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["ux-button.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ux-button.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'primary' | 'secondary' | 'outline' | 'ghost'",
                    "resolved": "\"ghost\" | \"outline\" | \"primary\" | \"secondary\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'primary'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "'sm' | 'md' | 'lg'",
                    "resolved": "\"lg\" | \"md\" | \"sm\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'md'"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "loading": {
                "type": "boolean",
                "attribute": "loading",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "buttonClick",
                "name": "buttonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=ux-button.js.map
