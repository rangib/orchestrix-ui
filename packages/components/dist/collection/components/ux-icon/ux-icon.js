import { h } from "@stencil/core";
export class UxIcon {
    constructor() {
        this.name = '';
        this.size = 'md';
        this.color = 'currentColor';
    }
    getIconPath(name) {
        const icons = {
            'chevron-right': 'M9 5l7 7-7 7',
            'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
            'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            'settings': 'M12 15a3 3 0 100-6 3 3 0 000 6z',
            'home': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
            'plus': 'M12 5v14m-7-7h14',
            'x': 'M18 6L6 18M6 6l12 12'
        };
        return icons[name] || '';
    }
    getSizeClass() {
        const sizes = {
            sm: 'icon-sm',
            md: 'icon-md',
            lg: 'icon-lg',
            xl: 'icon-xl'
        };
        return sizes[this.size];
    }
    render() {
        if (!this.name) {
            return h("div", { class: "icon-placeholder" }, "?");
        }
        const path = this.getIconPath(this.name);
        const sizeClass = this.getSizeClass();
        return (h("svg", { class: `ux-icon ${sizeClass}`, fill: "none", stroke: this.color, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: path })));
    }
    static get is() { return "ux-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["ux-icon.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ux-icon.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "defaultValue": "''"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "'sm' | 'md' | 'lg' | 'xl'",
                    "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\"",
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
            "color": {
                "type": "string",
                "attribute": "color",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "defaultValue": "'currentColor'"
            }
        };
    }
}
//# sourceMappingURL=ux-icon.js.map
