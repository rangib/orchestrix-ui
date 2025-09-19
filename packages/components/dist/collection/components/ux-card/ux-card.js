import { h } from "@stencil/core";
export class UxCard {
    constructor() {
        this.variant = 'default';
        this.padding = 'md';
    }
    render() {
        const classes = `card ${this.variant} ${this.padding}`;
        return (h("div", { key: '058c07b988435135f61b727c4255732071a87b91', class: classes }, h("div", { key: '3519d47d0b804a95f571d331c8c2691f4edccf41', class: "card-header" }, h("slot", { key: 'e4d266a7e2921234971f1a0903e4620b6a8f2715', name: "header" })), h("div", { key: 'ec477c533b4d17e24d56dfe80bab37b7719954a0', class: "card-body" }, h("slot", { key: '7bcba9fefd435c5b013aa7471d5b126b26326293' })), h("div", { key: 'ec14d65278f3f1ea45fa7b28c6f71e746071285e', class: "card-footer" }, h("slot", { key: '612c94e71f6f69ddf1251868df3b179956ad05f5', name: "footer" }))));
    }
    static get is() { return "ux-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["ux-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ux-card.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'default' | 'elevated' | 'outlined'",
                    "resolved": "\"default\" | \"elevated\" | \"outlined\"",
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
                "defaultValue": "'default'"
            },
            "padding": {
                "type": "string",
                "attribute": "padding",
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
            }
        };
    }
}
//# sourceMappingURL=ux-card.js.map
